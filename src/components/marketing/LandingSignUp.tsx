"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/Button";

export function SignUpForm() {
  async function handleGithub() {
    signIn("github", { callbackUrl: "/generate" });
  }

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          handleGithub();
        }}
      >
        Sign up with Github
      </Button>
      <span className="caption text-slate-11">or</span>
      <Button variant="secondary" href="/signup">
        Sign up with email
      </Button>
    </div>
  );
}
