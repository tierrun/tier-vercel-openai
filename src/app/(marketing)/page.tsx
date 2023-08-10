import Link from "next/link";

import { BgPattern } from "@/components/ui/Bgpattern";
import { SignUpButton } from "@/components/marketing/LandingSignUp";

export default async function IndexPage() {
  return (
    <>
      {/* Bg Pattern */}
      <BgPattern />
      {/* Hero Copy */}
      <div className="mt-16 flex flex-col items-center gap-4">
        <h1 className="md:display h2 w-full px-4 text-center md:w-[802px] md:px-0">
          Generate the best <span className="text-crimson-9">marketing copy</span>
        </h1>
        <p className="body-xl px-4 text-center text-slate-11 md:w-[572px] md:px-0">
          Put an end to your creative block, get help from your AI creative writer
        </p>
      </div>
      {/* Hero CTA */}
      <div className="mb-40 mt-20 flex flex-col items-center gap-4">
        <p className="body">
          Get your <span className="font-semibold">free account today</span>
        </p>
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <SignUpButton className="block" />
        </div>
        <p className="caption text-slate-11">No credit card required</p>
      </div>
    </>
  );
}
