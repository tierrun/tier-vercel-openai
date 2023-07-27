// import { Tier } from "tier"; // If you do not want to make Tier work on edge

import { Tier } from "tier/client"; // If you want to make Tier work on edge

import { env } from "@/env.mjs";

export const tier = new Tier({
  baseURL: env.TIER_BASE_URL as string,
  apiKey: env.TIER_API_KEY,
  debug: true,
});
