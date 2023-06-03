import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import type { Usage } from "tier";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      address: string;
      limit: Usage;
    };
  }
}
