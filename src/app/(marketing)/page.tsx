import Link from "next/link";

import { SignUpButton } from "@/components/marketing/LandingSignUp";

export default async function IndexPage() {
  const res = await fetch(
    "https://api.github.com/repos/tierrun/tier-vercel-openai",
    {
      method: "GET",
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();

  function GitHubIcon(props) {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 1.667c-4.605 0-8.334 3.823-8.334 8.544 0 3.78 2.385 6.974 5.698 8.106.417.075.573-.182.573-.406 0-.203-.011-.875-.011-1.592-2.093.397-2.635-.522-2.802-1.002-.094-.246-.5-1.005-.854-1.207-.291-.16-.708-.556-.01-.567.656-.01 1.124.62 1.281.876.75 1.292 1.948.93 2.427.705.073-.555.291-.93.531-1.143-1.854-.213-3.791-.95-3.791-4.218 0-.929.322-1.698.854-2.296-.083-.214-.375-1.09.083-2.265 0 0 .698-.224 2.292.876a7.576 7.576 0 0 1 2.083-.288c.709 0 1.417.096 2.084.288 1.593-1.11 2.291-.875 2.291-.875.459 1.174.167 2.05.084 2.263.53.599.854 1.357.854 2.297 0 3.278-1.948 4.005-3.802 4.219.302.266.563.78.563 1.58 0 1.143-.011 2.061-.011 2.35 0 .224.156.491.573.405a8.365 8.365 0 0 0 4.11-3.116 8.707 8.707 0 0 0 1.567-4.99c0-4.721-3.73-8.545-8.334-8.545Z"
        />
      </svg>
    );
  }
  return (
    <>
      {/* Hero Copy */}
      <div className="mt-16 flex flex-col items-center gap-4">
        <div className="flex">
          <Link
            href="https://github.com/tierrun/tier-vercel-openai"
            className="caption-s flex items-center gap-1 rounded-l-[4px] border border-slate-7 bg-slate-3 px-2 py-[2px] font-medium text-slate-12 hover:border-slate-8 hover:bg-slate-4"
          >
            <GitHubIcon className="h-5 w-5 fill-slate-12" />
            <span className="">Star</span>
          </Link>
          <Link
            href="https://github.com/tierrun/tier-vercel-openai/stargazers"
            className="group rounded-r-[4px] border-y border-r border-slate-7 px-2 py-[2px] hover:bg-slate-2"
          >
            <span className="caption-s font-medium text-slate-12 group-hover:text-crimson-9">
              {data.stargazers_count}
            </span>
          </Link>
        </div>
        <h1 className="md:display h2 w-full px-4 text-center md:w-[802px] md:px-0">
          Generate the best{" "}
          <span className="text-crimson-9">marketing copy</span>
        </h1>
        <p className="body-xl px-4 text-center text-slate-11 md:w-[572px] md:px-0">
          Put an end to your creative block, get help from your AI creative
          writer
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
