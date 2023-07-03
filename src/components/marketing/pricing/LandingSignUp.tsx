"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/Button";

export function SignUpButton({ type, children }) {
  async function handleGithub() {
    signIn("github", { callbackUrl: "/billing" });
  }

  return (
    <Button
      type="button"
      variant={type}
      className="w-[256px]"
      onClick={() => {
        handleGithub();
      }}
    >
      {children}
    </Button>
  );
}
