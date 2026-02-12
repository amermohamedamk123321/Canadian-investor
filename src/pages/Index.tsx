import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { Hero } from '@/components/sections/Hero';
import { WhoWeAreSection } from '@/components/sections/WhoWeAreSection';
import { InvestmentProcessSection } from '@/components/sections/InvestmentProcessSection';
import { WhereWeOperateSection } from '@/components/sections/WhereWeOperateSection';
import { FeaturedOpportunities } from '@/components/sections/FeaturedOpportunities';
import { CTASection } from '@/components/sections/CTASection';

const Index = () => {
  return (
    <>
      <SEOHead
        title="Confident Investment in Canadian Real Estate - Alpha Partners"
        description="We help Canadian and international investors discover and invest in residential and commercial real estate and land opportunities across Canada with clarity, structure, and confidence."
        canonical="/"
      />
      <Layout>
        <Hero />
        <WhoWeAreSection />
        <InvestmentProcessSection />
        <WhereWeOperateSection />
        <FeaturedOpportunities />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
