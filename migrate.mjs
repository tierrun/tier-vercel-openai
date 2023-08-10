import { Tier } from "tier";

export const tier = new Tier({
  baseURL: process.env.TIER_BASE_URL,
  apiKey: process.env.TIER_API_KEY,
  debug: true,
});

// Constants
const userId = "xxxxxxx"; // Fetch all users from your DB and loop through them
const featureName = "feature:aicopy"; // The feature where you want to migrate the usage
const newPlan = "plan:free@1"; // Your new plan

const action = async () => {
  const limits = await tier.lookupLimits(`org:${userId}`);
  const freeFeatureUsage = limits.usage.find((_usage) => _usage.feature === featureName).used;

  await tier.subscribe(`org:${userId}`, newPlan);
  await tier.report(`org:${userId}`, featureName, freeFeatureUsage);

  const updatedLimits = await tier.lookupLimits(`org:${userId}`);
  return updatedLimits;
};

action()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
