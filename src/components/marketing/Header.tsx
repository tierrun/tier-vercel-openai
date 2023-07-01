"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import { Button } from "@/components/ui/Button";
import { SignInForm } from "@/components/marketing/LandingSignIn";
import { BlipLogo } from "@/res/logos/BlipLogo";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
];

export function Header({ count }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let pathname = usePathname();

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
    <header className="border-b border-slate-6 bg-slate-1/5 py-3 backdrop-blur-lg lg:py-0">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Blip</span>
            <div className="flex gap-2">
              <BlipLogo />
              <span className="body-semibold">Blip</span>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-11"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "body  py-3 text-slate-11",
                pathname === item.href ? "border-b border-crimson-9" : ""
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-5">
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
              className="group rounded-r-[4px] border-y border-r border-slate-7 px-2 py-[2px] hover:bg-slate-3"
            >
              <span className="caption-s font-medium text-slate-12 group-hover:text-crimson-9">
                {count}
              </span>
            </Link>
          </div>
          <SignInForm />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-slate-1 p-6 sm:max-w-sm sm:ring-1 sm:ring-slate-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Blip</span>
              <div className="flex gap-2">
                <BlipLogo />
                <span className="body-semibold">Blip</span>
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-slate-11"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-slate-6">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-11 hover:bg-slate-3"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3 py-6">
                <Button className="w-full" variant="text" href="/login">
                  Login
                </Button>
                <Button className="w-full" variant="primary" href="/signup">
                  Get Started - Its Free
                </Button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
