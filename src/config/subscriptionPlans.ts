import type { Model, Plan, PlanName } from "tier";

import { TierPlan } from "@/types";
import { tierConstants } from "@/config/tierConstants";
import { tier } from "@/lib/tier";

const data: Model = await tier.pull();

const freePlanTier = data.plans[tierConstants.TIER_FREE_PLAN_ID];
const startupPlanTier = data.plans[tierConstants.TIER_STARTUP_PLAN_ID];
const businessPlanTier = data.plans[tierConstants.TIER_BUSINESS_PLAN_ID];

const getBase = (plan: Plan): number => {
  var result = 0;
  if (plan.features !== undefined) {
    result =
      plan.features[tierConstants.TIER_BASE_FEATURE_ID]?.base !== undefined
        ? (plan.features[tierConstants.TIER_BASE_FEATURE_ID]?.base as number)
        : 0;
  }
  return result;
};

const getFeatures = (plan: Plan): string[] => {
  var result = [];
  if (plan.features !== undefined) {
    const basicFeature = plan.features[tierConstants.TIER_AICOPY_FEATURE_ID];
    if (basicFeature.tiers !== undefined) {
      const number = basicFeature.tiers[0].upto;
      result[0] = `${number} AI generated copy`;
    }

    const extraFeature = plan.features[tierConstants.TIER_EXTRACOPY_FEATURE_ID];
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
    const extraFeature = plan.features[tierConstants.TIER_EXTRACOPY_FEATURE_ID];
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
  if (planId === tierConstants.TIER_FREE_PLAN_ID) {
    return {
      planId,
      currency: (freePlanTier.currency as string) || "usd",
      interval: (freePlanTier.interval as string) || "monthly",
      name: (freePlanTier.title as string) || "Free",
      base: getBase(freePlanTier),
      extraUsageRate: getExtraUsageRate(freePlanTier),
    };
  } else if (planId === tierConstants.TIER_STARTUP_PLAN_ID) {
    return {
      planId,
      currency: (startupPlanTier.currency as string) || "usd",
      interval: (startupPlanTier.interval as string) || "monthly",
      name: (startupPlanTier.title as string) || "Free",
      base: getBase(startupPlanTier),
      extraUsageRate: getExtraUsageRate(startupPlanTier),
    };
  } else if (planId === tierConstants.TIER_BUSINESS_PLAN_ID) {
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
  planId: tierConstants.TIER_FREE_PLAN_ID,
  currency: (freePlanTier.currency as string) || "usd",
  interval: (freePlanTier.interval as string) || "monthly",
  promoted: false,
  name: (freePlanTier.title as string) || "Free",
  base: getBase(freePlanTier),
  features: getFeatures(freePlanTier),
};

export const startupPlan: TierPlan = {
  planId: tierConstants.TIER_STARTUP_PLAN_ID,
  currency: (startupPlanTier.currency as string) || "usd",
  interval: (startupPlanTier.interval as string) || "monthly",
  promoted: true,
  name: (startupPlanTier.title as string) || "Startup",
  base: getBase(startupPlanTier),
  features: getFeatures(startupPlanTier),
};

export const businessPlan: TierPlan = {
  planId: tierConstants.TIER_BUSINESS_PLAN_ID,
  currency: (businessPlanTier.currency as string) || "usd",
  interval: (businessPlanTier.interval as string) || "monthly",
  promoted: false,
  name: (businessPlanTier.title as string) || "Business",
  base: getBase(businessPlanTier),
  features: getFeatures(businessPlanTier),
};
