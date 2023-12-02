import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { OrgInfo } from "tier";
import { env } from "@/env.mjs";
import { TIER_FREE_PLAN_ID } from "@/config/tierConstants";
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
  events: {
    // createUser event is called whenever a user is created or updated
    // this is where we want to subscribe the user to the free plan,
    // as it only fires once (and not until) the user is created in the db.
    createUser: async ({ user }) => {
      // Check if org/user already exists in Stripe, else create and subscribe to free tier
      try {
        const c = await tier.lookupOrg(`org:${user?.id!}`);
        console.log(`Customer ${JSON.stringify(c)} already exists in Stripe.`);
      } catch (e) {
        // Auto subscribe user to the free plan if they do not have any subscription already.
        // Add OrgInfo to create/update the customer profile while subscribing
        await tier.subscribe(`org:${user.id!}`, TIER_FREE_PLAN_ID, {
          info: {
            name: user.name! as string,
            email: user.email! as string,
          } as OrgInfo,
        });
      }
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
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
