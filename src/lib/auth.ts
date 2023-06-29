import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { OrgInfo } from "tier";

import { env } from "@/env.mjs";
import { tierConstants } from "@/config/tierConstants";
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

        // Check if there are any plans, else subscribe to the free plan
        try {
          const limits = await tier.lookupLimit(
            `org:${session?.user?.id}`,
            tierConstants.TIER_AICOPY_FEATURE_ID
          );
          console.log(limits);
          session.user.limit = limits;
        } catch (error) {
          await tier.subscribe(
            `org:${session?.user?.id}`,
            tierConstants.TIER_FREE_PLAN_ID,
            {
              info: {
                name: session?.user?.name as string,
                email: session?.user?.email as string,
              } as OrgInfo,
            }
          );
          try {
            const limits = await tier.lookupLimit(
              `org:${session?.user?.id}`,
              tierConstants.TIER_AICOPY_FEATURE_ID
            );
            session.user.limit = limits;
          } catch (error) {
            session.user.limit = {
              feature: tierConstants.TIER_AICOPY_FEATURE_ID,
              used: 0,
              limit: 1,
            };
            console.log("No Limits found for the first time user subscription");
          }
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
