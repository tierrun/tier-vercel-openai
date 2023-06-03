"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/components/ui/use-toast";

interface UserAuthFormProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/generate",
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  }

  // Signin using Github
  async function handleGithub() {
    setIsGithubLoading(true);
    signIn("github", { callbackUrl: "/generate" });
  }

  // Signin using Google
  async function handleGoogle() {
    signIn("google", { callbackUrl: "/generate" });
  }

  return (
    <div className={cn(className)} {...props}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-16 flex w-full flex-col gap-12 md:w-[473px]"
      >
        {/* Input */}
        <div className="flex flex-col gap-8">
          {/* Email */}
          <div>
            <label htmlFor="email" className="body block">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading || isGithubLoading || isGoogleLoading}
                required
                {...register("email")}
                className="block w-full rounded-[4px] border border-slate-6 bg-slate-2 py-1.5 text-slate-11 focus:ring-2 focus:ring-inset focus:ring-crimson-6
                "
              />
              {errors?.email && (
                <span className="caption-s mt-1 flex w-full flex-row-reverse text-red-500">
                  Error
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Button
            type="submit"
            variant="primary"
            className="w-full md:w-[473px]"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign in
          </Button>
        </div>
      </form>
      <div className="mb-32 mt-12 flex w-full flex-col gap-6 md:w-[473px]">
        <div className="relative">
          <div className="absolute top-0 mt-3 w-full">
            <div className="flex border-b border-slate-6"></div>
          </div>
          <div className="body relative flex flex-col items-center text-slate-11">
            <div className="bg-slate-1 px-2">or continue with</div>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          onClick={handleGithub}
          className="flex w-full items-center md:w-[473px]"
          disabled={isLoading || isGithubLoading || isGoogleLoading}
        >
          {isGithubLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          Github
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={handleGoogle}
          className="w-full md:w-[473px]"
          disabled={isLoading || isGithubLoading || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="h-6 w-6" />
          )}{" "}
          Google
        </Button>
      </div>
    </div>
  );
}
