import { TierPlan } from "@/types";
import {
  businessPlan,
  freePlan,
  startupPlan,
} from "@/config/subscriptionPlans";

export async function getPricingPageData(): Promise<TierPlan[]> {
  return [freePlan, startupPlan, businessPlan];
}
