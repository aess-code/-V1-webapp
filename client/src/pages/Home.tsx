import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ProtocolOverview from "@/components/sections/ProtocolOverview";
import WhyPulse from "@/components/sections/WhyPulse";
import ProtocolArchitecture from "@/components/sections/ProtocolArchitecture";
import Developers from "@/components/sections/Developers";
import Roadmap from "@/components/sections/Roadmap";

/**
 * Home Page - Protocol Website
 *
 * Sections:
 * 1. Hero
 * 2. Protocol Overview
 * 3. Why Pulse (Features)
 * 4. Protocol Architecture
 * 5. Developers
 * 6. Roadmap
 * 7. Footer
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <Hero />
        <ProtocolOverview />
        <WhyPulse />
        <ProtocolArchitecture />
        <Developers />
        <Roadmap />
      </main>

      <Footer />
    </div>
  );
}
