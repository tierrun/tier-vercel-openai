import { SiteConfig } from "@/types";
import { env } from "@/env.mjs";

export const siteConfig: SiteConfig = {
  name: "Blip",
  description:
    "An AI marketing content generation tool, made with Tier, NextJS 13, OpenAI and Vercel Postgres.",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  links: {
    twitter: "https://twitter.com/tierrun",
    github: "https://github.com/tierrun/blip",
  },
};
