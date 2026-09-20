import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { EditorialBanner } from "@/components/EditorialBanner";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import { EasyImplementationSection } from "@/components/EasyImplementationSection";
import { CTAFormSection } from "@/components/CTAFormSection";
import { Footer } from "@/components/Footer";
import { PresentationSection } from "@/components/PresentationSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F1F1A] p-0 sm:p-4 md:p-6 lg:p-8 selection:bg-[#00C853] selection:text-[#0F1F1A]">
      {/* Framed Canvas Container matching WanderNOW luxury layout */}
      <div className="max-w-[1600px] mx-auto bg-[#F8FAF8] rounded-none sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#0F1F1A]/30 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Section */}
          <PresentationSection>
            <HeroSection />
          </PresentationSection>

          {/* Dual Protection Lines */}
          <PresentationSection>
            <ProblemSection />
          </PresentationSection>

          {/* Editorial Banner */}
          <PresentationSection>
            <div className="px-4 sm:px-8 lg:px-12 bg-[#F8FAF8]">
              <EditorialBanner />
            </div>
          </PresentationSection>

          {/* How It Works */}
          <PresentationSection>
            <HowItWorksSection />
          </PresentationSection>

          {/* Comparison & Marquee */}
          <PresentationSection>
            <ComparisonSection />
          </PresentationSection>

          {/* Easy Implementation */}
          <PresentationSection>
            <EasyImplementationSection />
          </PresentationSection>

          {/* Consultation & Lead Form */}
          <PresentationSection>
            <CTAFormSection />
          </PresentationSection>
        </main>
        <Footer />
      </div>
    </div>
  );
}
