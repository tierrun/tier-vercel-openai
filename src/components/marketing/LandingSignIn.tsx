"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/Button";

export function SignInForm() {
  async function handleGithub() {
    signIn("github", { callbackUrl: "/generate" });
  }

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
      <Button
        type="button"
        variant="text"
        onClick={() => {
          handleGithub();
        }}
      >
        Login
      </Button>
    </div>
  );
}
