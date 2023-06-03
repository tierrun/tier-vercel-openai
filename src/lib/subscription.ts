import { PlanName } from "tier";

import { TierPlan } from "@/types";
import {
  businessPlan,
  freePlan,
  startupPlan,
} from "@/config/subscriptionPlans";
import { tier } from "@/lib/tier";

export async function getPricingPageData(): Promise<TierPlan[]> {
  return [freePlan, startupPlan, businessPlan];
}

interface UserSubscriptionPlan {}

export async function getUserSubscriptionPlan(userId: string, plan: PlanName) {
  return userId;
}
