import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomePage } from "@/app/home-page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}
