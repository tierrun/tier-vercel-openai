"use client";

import clsx from "clsx";
import { PlanName } from "tier";

import { TierPlan } from "@/types";
import { Button } from "@/components/ui/Button";
import { CheckBoxIcon } from "@/res/icons/CheckBoxIcon";

export function PricingTable(
  pricing: TierPlan[],
  currentPlan: {
    planId: PlanName;
    currency: string;
    interval: string;
    name: string;
    base: number;
    extraUsageRate: number | null;
  }
) {
  return (
    <>
      {/* Manage subscription */}
      {/* Pricing */}
      <div className="mt-16 flex flex-col gap-12 border-b border-slate-6 pb-24 ">
        <p className="text-slate-11">Manage subscription</p>
        <div className="mx-auto flex flex-col items-start gap-6 md:flex-row">
          {pricing.map((plan, planIndex) => (
            <div
              key={planIndex}
              className={clsx(
                "flex h-[353px] flex-col gap-8 rounded-lg bg-slate-2 px-6 py-12",
                plan.planId === currentPlan.planId
                  ? "border-[3px] border-crimson-6"
                  : ""
              )}
            >
              <div className="flex flex-col gap-2">
                <h6 className="body-semibold text-slate-12">{plan.name}</h6>
                <div className="flex items-center gap-3">
                  <h5 className="text-[32px] font-bold leading-9">
                    ${plan.base / 100}
                  </h5>
                  <div className="flex flex-col items-start">
                    <span className="caption">
                      {plan.currency.toUpperCase()}
                    </span>
                    <span className="caption-s text-slate-11">
                      Billed {plan.interval}
                    </span>
                  </div>
                </div>
              </div>
              {plan.planId === currentPlan.planId ? (
                <Button
                  variant="secondary"
                  disabled={true}
                  className="w-[256px] hover:bg-crimson-3"
                >
                  Current plan
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-[256px]"
                  type="submit"
                  // onClick={() => subscribe(plan.planId)}
                >
                  {plan.base < currentPlan.base ? "Downgrade" : "Upgrade"}
                </Button>
              )}

              <div className="flex flex-col gap-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <CheckBoxIcon
                      className={clsx(
                        "h-6 w-6 ",
                        plan.planId === currentPlan.planId
                          ? "stroke-crimson-9"
                          : "stroke-slate-11"
                      )}
                    />
                    <p className="body text-slate-11">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
