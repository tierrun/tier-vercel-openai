import { User } from "@prisma/client";
import type { FeatureName, Model, Plan, PlanName } from "tier";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type TierConstants = {
  TIER_FREE_PLAN_ID: PlanName;
  TIER_STARTUP_PLAN_ID: PlanName;
  TIER_BUSINESS_PLAN_ID: PlanName;
  TIER_BASE_FEATURE_ID: FeatureName;
  TIER_AICOPY_FEATURE_ID: FeatureName;
  TIER_EXTRACOPY_FEATURE_ID: FeatureName;
};

export type SubscriptionPlan = {
  planId: string;
  promoted: boolean;
  currency: string;
  interval: string;
};

export type TierPlan = SubscriptionPlan & {
  name: string;
  base: number;
  features: string[];
};
