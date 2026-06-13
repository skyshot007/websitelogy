import { Hero } from '@/components/sections/hero';
import { TrustStrip } from '@/components/sections/trust-strip';
import { ServicesSection } from '@/components/sections/services-section';
import { AboutSection } from '@/components/sections/about-section';
import { HowItWorks } from '@/components/sections/how-it-works';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { Testimonials } from '@/components/sections/testimonials';
import { StatsSection } from '@/components/sections/stats';
import { JournalTeaser } from '@/components/sections/journal-teaser';
import { FaqSection } from '@/components/sections/faq-section';
import { CtaBand } from '@/components/sections/cta-band';
import { FeatureGate } from '@/components/feature-gate';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesSection />
      <AboutSection />
      <HowItWorks />
      <WhyChooseUs />
      <FeatureGate flag="marketing.testimonials">
        <Testimonials />
      </FeatureGate>
      <FeatureGate flag="marketing.stats">
        <StatsSection />
      </FeatureGate>
      <FeatureGate flag="marketing.blog">
        <JournalTeaser />
      </FeatureGate>
      <FaqSection />
      <CtaBand />
    </>
  );
}
