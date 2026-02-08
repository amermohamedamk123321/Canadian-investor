import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { Hero } from '@/components/sections/Hero';
import { TrustStats } from '@/components/sections/TrustStats';
import { SecuritySection } from '@/components/sections/SecuritySection';
import { CTASection } from '@/components/sections/CTASection';
import { HowItWorksPreview } from '@/components/sections/HowItWorksPreview';
import { FeaturedOpportunities } from '@/components/sections/FeaturedOpportunities';

const Index = () => {
  return (
    <>
      <SEOHead
        title="Home"
        description="Alpha Partners Investment Inc. connects visionary entrepreneurs with strategic investment opportunities across Canada. Explore vetted investments with proven returns."
        canonical="/"
      />
      <Layout>
        <Hero />
        <TrustStats />
        <HowItWorksPreview />
        <FeaturedOpportunities />
        <SecuritySection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
