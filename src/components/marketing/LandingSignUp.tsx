"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/Button";

export function SignUpButton({ className }) {
  async function handleGithub() {
    signIn("github", { callbackUrl: "/generate" });
  }

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
      <Button
        type="button"
        variant="primary"
        className={className}
        onClick={() => {
          handleGithub();
        }}
      >
        Sign up with Github
      </Button>
    </div>
  );
}
