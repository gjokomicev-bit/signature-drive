import { Hero } from "@/components/home/Hero";
import { BrandStatement } from "@/components/home/BrandStatement";
import { FeaturedVehicles } from "@/components/home/FeaturedVehicles";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <FeaturedVehicles />
      <ProcessSteps />
      <CtaSection />
    </>
  );
}
