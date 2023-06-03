import clsx from "clsx";

import { Skeleton } from "@/components/ui/skeleton";
import { CreditCardIcon } from "@/res/icons/CreditCardIcon";
import { TierLogo } from "@/res/logos/TierLogo";

export default async function BillingLoading() {
  return (
    <>
      {/* Greetings */}
      <div className="mt-16 flex items-center justify-between">
        <h1 className="h4">Hello</h1>
        <div className="flex items-center gap-3">
          <p className="text-slate-11">Powered by</p>
          <TierLogo />
        </div>
      </div>
      {/* Usage Display */}
      <div className="mt-16 flex flex-col items-center border-b border-slate-6 pb-16">
        <div className="flex items-start gap-12">
          {/* Your subscription */}
          <div className="flex flex-col gap-4 border-r border-slate-6 pr-12">
            <p className="body text-slate-11">Your subscription</p>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
          {/* Usage details */}
          <div
            className={clsx(
              "flex flex-col gap-9 ",
              "border-r border-slate-6 pr-12"
            )}
          >
            <p className="text-slate-11">Copies generated</p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row-reverse items-end justify-between">
                <Skeleton className="h-5 w-1/3" />
              </div>
              {/* Progress */}
              <div className="relative h-2 w-[442px] bg-slate-4">
                <Skeleton className="h-5 w-full" />
              </div>
            </div>
          </div>
          {/* Overages */}
          <div className="flex flex-col gap-5">
            <p className="text-slate-11">Overages</p>
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-full" />
            </div>
            <Skeleton className="h-5 w-[200px]" />
          </div>
        </div>
      </div>
      {/* Manage subscription */}
      {/* Pricing */}
      <div className="mt-16 flex flex-col gap-12 border-b border-slate-6 pb-24 ">
        <p className="text-slate-11">Manage subscription</p>
        <div className="mx-auto flex w-full flex-col items-start gap-6 md:flex-row">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
      {/* Billing details */}
      <div className="mb-40 mt-16">
        <div className="flex w-full items-start gap-16">
          {/* Billing information */}
          <div
            className={clsx(
              "flex items-start gap-16 ",
              "border-r border-slate-6 pr-16"
            )}
          >
            <p className="text-slate-11">Billing information</p>
            <div className="flex flex-col gap-8">
              <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-5 w-[200px]" />
              </div>
            </div>
          </div>
          {/* Payment method */}
          <div className="flex items-start gap-16">
            <p className="text-slate-11">Payment method</p>
            <div className="flex gap-4">
              <CreditCardIcon />
              <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-5 w-[200px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
