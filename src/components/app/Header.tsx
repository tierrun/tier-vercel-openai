"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/Button";
import { BlipLogo } from "@/res/logos/BlipLogo";

const navigation = [
  { name: "Generate copy", href: "/generate" },
  { name: "History", href: "/history" },
  { name: "Billing", href: "/billing" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let pathname = usePathname();

  function handleSignOut() {
    signOut();
  }

  return (
    <header className="border-b border-slate-6 bg-slate-1/5  backdrop-blur-lg ">
      <nav
        className="mx-auto flex max-w-7xl items-center  justify-between px-6 py-3 lg:px-8 lg:py-0"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/generate" className="-m-1.5 p-1.5">
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
          <Button variant="text" type="button" onClick={() => handleSignOut()}>
            Logout
          </Button>
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
            <Link href="/generate" className="-m-1.5 p-1.5">
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
                <Button
                  onClick={() => handleSignOut()}
                  type="button"
                  className="w-full"
                  variant="text"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
