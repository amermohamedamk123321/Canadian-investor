/**
 * Services Page
 * Public-facing page for advisory and coordination services
 */

import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Users, Globe, Briefcase } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/pages/PageComponents';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useSEOMetadata } from '@/api/hooks';
import {
  staggerContainerVariants,
  staggerItemVariants,
  fadeInUpVariants,
  fadeInUpTransition,
  scrollTriggerOptions,
} from '@/lib/animations';

interface SEOMetadata {
  title: string;
  description: string;
}

export default function ServicesPage() {
  // Fetch SEO metadata
  const { data: seoResponse } = useSEOMetadata('services');
  const seo = seoResponse?.data as SEOMetadata | undefined;

  const { ref: servicesRef, inView: servicesInView } = useInView(scrollTriggerOptions);
  const { ref: canadianRef, inView: canadianInView } = useInView(scrollTriggerOptions);
  const { ref: internationalRef, inView: internationalInView } = useInView(scrollTriggerOptions);
  const { ref: roleRef, inView: roleInView } = useInView(scrollTriggerOptions);

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
      <section className="section-padding bg-muted/30 border-t border-accent/30">
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
                  className="bg-background rounded-xl p-6 border border-accent/40 hover:border-accent/80 transition-all shadow-md shadow-accent/10 hover:shadow-lg hover:shadow-accent/30"
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

      {/* For Canadian & International Investors */}
      <section className="section-padding bg-background border-t border-accent/30">
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
                className="p-8 rounded-2xl bg-muted/50 border border-accent/40 hover:border-accent/80 h-full shadow-md shadow-accent/10 hover:shadow-lg hover:shadow-accent/30 transition-all"
                variants={staggerItemVariants}
                whileHover={{}}
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

                  <div className="pt-4 border-t border-accent/30">
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
                className="p-8 rounded-2xl bg-muted/50 border border-accent/40 hover:border-accent/80 h-full shadow-md shadow-accent/10 hover:shadow-lg hover:shadow-accent/30 transition-all"
                variants={staggerItemVariants}
                whileHover={{}}
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

                  <div className="pt-4 border-t border-accent/30">
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
      <section className="section-padding bg-muted/30 border-t border-accent/30">
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
                className="p-6 rounded-xl bg-destructive/5 border border-destructive/40 shadow-md shadow-destructive/10"
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
