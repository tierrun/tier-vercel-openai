import Link from "next/link";

import { BlipLogo } from "@/res/logos/BlipLogo";

export function Header() {
  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
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
      </nav>
    </header>
  );
}
