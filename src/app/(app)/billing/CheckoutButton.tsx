"use client";

import { useState } from "react";

import { tier } from "@/lib/tier";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/components/ui/use-toast";

export function CheckoutButton({ plan, currentPlan }) {
  const [changePlan, setChangePlan] = useState(false);
  const subscribe = async (planId) => {
    try {
      setChangePlan(true);
      const response = await fetch(`/api/subscribe?plan=${planId}`, {
        method: "GET",
      });
      if (!response?.ok) {
        return toast({
          title: "Something went wrong.",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        });
      }
      const session = await response.json();
      if (session) {
        window.location.href = session.url;
      }
      // router.push(`/app/generate`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-[256px]"
        type="submit"
        name="planId"
        value={plan.planId}
        onClick={() => subscribe(plan.planId)}
      >
        {changePlan && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        {plan.base < currentPlan.base ? "Downgrade" : "Upgrade"}
      </Button>
    </>
  );
}
