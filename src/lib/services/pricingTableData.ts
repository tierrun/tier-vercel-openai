import type { PricingTableData } from "@/types";
import {
  TIER_BASE_FEATURE_ID,
  TIER_EXTRACOPY_FEATURE_ID,
  tierFeatureConstants,
  tierPlanConstants,
} from "@/config/tierConstants";
import { tier } from "@/lib/tier";

export const pullPricingTableData = async () => {
  // Pull the all the pricing model details from Tier Cloud
  const tierPricingData = await tier.pull();
  console.log(tierPricingData);

  const pricingTableData: PricingTableData[] = tierPlanConstants
    .map((_planConstant) => {
      if (
        _planConstant.planId &&
        Object.entries(tierPricingData.plans).some((_plan) => _plan[0] === _planConstant.planId)
      ) {
        // Get Tier Plan
        const tierPlan = Object.entries(tierPricingData.plans).find(
          (_plan) => _plan[0] === _planConstant.planId
        );

        // Extract title
        const name = tierPlan?.[1].title as string;

        // Extract base price
        const basePrice =
          tierPlan &&
          tierPlan[1].features &&
          Object.entries(tierPlan[1].features).find(
            (_feature) => _feature[0] === TIER_BASE_FEATURE_ID
          )?.[1].base;

        const base = basePrice ?? 0;

        // Extract extra usage rate
        const tiers =
          tierPlan &&
          tierPlan[1].features &&
          Object.entries(tierPlan[1].features).find(
            (_feature) => _feature[0] === TIER_EXTRACOPY_FEATURE_ID
          )?.[1].tiers;

        const extraUsageRate = tiers && tiers[0].price;

        // Extract all features from the plan
        const featureDefinitions = tierPlan?.[1].features && Object.entries(tierPlan[1].features);

        // Filter features
        const features = tierFeatureConstants
          .filter((_featureId) =>
            featureDefinitions?.some((_feature) => _feature[0] === _featureId)
          )
          .map((_featureId) =>
            featureDefinitions?.find((_featureDefinition) => _featureDefinition[0] === _featureId)
          )
          .map((_filteredFeature) => _filteredFeature?.[1].title) as string[];

        // Get promoted field from plan constant
        const promoted = _planConstant.promoted;

        return {
          planId: _planConstant.planId,
          currency: "usd",
          interval: "monthly",
          promoted,
          name,
          base,
          features,
          extraUsageRate,
        };
      }
    })
    .filter((_plan) => _plan);

  return pricingTableData;
};
