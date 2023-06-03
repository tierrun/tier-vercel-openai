import { Metadata } from "next";
import Link from "next/link";

import { UserAuthForm } from "@/components/auth/UserAuthForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <>
      {/* Signin heading content */}
      <div className="mt-16 flex flex-col gap-2">
        <h1 className="h4">Sign in to your account</h1>
        <p className="body text-slate-11">
          Not a member?{" "}
          <Link href="/signup" className="body-semibold text-crimson-9">
            Create a free account.
          </Link>
        </p>
      </div>
      <UserAuthForm />
    </>
  );
}
