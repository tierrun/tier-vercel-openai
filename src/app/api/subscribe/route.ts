import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { PlanName } from "tier";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { tier } from "@/lib/tier";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const { searchParams } = new URL(req.url);
    const plan = searchParams.get("plan") as PlanName;

    try {
      await tier.subscribe(`org:${user?.id}`, plan);
      return NextResponse.redirect(new URL("/generate", req.url));
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response("Something really bad happened when trying to subscribe", { status: 500 });
  }
}
