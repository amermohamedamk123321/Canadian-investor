/**
 * Canadian Investors Page
 * Public-facing page for Canadian investment opportunities
 */

import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { PageHero, PageCard, PageGrid } from '../components/pages/PageComponents';
import { CTASection } from '../components/sections/CTASection';
import { Button } from '../components/ui/button';
import { Loader2 } from 'lucide-react';

interface CanadianInvestorEntry {
  id: string;
  title: string;
  slug: string;
  description: string;
  asset_types: string;
  attachments: string;
  display_order: number;
}

export default function InvestorsCanadianPage() {
  // Fetch page content
  const { data: pageData, isLoading: pageLoading } = useQuery({
    queryKey: ['pages', 'canadian-investors'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/pages/canadian-investors`);
      if (!response.ok) throw new Error('Failed to fetch page');
      return response.json();
    },
  });

  // Fetch Canadian investor entries
  const { data: entriesData, isLoading: entriesLoading } = useQuery({
    queryKey: ['canadian-investors'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/canadian-investors`);
      if (!response.ok) throw new Error('Failed to fetch entries');
      return response.json();
    },
  });

  // Fetch SEO metadata
  const { data: seoData } = useQuery({
    queryKey: ['seo', 'canadian-investors'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/seo/canadian-investors`);
      if (!response.ok) return null;
      return response.json();
    },
  });

  const page = pageData?.data;
  const entries = entriesData?.data || [];
  const seo = seoData?.data;

  if (pageLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      </Layout>
    );
  }

  const services = [
    'Identification of suitable investment opportunities',
    'Market insight and investment review',
    'Guidance throughout the buying process',
    'Coordination with licensed real estate professionals',
    'Connection with trusted legal partners for secure transactions',
  ];

  const processSteps = [
    { number: 1, title: 'Initial consultation', description: 'Understand your investment goals' },
    { number: 2, title: 'Understanding your goals and investment criteria', description: 'Define your strategy' },
    { number: 3, title: 'Opportunity matching and review', description: 'Find suitable properties' },
    { number: 4, title: 'Professional coordination and due diligence', description: 'Work with professionals' },
    { number: 5, title: 'Smooth and secure closing', description: 'Complete your investment' },
  ];

  return (
    <Layout>
      <Helmet>
        <title>{seo?.title || 'Canadian Investors - Alpha Partners'}</title>
        <meta name="description" content={seo?.description || 'Real Estate Investment Solutions in Canada. Invest with clarity and confidence with Alpha Partners Investment Inc.'} />
        {seo?.og_title && <meta property="og:title" content={seo.og_title} />}
        {seo?.og_description && <meta property="og:description" content={seo.og_description} />}
      </Helmet>

      {/* Hero Section */}
      <PageHero
        badge="Canadian Investors"
        title="Real Estate Investment Solutions in Canada"
        subtitle="Invest with Clarity and Confidence"
      />

      {/* Intro Section */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl">
          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            We support Canadian investors in purchasing and investing in residential real estate, commercial properties,
            and agricultural land across Canada.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Our role is to provide clear guidance, practical insight, and professional coordination throughout the investment process.
          </p>
        </div>
      </section>

      {/* What We Help You Invest In */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading mb-6">What We Help You Invest In</h2>
              <ul className="space-y-4">
                {[
                  'Residential real estate',
                  'Commercial properties',
                  'Agricultural and farm land'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-muted-foreground">
                Each opportunity is reviewed with a focus on long term value, risk awareness, and alignment with your investment goals.
              </p>
            </div>
            <div className="bg-primary/5 rounded-xl p-8 border border-border/20">
              <p className="text-foreground">
                We understand that each investor has unique goals and timelines. Our team works with you to identify properties
                that not only meet your investment criteria but also align with your long-term financial strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="text-3xl font-heading mb-12 text-center">Our Services for Canadian Investors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-secondary rounded-xl p-6 border border-border/20 hover:border-accent/50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <p className="text-foreground font-medium">{service}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Investment Process */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <h2 className="text-3xl font-heading mb-12 text-center">Our Investment Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((step) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (step.number - 1) * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-background rounded-lg p-6 border border-border/20 h-full">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-primary font-bold mb-4">
                    {step.number}
                  </div>
                  <h4 className="font-heading text-foreground mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="text-3xl font-heading mb-12 text-center">Why Work with Alpha Partners Investment Inc</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { title: 'Clear and transparent guidance', icon: '✓' },
              { title: 'Professional and structured approach', icon: '✓' },
              { title: 'Collaboration with licensed professionals', icon: '✓' },
              { title: 'Focus on secure and well-informed investments', icon: '✓' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-accent" />
                </div>
                <p className="text-lg text-foreground">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Where We Operate */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading mb-6">Where We Operate</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We support Canadian investors across major markets, including:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Ontario', 'British Columbia', 'Alberta', 'Quebec', 'Other key regions in Canada'].map((region, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="px-4 py-2 rounded-full bg-background border border-border/20"
              >
                {region}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Opportunities Grid */}
      {entriesLoading ? (
        <section className="section-padding bg-background flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </section>
      ) : entries.length > 0 ? (
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h2 className="text-3xl font-heading mb-12">Investment Opportunities by Province</h2>
            <PageGrid columns={3}>
              {entries.map((entry: CanadianInvestorEntry) => (
                <PageCard
                  key={entry.id}
                  title={entry.title}
                  description={entry.description}
                  footer={
                    <Button asChild className="w-full btn-gold border-0">
                      <a href={`#opportunities`}>Learn More</a>
                    </Button>
                  }
                >
                  {entry.asset_types && (
                    <div>
                      <p className="text-xs font-medium mb-2 text-foreground">Asset Types:</p>
                      <div className="flex flex-wrap gap-2">
                        {JSON.parse(entry.asset_types).map((type: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 rounded bg-accent/10 text-accent"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </PageCard>
              ))}
            </PageGrid>
          </div>
        </section>
      ) : null}

      {/* CTA Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading mb-4">Take the Next Step</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Thinking about investing in real estate in Canada? Speak with our team to explore opportunities that fit your goals.
          </p>
          <Button asChild size="lg" className="btn-gold border-0">
            <a href="/contact" className="flex items-center gap-2">
              Book a Consultation
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
