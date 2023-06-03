import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/auth/Header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-12">
        <div className="px-6 lg:px-8">{children}</div>
      </main>

      <Footer />
    </>
  );
}
