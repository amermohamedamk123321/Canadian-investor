/**
 * Services Page
 * Public-facing page for advisory and coordination services
 */

import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Users, Globe, Briefcase } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageHero, PageCard, PageGrid } from '@/components/pages/PageComponents';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import {
  staggerContainerVariants,
  staggerItemVariants,
  fadeInUpVariants,
  fadeInUpTransition,
  scrollTriggerOptions,
} from '@/lib/animations';

interface ServiceEntry {
  id: string;
  title: string;
  slug: string;
  description: string;
  details: string;
  audience: string;
  attachments: string;
  display_order: number;
}

interface PageContent {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_description: string;
}

interface SEOMetadata {
  title: string;
  description: string;
}

export default function ServicesPage() {
  // Fetch page content
  const { data: pageData, isLoading: pageLoading } = useQuery({
    queryKey: ['pages', 'services'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/pages/services`);
      if (!response.ok) throw new Error('Failed to fetch page');
      return response.json();
    },
  });

  // Fetch services
  const { data: servicesData, isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/services`);
      if (!response.ok) throw new Error('Failed to fetch services');
      return response.json();
    },
  });

  // Fetch SEO metadata
  const { data: seoData } = useQuery({
    queryKey: ['seo', 'services'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/seo/services`);
      if (!response.ok) return null;
      return response.json();
    },
  });

  const { ref: servicesRef, inView: servicesInView } = useInView(scrollTriggerOptions);
  const { ref: canadianRef, inView: canadianInView } = useInView(scrollTriggerOptions);
  const { ref: internationalRef, inView: internationalInView } = useInView(scrollTriggerOptions);
  const { ref: roleRef, inView: roleInView } = useInView(scrollTriggerOptions);

  const page = pageData?.data as PageContent | undefined;
  const services = servicesData?.data || [];
  const seo = seoData?.data as SEOMetadata | undefined;

  if (pageLoading || servicesLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      </Layout>
    );
  }

  const getAudienceBadgeVariant = (audience: string) => {
    switch (audience) {
      case 'canadian':
        return 'default';
      case 'international':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case 'canadian':
        return 'Canadian Investors';
      case 'international':
        return 'International Investors';
      default:
        return 'All Investors';
    }
  };

  // Core services from PDF
  const ourServices = [
    'Investment opportunity sourcing and evaluation',
    'Market insight and investment guidance',
    'Investor profiling and opportunity alignment',
    'Transaction coordination',
    'Coordination with licensed legal professionals',
  ];

  return (
    <Layout>
      <Helmet>
        <title>{seo?.title || 'Services - Alpha Partners'}</title>
        <meta
          name="description"
          content={
            seo?.description ||
            'Investment Advisory & Professional Coordination Services for Canadian and International Investors'
          }
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Hero Section */}
      <PageHero
        badge="Services"
        title="Investment Advisory & Professional Coordination"
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
              Alpha Partners Investment Inc provides focused investment guidance and
              professional coordination for real estate and land investments across Canada.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Services Core List */}
      <section className="section-padding bg-muted/30 border-t border-border/50">
        <div className="container-custom">
          <motion.div
            ref={servicesRef}
            initial="initial"
            animate={servicesInView ? 'animate' : 'initial'}
            variants={staggerContainerVariants}
          >
            <motion.div className="mb-12" variants={fadeInUpVariants}>
              <h2 className="text-3xl md:text-4xl font-heading text-foreground">
                Our Services
              </h2>
              <div className="h-1 w-20 gold-gradient rounded-full mt-4"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ourServices.map((service, idx) => (
                <motion.div
                  key={idx}
                  className="bg-background rounded-xl p-6 border border-border/50 hover:border-accent/50 transition-all"
                  variants={staggerItemVariants}
                  whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(217, 70, 39, 0.1)' }}
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

      {/* For Canadian & International Investors */}
      <section className="section-padding bg-background border-t border-border/50">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={staggerContainerVariants}
            viewport={scrollTriggerOptions}
          >
            <motion.div className="mb-12 text-center" variants={fadeInUpVariants}>
              <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                Tailored Solutions
              </h2>
              <div className="h-1 w-20 gold-gradient rounded-full mx-auto mt-4"></div>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Canadian Investors */}
            <motion.div
              ref={canadianRef}
              initial="initial"
              animate={canadianInView ? 'animate' : 'initial'}
              variants={staggerContainerVariants}
            >
              <motion.div
                className="p-8 rounded-2xl bg-muted/50 border border-border/50 h-full"
                variants={staggerItemVariants}
                whileHover={{ borderColor: 'rgba(217, 70, 39, 0.5)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-heading text-foreground">
                    For Canadian Investors
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Guidance and coordination for residential, commercial, and land investments
                    across Canada.
                  </p>

                  <div className="pt-4 border-t border-border/30">
                    <p className="text-sm font-semibold text-foreground mb-3">We Help You With:</p>
                    <ul className="space-y-2">
                      {[
                        'Identifying suitable investment opportunities',
                        'Market insight and investment review',
                        'Guidance throughout the buying process',
                        'Coordination with licensed real estate professionals',
                        'Connection with trusted legal partners',
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-muted-foreground text-sm">
                          <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* International Investors */}
            <motion.div
              ref={internationalRef}
              initial="initial"
              animate={internationalInView ? 'animate' : 'initial'}
              variants={staggerContainerVariants}
            >
              <motion.div
                className="p-8 rounded-2xl bg-muted/50 border border-border/50 h-full"
                variants={staggerItemVariants}
                whileHover={{ borderColor: 'rgba(217, 70, 39, 0.5)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-heading text-foreground">
                    For International Investors
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Structured support for commercial real estate and land investments in Canada,
                    in coordination with licensed legal and authorized immigration professionals.
                  </p>

                  <div className="pt-4 border-t border-border/30">
                    <p className="text-sm font-semibold text-foreground mb-3">We Provide:</p>
                    <ul className="space-y-2">
                      {[
                        'Identifying opportunities aligned with your objectives',
                        'Providing market context and investment insight',
                        'Coordinating with licensed professionals at each stage',
                        'Ensuring a clear and well-managed acquisition process',
                        'Support through legal and immigration coordination',
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-muted-foreground text-sm">
                          <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Role Section */}
      <section className="section-padding bg-muted/30 border-t border-border/50">
        <div className="container-custom max-w-4xl">
          <motion.div
            ref={roleRef}
            initial="initial"
            animate={roleInView ? 'animate' : 'initial'}
            variants={staggerContainerVariants}
          >
            <motion.div className="mb-12" variants={fadeInUpVariants}>
              <h2 className="text-3xl md:text-4xl font-heading text-foreground flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-accent" />
                Our Role
              </h2>
              <div className="h-1 w-20 gold-gradient rounded-full mt-4"></div>
            </motion.div>

            <motion.div
              className="space-y-6"
              variants={staggerContainerVariants}
            >
              <motion.p
                className="text-lg text-muted-foreground leading-relaxed"
                variants={staggerItemVariants}
              >
                Alpha Partners Investment Inc acts as an investment advisory and coordination
                partner, supporting a clear, structured, and compliant investment process.
              </motion.p>

              <motion.p
                className="text-foreground/80 leading-relaxed"
                variants={staggerItemVariants}
              >
                We specialize in connecting qualified investors with carefully vetted real
                estate opportunities while ensuring all interactions with legal professionals,
                immigration consultants, and other service providers are properly coordinated
                and aligned with Canadian regulations.
              </motion.p>

              <motion.div
                className="p-6 rounded-xl bg-destructive/5 border border-destructive/20"
                variants={staggerItemVariants}
              >
                <h4 className="font-heading text-foreground mb-3">Important Notice</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Alpha Partners Investment Inc does not provide legal or immigration advice.
                  All legal and immigration services are provided exclusively by licensed
                  professionals. We facilitate professional coordination and introductions only.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Service Entries Grid */}
      {servicesLoading ? (
        <section className="section-padding bg-background flex items-center justify-center border-t border-border/50">
          <Loader2 className="animate-spin" />
        </section>
      ) : services.length > 0 ? (
        <section className="section-padding bg-background border-t border-border/50">
          <div className="container-custom">
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={staggerContainerVariants}
              viewport={scrollTriggerOptions}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-heading mb-4 text-foreground"
                variants={fadeInUpVariants}
                transition={fadeInUpTransition}
              >
                Additional Service Offerings
              </motion.h2>
              <motion.div
                className="h-1 w-20 gold-gradient rounded-full mb-12"
                variants={fadeInUpVariants}
                transition={fadeInUpTransition}
              ></motion.div>
            </motion.div>

            <PageGrid columns={3}>
              {services.map((service: ServiceEntry) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={scrollTriggerOptions}
                >
                  <PageCard
                    title={service.title}
                    description={service.description}
                    badge={
                      service.audience
                        ? {
                            label: getAudienceLabel(service.audience),
                            variant:
                              getAudienceBadgeVariant(service.audience) as
                                | 'default'
                                | 'secondary'
                                | 'outline',
                          }
                        : undefined
                    }
                    footer={
                      <Button asChild className="w-full btn-gold border-0" size="sm">
                        <Link to="/contact">Learn More</Link>
                      </Button>
                    }
                  >
                    {service.details && (
                      <div className="text-sm text-muted-foreground prose prose-sm">
                        <div dangerouslySetInnerHTML={{ __html: service.details }} />
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
      <section className="section-padding bg-gradient-to-r from-muted/50 to-muted/30 border-t border-border/50">
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
              Ready to Get Started?
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={fadeInUpVariants}
              transition={{ ...fadeInUpTransition, delay: 0.1 }}
            >
              Contact our team to discuss how our services can support your investment goals
            </motion.p>

            <motion.div
              variants={fadeInUpVariants}
              transition={{ ...fadeInUpTransition, delay: 0.2 }}
            >
              <Button asChild size="lg" className="btn-gold border-0">
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Consultation
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
