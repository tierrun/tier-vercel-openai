import { Metadata } from "next";
import Link from "next/link";

import { UserAuthForm } from "@/components/auth/UserAuthForm";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};

export default function SignupPage() {
  return (
    <>
      {/* Signin heading content */}
      <div className="mt-16 flex flex-col gap-2">
        <h1 className="h4">Create your account</h1>
        <p className="body text-slate-11">
          Already have an account?{" "}
          <Link href="/login" className="body-semibold text-crimson-9">
            Log in.
          </Link>
        </p>
      </div>
      <UserAuthForm />
    </>
  );
}
