import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F8F0DE] text-[#1A1714]">
      <div className="border-b border-[#ECE4D5] bg-[#FBF1DC] px-4 py-3 text-center text-[14.5px] font-medium">
        <span className="font-[family-name:var(--font-display)] font-bold">
          Tinglr
        </span>{" "}
        watches your AWS so you don&apos;t have to.
        <a
          href="/signup"
          className="ml-1 font-bold underline underline-offset-[3px]"
        >
          Start free →
        </a>
      </div>

      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <FinalCta />
      <Footer />
    </main>
  );
}
