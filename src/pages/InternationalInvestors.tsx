import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { Check, AlertCircle, ArrowRight, Globe, Briefcase, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/pages/PageComponents';
import { useInView } from 'react-intersection-observer';
import {
  staggerContainerVariants,
  staggerItemVariants,
  fadeInUpVariants,
  fadeInUpTransition,
  timelineStepVariants,
  scrollTriggerOptions,
} from '@/lib/animations';

const investmentSteps = [
  {
    number: 1,
    title: 'Initial Consultation',
    description:
      'We begin with a confidential consultation to understand your investment objectives, preferred markets, budget range, and timeline. This step allows us to clearly define your investment criteria.',
    outcome: 'A structured investor profile.',
  },
  {
    number: 2,
    title: 'Opportunity Identification',
    description:
      'Based on your profile, we identify and shortlist suitable opportunities, which may include commercial properties, mixed-use assets, or commercial land. Each opportunity is reviewed with attention to location, market fundamentals, and alignment with your goals.',
    outcome: 'A curated list of relevant opportunities.',
  },
  {
    number: 3,
    title: 'Investment Review & Evaluation',
    description:
      'We present each opportunity with clarity, outlining key considerations such as market context, potential value drivers, and material risks. Our goal is to ensure you are fully informed before proceeding.',
    outcome: 'Informed decision-making.',
  },
  {
    number: 4,
    title: 'Legal Coordination',
    description:
      'Once an opportunity is selected, we coordinate with licensed Canadian real estate lawyers to support the transaction process, including offer preparation, agreement review, and closing coordination.',
    outcome: 'A secure and compliant transaction pathway.',
  },
  {
    number: 5,
    title: 'Immigration Coordination (If Applicable)',
    description:
      'Where entry to Canada is required as part of your investment strategy, we coordinate with authorized immigration professionals to support a lawful and structured process.',
    outcome: 'Professional immigration support through authorized channels.',
  },
  {
    number: 6,
    title: 'Closing & Ongoing Support',
    description:
      'We assist through the closing stage and remain available to support next steps, including future investment planning or portfolio expansion.',
    outcome: 'A complete and professional investment experience.',
  },
];

const whyChoose = [
  'Clear and structured investment guidance',
  'Coordination with trusted, licensed professionals',
  'Transparency and risk-aware decision support',
  'A long-term, value-focused approach',
];

const workWithItems = [
  'Commercial real estate investments in Canada',
  'Commercial land and development opportunities',
  'A professional, transparent, and structured investment process',
];

const ourRoleItems = [
  'Identifying opportunities aligned with your objectives',
  'Providing market context and investment insight',
  'Coordinating with licensed professionals at each stage',
  'Ensuring a clear and well managed acquisition process',
];

const regions = [
  'Ontario',
  'British Columbia',
  'Alberta',
  'Quebec',
  'Other strategic Canadian regions',
];

const InternationalInvestors = () => {
  const { ref: workWithRef, inView: workWithInView } = useInView(scrollTriggerOptions);
  const { ref: roleRef, inView: roleInView } = useInView(scrollTriggerOptions);
  const { ref: processRef, inView: processInView } = useInView(scrollTriggerOptions);
  const { ref: marketsRef, inView: marketsInView } = useInView(scrollTriggerOptions);
  const { ref: chooseRef, inView: chooseInView } = useInView(scrollTriggerOptions);

  return (
    <>
      <SEOHead
        title="International Investors - Alpha Partners"
        description="A Structured Approach to Commercial Real Estate Investment in Canada. Invest in Canada with clarity and confidence through our professional guidance and coordination."
        canonical="/international-investors"
      />
      <Layout>
        {/* Hero */}
        <PageHero
          badge="International Investors"
          title="A Structured Approach to Commercial Real Estate Investment in Canada"
          subtitle="Invest in Canada with Clarity and Confidence"
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
                Alpha Partners Investment Inc works with international investors who seek
                well-structured and compliant opportunities in Canadian commercial real estate
                and land investments.
              </motion.p>
              <motion.p
                className="text-lg text-foreground/80 leading-relaxed"
                variants={fadeInUpVariants}
                transition={{ ...fadeInUpTransition, delay: 0.1 }}
              >
                Our role is to provide clear market insight, careful opportunity selection,
                and professional coordination throughout the investment process.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Who We Work With */}
        <section className="section-padding bg-muted/30 border-t border-border/50">
          <div className="container-custom">
            <motion.div
              ref={workWithRef}
              initial="initial"
              animate={workWithInView ? 'animate' : 'initial'}
              variants={staggerContainerVariants}
            >
              <motion.div className="mb-12 text-center" variants={fadeInUpVariants}>
                <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                  Who We Work With
                </h2>
                <div className="h-1 w-20 gold-gradient rounded-full mx-auto mt-4"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {workWithItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="p-6 rounded-xl bg-background border border-border/50 hover:border-accent/50 transition-all"
                    variants={staggerItemVariants}
                    whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(217, 70, 39, 0.1)' }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-foreground font-medium leading-relaxed">{item}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Role */}
        <section className="section-padding bg-background border-t border-border/50">
          <div className="container-custom max-w-4xl">
            <motion.div
              ref={roleRef}
              initial="initial"
              animate={roleInView ? 'animate' : 'initial'}
              variants={staggerContainerVariants}
            >
              <motion.div className="mb-12" variants={fadeInUpVariants}>
                <h2 className="text-3xl md:text-4xl font-heading text-foreground flex items-center gap-3 mb-4">
                  <Briefcase className="h-8 w-8 text-accent" />
                  Our Role in Your Investment Journey
                </h2>
                <div className="h-1 w-20 gold-gradient rounded-full mt-4"></div>
              </motion.div>

              <motion.div
                className="space-y-4 mb-8"
                variants={staggerContainerVariants}
              >
                {ourRoleItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="p-6 rounded-lg bg-muted/50 border border-border/50 hover:border-accent/50 transition-all hover:bg-muted/70"
                    variants={staggerItemVariants}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-foreground font-medium leading-relaxed">{item}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="p-6 rounded-xl bg-primary/5 border border-border/20"
                variants={staggerItemVariants}
              >
                <p className="text-foreground font-heading mb-4">We Collaborate With:</p>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    Licensed Canadian real estate legal professionals
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    Authorized immigration professionals, where applicable
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 6-Step Process */}
        <section className="section-padding bg-muted/30 border-t border-border/50">
          <div className="container-custom">
            <motion.div
              ref={processRef}
              initial="initial"
              animate={processInView ? 'animate' : 'initial'}
              variants={staggerContainerVariants}
            >
              <motion.div className="mb-12 text-center" variants={fadeInUpVariants}>
                <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                  Our Investment Process
                </h2>
                <div className="h-1 w-20 gold-gradient rounded-full mx-auto mt-4"></div>
              </motion.div>

              <div className="space-y-6">
                {investmentSteps.map((step) => (
                  <motion.div
                    key={step.number}
                    variants={timelineStepVariants(step.number - 1)}
                    initial="initial"
                    animate={processInView ? 'animate' : 'initial'}
                    className="bg-background rounded-xl p-8 border border-border/50 hover:border-accent/50 transition-all"
                  >
                    <div className="flex items-start gap-6">
                      <motion.div
                        className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center text-primary font-heading font-bold text-lg flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                      >
                        {step.number}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-heading text-foreground mb-3">
                          {step.title}
                        </h3>
                        <p className="text-foreground/80 leading-relaxed mb-4">
                          {step.description}
                        </p>
                        <motion.div
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30"
                          whileHover={{ backgroundColor: 'rgba(217, 70, 39, 0.15)' }}
                        >
                          <span className="text-sm font-semibold text-accent">Outcome:</span>
                          <span className="text-sm text-foreground/80">{step.outcome}</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-12 p-6 rounded-xl bg-destructive/5 border border-destructive/20"
                variants={staggerItemVariants}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-heading text-foreground mb-2">Important Note:</p>
                    <p className="text-sm text-muted-foreground">
                      Alpha Partners Investment Inc does not provide immigration advice. All
                      immigration services are provided exclusively by licensed professionals.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Markets We Cover */}
        <section className="section-padding bg-background border-t border-border/50">
          <div className="container-custom text-center">
            <motion.div
              ref={marketsRef}
              initial="initial"
              animate={marketsInView ? 'animate' : 'initial'}
              variants={staggerContainerVariants}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-heading mb-4 text-foreground flex items-center justify-center gap-3"
                variants={fadeInUpVariants}
                transition={fadeInUpTransition}
              >
                <MapPin className="h-8 w-8 text-accent" />
                Markets We Cover
              </motion.h2>

              <motion.div
                className="h-1 w-20 gold-gradient rounded-full mx-auto mt-4 mb-8"
                variants={fadeInUpVariants}
                transition={fadeInUpTransition}
              ></motion.div>

              <motion.p
                className="text-lg text-muted-foreground mb-10"
                variants={fadeInUpVariants}
                transition={fadeInUpTransition}
              >
                We support commercial real estate investments across Canada, including:
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-4"
                variants={staggerContainerVariants}
              >
                {regions.map((region, idx) => (
                  <motion.span
                    key={idx}
                    className="px-6 py-3 rounded-full bg-accent/10 text-accent border border-accent/30 font-medium"
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

        {/* Why Choose Us */}
        <section className="section-padding bg-muted/30 border-t border-border/50">
          <div className="container-custom">
            <motion.div
              ref={chooseRef}
              initial="initial"
              animate={chooseInView ? 'animate' : 'initial'}
              variants={staggerContainerVariants}
            >
              <motion.div className="mb-12 text-center" variants={fadeInUpVariants}>
                <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                  Why Investors Choose Alpha Partners Investment Inc
                </h2>
                <div className="h-1 w-20 gold-gradient rounded-full mx-auto mt-4"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {whyChoose.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="p-6 rounded-lg bg-background border border-border/50 hover:border-accent/50 transition-all"
                    variants={staggerItemVariants}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-foreground font-medium leading-relaxed">{item}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
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
                Begin Your Investment Journey
              </motion.h2>

              <motion.p
                className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
                variants={fadeInUpVariants}
                transition={{ ...fadeInUpTransition, delay: 0.1 }}
              >
                If you are considering commercial real estate investment in Canada, our team
                is ready to guide you through a clear and professional process.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeInUpVariants}
                transition={{ ...fadeInUpTransition, delay: 0.2 }}
              >
                <Button asChild size="lg" className="btn-gold border-0">
                  <Link to="/contact" className="flex items-center justify-center gap-2">
                    Book a Consultation
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.p
                className="text-muted-foreground mt-8"
                variants={fadeInUpVariants}
                transition={{ ...fadeInUpTransition, delay: 0.3 }}
              >
                or contact us at{' '}
                <a
                  href="mailto:info@alphapartnersinvestment.com"
                  className="text-accent hover:underline font-medium"
                >
                  info@alphapartnersinvestment.com
                </a>
              </motion.p>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default InternationalInvestors;
