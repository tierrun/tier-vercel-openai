import { Metadata } from "next";

import { getCurrentUser } from "@/lib/session";
import { Generate } from "@/components/app/GenerateSection";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Generate Copy",
  description: "Generate your AI based marketing content",
};

export default async function GeneratePage() {
  const user = await getCurrentUser();
  return (
    <>
      {process.env.NEXTAUTH_URL}
      <br />
      <br />
      {process.env.VERCEL_URL}
      <br />
      <br />
      {process.env.NEXT_PUBLIC_VERCEL_URL}
      <Generate user={user} />
    </>
  );
}
