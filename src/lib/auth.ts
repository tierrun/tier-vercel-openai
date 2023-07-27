import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { OrgInfo } from "tier";

import { env } from "@/env.mjs";
import {
  freeAiCopyConstants,
  TIER_AICOPY_FEATURE_ID,
  TIER_FREE_PLAN_ID,
} from "@/config/tierConstants";
import { db } from "@/lib/db";
import { tier } from "@/lib/tier";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;

        // Check limits of AI copy feature and add them to the user session data
        try {
          const limits = await tier.lookupLimit(`org:${session?.user?.id}`, TIER_AICOPY_FEATURE_ID);
          session.user.limit = limits;
        } catch (error) {
          // Auto subscribe user to the free plan if they do not have any subscription already.
          // Add OrgInfo to create/update the customer profile while subscribing
          await tier.subscribe(`org:${session?.user?.id}`, TIER_FREE_PLAN_ID, {
            info: {
              name: session?.user?.name as string,
              email: session?.user?.email as string,
            } as OrgInfo,
          });

          // Add the Free plan limits as default
          // We could fetch this directly from Tier,
          // but when you call lookupLimts directly after subscription it might break
          session.user.limit = {
            feature: TIER_AICOPY_FEATURE_ID,
            used: freeAiCopyConstants.used,
            limit: freeAiCopyConstants.limit,
          };
        } finally {
          return session;
        }
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};
