/**
 * Canadian Investors Page
 * Public-facing page for Canadian investment opportunities
 */

import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check, ArrowRight, MapPin } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { PageHero, PageCard, PageGrid } from '../components/pages/PageComponents';
import { Button } from '../components/ui/button';
import { Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import {
  staggerContainerVariants,
  staggerItemVariants,
  fadeInUpVariants,
  fadeInUpTransition,
  timelineStepVariants,
  scrollTriggerOptions,
} from '@/lib/animations';

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
      const response = await fetch('/api/pages/canadian-investors');
      if (!response.ok) throw new Error('Failed to fetch page');
      return response.json();
    },
  });

  // Fetch Canadian investor entries
  const { data: entriesData, isLoading: entriesLoading } = useQuery({
    queryKey: ['canadian-investors'],
    queryFn: async () => {
      const response = await fetch('/api/canadian-investors');
      if (!response.ok) throw new Error('Failed to fetch entries');
      return response.json();
    },
  });

  // Fetch SEO metadata
  const { data: seoData } = useQuery({
    queryKey: ['seo', 'canadian-investors'],
    queryFn: async () => {
      const response = await fetch('/api/seo/canadian-investors');
      if (!response.ok) return null;
      return response.json();
    },
  });

  const { ref: investRef, inView: investInView } = useInView(scrollTriggerOptions);
  const { ref: servicesRef, inView: servicesInView } = useInView(scrollTriggerOptions);
  const { ref: processRef, inView: processInView } = useInView(scrollTriggerOptions);
  const { ref: chooseRef, inView: chooseInView } = useInView(scrollTriggerOptions);
  const { ref: operateRef, inView: operateInView } = useInView(scrollTriggerOptions);

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

  const investmentTypes = [
    'Residential real estate',
    'Commercial properties',
    'Agricultural and farm land',
  ];

  const services = [
    'Identification of suitable investment opportunities',
    'Market insight and investment review',
    'Guidance throughout the buying process',
    'Coordination with licensed real estate professionals',
    'Connection with trusted legal partners for secure transactions',
  ];

  const processSteps = [
    {
      number: 1,
      title: 'Initial Consultation',
      description: 'Understand your investment goals and criteria',
    },
    {
      number: 2,
      title: 'Understanding Your Goals',
      description: 'Define your investment strategy and timeline',
    },
    {
      number: 3,
      title: 'Opportunity Matching',
      description: 'Identify suitable properties aligned with your goals',
    },
    {
      number: 4,
      title: 'Professional Coordination',
      description: 'Work with licensed professionals for due diligence',
    },
    {
      number: 5,
      title: 'Secure Closing',
      description: 'Complete your investment with professional support',
    },
  ];

  const whyChooseUs = [
    'Clear and transparent guidance',
    'Professional and structured approach',
    'Collaboration with licensed professionals',
    'Focus on secure and well-informed investments',
  ];

  const regions = [
    'Ontario',
    'British Columbia',
    'Alberta',
    'Quebec',
    'Other key regions in Canada',
  ];

  return (
    <Layout>
      <Helmet>
        <title>
          {seo?.title || 'Canadian Investors - Alpha Partners Investment Inc'}
        </title>
        <meta
          name="description"
          content={
            seo?.description ||
            'Real Estate Investment Solutions in Canada. Invest with clarity and confidence with Alpha Partners Investment Inc.'
          }
        />
        {seo?.og_title && <meta property="og:title" content={seo.og_title} />}
        {seo?.og_description && (
          <meta property="og:description" content={seo.og_description} />
        )}
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
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={staggerContainerVariants}
            viewport={scrollTriggerOptions}
          >
            <motion.p
              className="text-lg text-foreground/80 leading-relaxed mb-6"
              variants={fadeInUpVariants}
              transition={fadeInUpTransition}
            >
              We support Canadian investors in purchasing and investing in residential real
              estate, commercial properties, and agricultural land across Canada.
            </motion.p>
            <motion.p
              className="text-lg text-foreground/80 leading-relaxed"
              variants={fadeInUpVariants}
              transition={{ ...fadeInUpTransition, delay: 0.1 }}
            >
              Our role is to provide clear guidance, practical insight, and professional
              coordination throughout the investment process.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What We Help You Invest In */}
      <section className="section-padding bg-muted/30 border-t border-accent/30">
        <div className="container-custom">
          <motion.div
            ref={investRef}
            initial="initial"
            animate={investInView ? 'animate' : 'initial'}
            variants={staggerContainerVariants}
          >
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2
                  className="text-3xl md:text-4xl font-heading mb-8 text-foreground"
                  variants={fadeInUpVariants}
                  transition={fadeInUpTransition}
                >
                  What We Help You Invest In
                </motion.h2>

                <motion.div
                  className="h-1 w-20 gold-gradient rounded-full mb-8"
                  variants={fadeInUpVariants}
                  transition={fadeInUpTransition}
                ></motion.div>

                <motion.ul
                  className="space-y-4 mb-8"
                  variants={staggerContainerVariants}
                >
                  {investmentTypes.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center gap-4"
                      variants={staggerItemVariants}
                    >
                      <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-lg text-foreground font-medium">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.p
                  className="text-muted-foreground leading-relaxed"
                  variants={staggerItemVariants}
                >
                  Each opportunity is reviewed with a focus on long-term value, risk
                  awareness, and alignment with your investment goals.
                </motion.p>
              </div>

              <motion.div
                className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 border border-accent/20"
                variants={staggerItemVariants}
                whileHover={{ boxShadow: '0 20px 40px rgba(217, 70, 39, 0.1)' }}
              >
                <p className="text-foreground leading-relaxed mb-4">
                  We understand that each investor has unique goals and timelines. Our team
                  works with you to identify properties that not only meet your investment
                  criteria but also align with your long-term financial strategy.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  With our structured approach and professional network, we ensure every
                  investment decision is informed, transparent, and aligned with your vision.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Services */}
      <section className="section-padding bg-background border-t border-accent/30">
        <div className="container-custom">
          <motion.div
            ref={servicesRef}
            initial="initial"
            animate={servicesInView ? 'animate' : 'initial'}
            variants={staggerContainerVariants}
          >
            <motion.div className="mb-12" variants={fadeInUpVariants}>
              <h2 className="text-3xl md:text-4xl font-heading text-foreground">
                Our Services for Canadian Investors
              </h2>
              <div className="h-1 w-20 gold-gradient rounded-full mt-4"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  className="bg-muted/50 rounded-xl p-6 border border-accent/40 hover:border-accent/80 transition-all shadow-md shadow-accent/10 hover:shadow-lg hover:shadow-accent/30"
                  variants={staggerItemVariants}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-foreground font-medium leading-relaxed">{service}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Investment Process */}
      <section className="section-padding bg-muted/30 border-t border-accent/30">
        <div className="container-custom">
          <motion.div
            ref={processRef}
            initial="initial"
            animate={processInView ? 'animate' : 'initial'}
            variants={staggerContainerVariants}
          >
            <motion.div className="mb-12" variants={fadeInUpVariants}>
              <h2 className="text-3xl md:text-4xl font-heading text-foreground">
                Our Investment Process
              </h2>
              <div className="h-1 w-20 gold-gradient rounded-full mt-4"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {processSteps.map((step) => (
                <motion.div
                  key={step.number}
                  variants={timelineStepVariants(step.number - 1)}
                  initial="initial"
                  animate={processInView ? 'animate' : 'initial'}
                  className="relative"
                >
                  <div className="bg-background rounded-xl p-6 border border-accent/40 hover:border-accent/80 h-full transition-all shadow-md shadow-accent/10 hover:shadow-lg hover:shadow-accent/30">
                    <motion.div
                      className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-primary font-heading font-bold mb-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      {step.number}
                    </motion.div>
                    <h4 className="font-heading text-foreground mb-2 text-sm leading-tight">
                      {step.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="section-padding bg-background border-t border-accent/30">
        <div className="container-custom">
          <motion.div
            ref={chooseRef}
            initial="initial"
            animate={chooseInView ? 'animate' : 'initial'}
            variants={staggerContainerVariants}
          >
            <motion.div className="mb-12 text-center" variants={fadeInUpVariants}>
              <h2 className="text-3xl md:text-4xl font-heading text-foreground">
                Why Work with Alpha Partners Investment Inc
              </h2>
              <div className="h-1 w-20 gold-gradient rounded-full mx-auto mt-4"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {whyChooseUs.map((reason, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-4 p-6 rounded-lg bg-muted/30 border border-accent/40 hover:border-accent/80 hover:bg-muted/50 transition-all shadow-md shadow-accent/10 hover:shadow-lg hover:shadow-accent/30"
                  variants={staggerItemVariants}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-lg text-foreground font-medium">{reason}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Where We Operate */}
      <section className="section-padding bg-muted/30 border-t border-accent/30">
        <div className="container-custom">
          <motion.div
            ref={operateRef}
            initial="initial"
            animate={operateInView ? 'animate' : 'initial'}
            variants={staggerContainerVariants}
          >
            <motion.div className="mb-12 text-center" variants={fadeInUpVariants}>
              <h2 className="text-3xl md:text-4xl font-heading text-foreground flex items-center justify-center gap-3 mb-4">
                <MapPin className="h-8 w-8 text-accent" />
                Where We Operate
              </h2>
              <div className="h-1 w-20 gold-gradient rounded-full mx-auto mt-4"></div>
            </motion.div>

            <motion.p
              className="text-center text-lg text-muted-foreground mb-8"
              variants={fadeInUpVariants}
              transition={fadeInUpTransition}
            >
              We support Canadian investors across major markets, including:
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              variants={staggerContainerVariants}
            >
              {regions.map((region, idx) => (
                <motion.span
                  key={idx}
                  className="px-6 py-3 rounded-full bg-accent/10 text-accent border border-accent/50 hover:border-accent/80 font-medium shadow-md shadow-accent/10 hover:shadow-lg hover:shadow-accent/30 transition-all"
                  variants={staggerItemVariants}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(217, 70, 39, 0.2)' }}
                >
                  {region}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Investment Opportunities Grid */}
      {entriesLoading ? (
        <section className="section-padding bg-background flex items-center justify-center border-t border-accent/30">
          <Loader2 className="animate-spin" />
        </section>
      ) : entries.length > 0 ? (
        <section className="section-padding bg-background border-t border-accent/30">
          <div className="container-custom">
            <motion.h2
              className="text-3xl md:text-4xl font-heading mb-4 text-foreground"
              initial="initial"
              whileInView="animate"
              variants={fadeInUpVariants}
              transition={fadeInUpTransition}
              viewport={scrollTriggerOptions}
            >
              Investment Opportunities by Province
            </motion.h2>
            <motion.div
              className="h-1 w-20 gold-gradient rounded-full mb-12"
              initial="initial"
              whileInView="animate"
              variants={fadeInUpVariants}
              transition={fadeInUpTransition}
              viewport={scrollTriggerOptions}
            ></motion.div>

            <PageGrid columns={3}>
              {entries.map((entry: CanadianInvestorEntry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={scrollTriggerOptions}
                >
                  <PageCard
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
                        <p className="text-xs font-medium mb-2 text-foreground">
                          Asset Types:
                        </p>
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
                </motion.div>
              ))}
            </PageGrid>
          </div>
        </section>
      ) : null}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-muted/50 to-muted/30 border-t border-accent/30">
        <div className="container-custom text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={staggerContainerVariants}
            viewport={scrollTriggerOptions}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-heading mb-6 text-foreground"
              variants={fadeInUpVariants}
              transition={fadeInUpTransition}
            >
              Take the Next Step
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={fadeInUpVariants}
              transition={{ ...fadeInUpTransition, delay: 0.1 }}
            >
              Thinking about investing in real estate in Canada? Speak with our team to
              explore opportunities that fit your goals.
            </motion.p>

            <motion.div
              variants={fadeInUpVariants}
              transition={{ ...fadeInUpTransition, delay: 0.2 }}
            >
              <Button asChild size="lg" className="btn-gold border-0">
                <a href="/contact" className="flex items-center gap-2">
                  Book a Consultation
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
