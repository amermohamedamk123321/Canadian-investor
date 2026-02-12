import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { Loader2, CheckCircle2, Globe, Users, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { usePage, useSEOMetadata } from '@/api/hooks';
import {
  fadeInUpVariants,
  fadeInUpTransition,
  staggerContainerVariants,
  staggerItemVariants,
  heroTitleVariants,
  heroSubtitleVariants,
  timelineStepVariants,
  scrollTriggerOptions,
} from '@/lib/animations';

const About = () => {
  // Fetch page content with caching
  const { data: pageData, isLoading: pageLoading } = usePage('about');

  // Fetch SEO metadata with caching
  const { data: seoData } = useSEOMetadata('about');

  const page = pageData?.data;
  const seo = seoData?.data;

  const { ref: companyRef, inView: companyInView } = useInView(scrollTriggerOptions);
  const { ref: servicesRef, inView: servicesInView } = useInView(scrollTriggerOptions);
  const { ref: processRef, inView: processInView } = useInView(scrollTriggerOptions);
  const { ref: workWithRef, inView: workWithInView } = useInView(scrollTriggerOptions);
  const { ref: operateRef, inView: operateInView } = useInView(scrollTriggerOptions);

  // What We Do list items
  const services = [
    'Commercial real estate and land investment guidance',
    'Residential real estate investment guidance for Canadian investors',
    'Identification of quality investment opportunities',
    'Market review and investment insight',
    'Coordination with licensed legal professionals',
    'Support for international investors through authorized immigration partners',
  ];

  // Investment process steps
  const processSteps = [
    {
      number: 1,
      title: 'Initial Consultation',
      description: 'Understanding your investment goals and preferences',
    },
    {
      number: 2,
      title: 'Understanding Your Goals',
      description: 'Clarifying your investment criteria and timeline',
    },
    {
      number: 3,
      title: 'Identifying Suitable Opportunities',
      description: 'Matching you with quality investment options',
    },
    {
      number: 4,
      title: 'Coordinating with Licensed Professionals',
      description: 'Ensuring proper legal and technical support',
    },
    {
      number: 5,
      title: 'Secure Closing and Support',
      description: 'Facilitating smooth transaction completion',
    },
  ];

  // Canadian regions we operate in
  const regions = [
    'Ontario',
    'British Columbia',
    'Alberta',
    'Quebec',
    'Other major Canadian regions',
  ];

  if (pageLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{seo?.title || page?.title || 'About Us'}</title>
        <meta
          name="description"
          content={seo?.description || page?.meta_description}
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl"
            initial="initial"
            animate="animate"
            variants={staggerContainerVariants}
          >
            <motion.span
              className="trust-badge mb-6 inline-block"
              variants={fadeInUpVariants}
              transition={fadeInUpTransition}
            >
              About Alpha Partners
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground"
              variants={heroTitleVariants}
            >
              {page?.title || 'About Alpha Partners Investment Inc'}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      {page?.content && (
        <section className="section-padding bg-background">
          <div className="container-custom">
            <motion.div
              className="prose prose-lg max-w-none"
              initial="initial"
              whileInView="animate"
              variants={fadeInUpVariants}
              transition={fadeInUpTransition}
              viewport={scrollTriggerOptions}
            >
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Company Overview Section */}
      <section className="section-padding bg-background border-t border-border/50">
        <div className="container-custom max-w-4xl">
          <motion.div
            ref={companyRef}
            initial="initial"
            animate={companyInView ? 'animate' : 'initial'}
            variants={staggerContainerVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-heading mb-8 text-foreground"
              variants={fadeInUpVariants}
              transition={fadeInUpTransition}
            >
              About Alpha Partners Investment Inc
            </motion.h2>

            <motion.div
              className="space-y-6 text-muted-foreground leading-relaxed"
              variants={staggerItemVariants}
            >
              <p className="text-lg">
                Alpha Partners Investment Inc is a Canada-based investment advisory team
                focused on commercial and residential real estate and strategic investment
                opportunities across Canada.
              </p>

              <p>
                We work with both Canadian and international investors interested in
                commercial and residential properties, land, and value-driven real estate
                investments. Our role is to guide clients through the investment process
                with clarity, transparency, and professionalism.
              </p>

              <p>
                For Canadian investors, we assist in identifying suitable opportunities and
                connect clients with licensed real estate professionals and legal partners to
                ensure a smooth and secure purchase process.
              </p>

              <p>
                For international investors, we support the investment journey by coordinating
                property acquisition with licensed legal professionals and collaborating with
                authorized immigration teams to facilitate a structured, compliant, and
                efficient investment pathway into Canada.
              </p>

              <p>
                We work exclusively with trusted, licensed professionals to ensure all
                investments are handled properly and in full compliance with Canadian
                regulations. Our focus is on long-term value creation, risk awareness, and
                helping our clients make informed and confident investment decisions in Canada.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-padding bg-muted/30 border-t border-border/50">
        <div className="container-custom max-w-4xl">
          <motion.div
            ref={servicesRef}
            initial="initial"
            animate={servicesInView ? 'animate' : 'initial'}
            variants={staggerContainerVariants}
          >
            <motion.div className="mb-12" variants={fadeInUpVariants}>
              <h2 className="text-3xl md:text-4xl font-heading mb-4 text-foreground">
                What We Do
              </h2>
              <div className="h-1 w-20 gold-gradient rounded-full"></div>
            </motion.div>

            <motion.div
              className="grid gap-4"
              variants={staggerContainerVariants}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 items-start p-4 rounded-lg hover:bg-muted/50 transition-colors"
                  variants={staggerItemVariants}
                >
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">{service}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Investment Process Section */}
      <section className="section-padding bg-background border-t border-border/50">
        <div className="container-custom max-w-5xl">
          <motion.div
            ref={processRef}
            initial="initial"
            animate={processInView ? 'animate' : 'initial'}
            variants={staggerContainerVariants}
          >
            <motion.div className="mb-12" variants={fadeInUpVariants}>
              <h2 className="text-3xl md:text-4xl font-heading mb-4 text-foreground">
                Our Investment Process
              </h2>
              <div className="h-1 w-20 gold-gradient rounded-full"></div>
            </motion.div>

            <div className="grid gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={timelineStepVariants(index)}
                  initial="initial"
                  animate={processInView ? 'animate' : 'initial'}
                  className="flex gap-6 items-start"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center text-primary font-heading text-xl font-bold mb-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      {step.number}
                    </motion.div>
                    {index < processSteps.length - 1 && (
                      <div className="w-1 h-12 bg-gradient-to-b from-accent to-accent/30"></div>
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-heading text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Work With Section */}
      <section className="section-padding bg-muted/30 border-t border-border/50">
        <div className="container-custom max-w-5xl">
          <motion.div
            ref={workWithRef}
            initial="initial"
            animate={workWithInView ? 'animate' : 'initial'}
            variants={staggerContainerVariants}
          >
            <motion.div className="mb-12" variants={fadeInUpVariants}>
              <h2 className="text-3xl md:text-4xl font-heading mb-4 text-foreground">
                Who We Work With
              </h2>
              <div className="h-1 w-20 gold-gradient rounded-full"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Canadian Investors */}
              <motion.div
                className="p-8 rounded-2xl bg-background border border-border/50 hover:border-accent/50 transition-all"
                variants={staggerItemVariants}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-8 h-8 text-accent" />
                  <h3 className="text-2xl font-heading text-foreground">
                    Canadian Investors
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We support Canadian investors in purchasing residential and commercial
                  properties and land through a clear and secure investment process.
                </p>
              </motion.div>

              {/* International Investors */}
              <motion.div
                className="p-8 rounded-2xl bg-background border border-border/50 hover:border-accent/50 transition-all"
                variants={staggerItemVariants}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-8 h-8 text-accent" />
                  <h3 className="text-2xl font-heading text-foreground">
                    International Investors
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We guide international investors through compliant and well-structured
                  commercial real estate investments in Canada, in collaboration with
                  licensed legal and immigration professionals.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Where We Operate Section */}
      <section className="section-padding bg-background border-t border-border/50">
        <div className="container-custom max-w-4xl">
          <motion.div
            ref={operateRef}
            initial="initial"
            animate={operateInView ? 'animate' : 'initial'}
            variants={staggerContainerVariants}
          >
            <motion.div className="mb-12" variants={fadeInUpVariants}>
              <h2 className="text-3xl md:text-4xl font-heading mb-4 text-foreground flex items-center gap-3">
                <MapPin className="w-8 h-8 text-accent" />
                Where We Operate
              </h2>
              <div className="h-1 w-20 gold-gradient rounded-full"></div>
            </motion.div>

            <motion.p
              className="text-lg text-muted-foreground mb-8"
              variants={fadeInUpVariants}
              transition={fadeInUpTransition}
            >
              We operate across key Canadian markets, including:
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={staggerContainerVariants}
            >
              {regions.map((region, index) => (
                <motion.span
                  key={region}
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

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-muted/50 to-muted/30 border-t border-border/50">
        <div className="container-custom max-w-3xl text-center">
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
              Ready to Explore Investment Opportunities?
            </motion.h2>

            <motion.p
              className="text-xl text-muted-foreground mb-8"
              variants={fadeInUpVariants}
              transition={{ ...fadeInUpTransition, delay: 0.1 }}
            >
              Speak with our team to understand how we can support your investment goals in
              Canada.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUpVariants}
              transition={{ ...fadeInUpTransition, delay: 0.2 }}
            >
              <Button asChild size="lg" className="btn-gold border-0">
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Consultation
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/opportunities" className="flex items-center gap-2">
                  View Investment Opportunities
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <motion.div
            className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8"
            initial="initial"
            whileInView="animate"
            variants={fadeInUpVariants}
            transition={fadeInUpTransition}
            viewport={scrollTriggerOptions}
          >
            <h3 className="font-heading text-foreground mb-4">Important Disclaimer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Alpha Partners Investment Inc. does not provide immigration, legal, or visa
              advice. We are not immigration consultants, lawyers, or licensed to provide
              legal advice. We connect investors with opportunities and facilitate
              introductions to licensed professionals who can provide specialized advice. All
              investment decisions should be made with appropriate professional advisors. Past
              performance does not guarantee future results. Investments involve risk including
              potential loss of principal.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
