import type { FeatureName, Model, Plan, PlanName } from "tier";

import { TierPlan } from "@/types";
import { env } from "@/env.mjs";
import { tier } from "@/lib/tier";

const data: Model = await tier.pull();

const freePlanTier = data.plans[env.TIER_FREE_PLAN_ID as PlanName];
const startupPlanTier = data.plans[env.TIER_STARTUP_PLAN_ID as PlanName];
const businessPlanTier = data.plans[env.TIER_BUSINESS_PLAN_ID as PlanName];

const getBase = (plan: Plan): number => {
  var result = 0;
  if (plan.features !== undefined) {
    result =
      plan.features[env.TIER_BASE_FEATURE_ID as FeatureName]?.base !== undefined
        ? (plan.features[env.TIER_BASE_FEATURE_ID as FeatureName]
            ?.base as number)
        : 0;
  }
  return result;
};

const getFeatures = (plan: Plan): string[] => {
  var result = [];
  if (plan.features !== undefined) {
    const basicFeature =
      plan.features[env.TIER_AICOPY_FEATURE_ID as FeatureName];
    if (basicFeature.tiers !== undefined) {
      const number = basicFeature.tiers[0].upto;
      result[0] = `${number} AI generated copy`;
    }

    const extraFeature =
      plan.features[env.TIER_EXTRACOPY_FEATURE_ID as FeatureName];
    if (extraFeature !== undefined) {
      if (extraFeature.tiers !== undefined) {
        const price =
          extraFeature.tiers[0].price !== undefined
            ? extraFeature.tiers[0].price
            : 0;
        result[1] = `Extras @ $${price / 100}/copy`;
      }
    }
  }
  return result;
};

export function getExtraUsageRate(plan: Plan): number | null {
  var price = null;
  if (plan.features !== undefined) {
    const extraFeature =
      plan.features[env.TIER_EXTRACOPY_FEATURE_ID as FeatureName];
    if (extraFeature !== undefined) {
      if (extraFeature.tiers !== undefined) {
        price =
          extraFeature.tiers[0].price !== undefined
            ? extraFeature.tiers[0].price
            : 0;
      }
    }
  }
  return price;
}

export function getPlan(planId: PlanName) {
  if (planId === (env.TIER_FREE_PLAN_ID as PlanName)) {
    return {
      planId,
      currency: (freePlanTier.currency as string) || "usd",
      interval: (freePlanTier.interval as string) || "monthly",
      name: (freePlanTier.title as string) || "Free",
      base: getBase(freePlanTier),
      extraUsageRate: getExtraUsageRate(freePlanTier),
    };
  } else if (planId === (env.TIER_STARTUP_PLAN_ID as PlanName)) {
    return {
      planId,
      currency: (startupPlanTier.currency as string) || "usd",
      interval: (startupPlanTier.interval as string) || "monthly",
      name: (startupPlanTier.title as string) || "Free",
      base: getBase(startupPlanTier),
      extraUsageRate: getExtraUsageRate(startupPlanTier),
    };
  } else if (planId === (env.TIER_BUSINESS_PLAN_ID as PlanName)) {
    return {
      planId,
      currency: (businessPlanTier.currency as string) || "usd",
      interval: (businessPlanTier.interval as string) || "monthly",
      name: (businessPlanTier.title as string) || "Free",
      base: getBase(businessPlanTier),
      extraUsageRate: getExtraUsageRate(businessPlanTier),
    };
  }
}

export const freePlan: TierPlan = {
  planId: env.TIER_FREE_PLAN_ID as PlanName,
  currency: (freePlanTier.currency as string) || "usd",
  interval: (freePlanTier.interval as string) || "monthly",
  promoted: false,
  name: (freePlanTier.title as string) || "Free",
  base: getBase(freePlanTier),
  features: getFeatures(freePlanTier),
};

export const startupPlan: TierPlan = {
  planId: env.TIER_STARTUP_PLAN_ID as PlanName,
  currency: (startupPlanTier.currency as string) || "usd",
  interval: (startupPlanTier.interval as string) || "monthly",
  promoted: true,
  name: (startupPlanTier.title as string) || "Startup",
  base: getBase(startupPlanTier),
  features: getFeatures(startupPlanTier),
};

export const businessPlan: TierPlan = {
  planId: env.TIER_BUSINESS_PLAN_ID as PlanName,
  currency: (businessPlanTier.currency as string) || "usd",
  interval: (businessPlanTier.interval as string) || "monthly",
  promoted: false,
  name: (businessPlanTier.title as string) || "Business",
  base: getBase(businessPlanTier),
  features: getFeatures(businessPlanTier),
};
