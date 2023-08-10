import React from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/marketing/Header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  const res = await fetch("https://api.github.com/repos/tierrun/tier-vercel-openai", {
    method: "GET",
    next: { revalidate: 60 },
  });
  const data = await res.json();

  const stargazers_count: number = data.stargazers_count;

  console.log(data);
  return (
    <>
      <Header stargazers_count={stargazers_count} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
