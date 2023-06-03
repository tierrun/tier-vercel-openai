"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { PlanName } from "tier";

import { env } from "@/env.mjs";
import { authOptions } from "@/lib/auth";
import { tier } from "@/lib/tier";

export async function checkout(data: FormData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const user = session.user;

    const plan = data.get("planId") as PlanName;

    const paymentMethod = await tier.lookupPaymentMethods(`org:${user?.id}`);

    if (paymentMethod.methods[0] === undefined) {
      console.log("checkout");
      const successUrl = new URL(
        "/generate",
        env.NEXT_PUBLIC_APP_URL
      ).toString();
      const cancelUrl = new URL("/pricing", env.NEXT_PUBLIC_APP_URL).toString();

      await tier.updateOrg(`org:${user?.id}`, {
        email: user?.email as string,
        name: user?.name as string,
        description: "", //TODO:
        metadata: {}, //TODO:
        phone: "", //TODO:
      });

      const checkout = await tier.checkout(`org:${user?.id}`, successUrl, {
        cancelUrl,
        features: plan,
      });

      console.log(checkout.url);
      redirect(checkout.url);

      // NextResponse.redirect(checkout.url);
    } else {
      console.log("subscribe");
      await tier.subscribe(`org:${user?.id}`, plan);
      redirect("/generate");
      // NextResponse.redirect(new URL("/generate", env.NEXT_PUBLIC_APP_URL));
    }
  } catch (error) {
    console.log(error);
  }
}
