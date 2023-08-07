import { Header } from "@/components/app/Header";
import { Footer } from "@/components/Footer";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AuthLayoutProps) {
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
