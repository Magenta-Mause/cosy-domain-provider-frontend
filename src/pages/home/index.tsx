import { Scenery } from "@/components/pixel/scenery";

import { FeaturesSection } from "./components/features-section";
import { HeroSection } from "./components/hero-section";
import { LandingNav } from "./components/landing-nav";
import { PageFooter } from "./components/page-footer";
import { PricingSection } from "./components/pricing-section";

export function HomePage() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Scenery>
        <LandingNav />
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <PageFooter />
      </Scenery>
    </div>
  );
}
