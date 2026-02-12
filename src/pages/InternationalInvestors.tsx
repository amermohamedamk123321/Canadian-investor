import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/pages/PageComponents';

const investmentSteps = [
  {
    number: 1,
    title: 'Initial Consultation',
    description: 'We begin with a confidential consultation to understand your investment objectives, preferred markets, budget range, and timeline. This step allows us to clearly define your investment criteria.',
    outcome: 'A structured investor profile.',
  },
  {
    number: 2,
    title: 'Opportunity Identification',
    description: 'Based on your profile, we identify and shortlist suitable opportunities, which may include commercial properties, mixed-use assets, or commercial land. Each opportunity is reviewed with attention to location, market fundamentals, and alignment with your goals.',
    outcome: 'A curated list of relevant opportunities.',
  },
  {
    number: 3,
    title: 'Investment Review & Evaluation',
    description: 'We present each opportunity with clarity, outlining key considerations such as market context, potential value drivers, and material risks. Our goal is to ensure you are fully informed before proceeding.',
    outcome: 'Informed decision-making.',
  },
  {
    number: 4,
    title: 'Legal Coordination',
    description: 'Once an opportunity is selected, we coordinate with licensed Canadian real estate lawyers to support the transaction process, including offer preparation, agreement review, and closing coordination.',
    outcome: 'A secure and compliant transaction pathway.',
  },
  {
    number: 5,
    title: 'Immigration Coordination (If Applicable)',
    description: 'Where entry to Canada is required as part of your investment strategy, we coordinate with authorized immigration professionals to support a lawful and structured process.',
    outcome: 'Professional immigration support through authorized channels.',
  },
  {
    number: 6,
    title: 'Closing & Ongoing Support',
    description: 'We assist through the closing stage and remain available to support next steps, including future investment planning or portfolio expansion.',
    outcome: 'A complete and professional investment experience.',
  },
];

const whyChoose = [
  'Clear and structured investment guidance',
  'Coordination with trusted, licensed professionals',
  'Transparency and risk-aware decision support',
  'A long-term, value-focused approach',
];

const InternationalInvestors = () => {
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
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Alpha Partners Investment Inc works with international investors who seek well-structured and
              compliant opportunities in Canadian commercial real estate and land investments.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Our role is to provide clear market insight, careful opportunity selection, and professional
              coordination throughout the investment process.
            </p>
          </div>
        </section>

        {/* Who We Work With */}
        <section className="section-padding bg-secondary/50">
          <div className="container-custom">
            <h2 className="text-3xl font-heading mb-12 text-center">Who We Work With</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {[
                'Commercial real estate investments in Canada',
                'Commercial land and development opportunities',
                'A professional, transparent, and structured investment process'
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <Check className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Role */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading mb-8 text-center">Our Role in Your Investment Journey</h2>
            <div className="space-y-4">
              {[
                'Identifying opportunities aligned with your objectives',
                'Providing market context and investment insight',
                'Coordinating with licensed professionals at each stage',
                'Ensuring a clear and well managed acquisition process'
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/20"
                >
                  <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{item}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 p-6 rounded-xl bg-primary/5 border border-border/20">
              <p className="text-foreground font-medium mb-3">We collaborate with:</p>
              <ul className="space-y-2 text-foreground/80">
                <li>• Licensed Canadian real estate legal professionals</li>
                <li>• Authorized immigration professionals, where applicable</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6-Step Process */}
        <section className="section-padding bg-secondary/50">
          <div className="container-custom">
            <h2 className="text-3xl font-heading mb-12 text-center">Our Investment Process</h2>
            <div className="space-y-6">
              {investmentSteps.map((step) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (step.number - 1) * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background rounded-xl p-8 border border-border/20 hover:border-accent/50 transition-all"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-primary font-bold flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-heading text-foreground mb-3">{step.title}</h3>
                      <p className="text-foreground/80 leading-relaxed mb-4">{step.description}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10">
                        <span className="text-sm text-accent font-medium">Outcome:</span>
                        <span className="text-sm text-foreground/80">{step.outcome}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 p-6 rounded-xl bg-destructive/5 border border-destructive/20 text-center">
              <p className="text-sm text-foreground font-medium mb-2">Important Note:</p>
              <p className="text-sm text-muted-foreground">
                Alpha Partners Investment Inc does not provide immigration advice. All immigration services
                are provided exclusively by licensed professionals.
              </p>
            </div>
          </div>
        </section>

        {/* Markets We Cover */}
        <section className="section-padding bg-background">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-heading mb-6">Markets We Cover</h2>
            <p className="text-lg text-muted-foreground mb-10">
              We support commercial real estate investments across Canada, including:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Ontario', 'British Columbia', 'Alberta', 'Quebec', 'Other strategic Canadian regions'].map((region, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 rounded-full bg-secondary border border-border/20"
                >
                  {region}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-secondary/50">
          <div className="container-custom">
            <h2 className="text-3xl font-heading mb-12 text-center">Why Investors Choose Alpha Partners Investment Inc</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {whyChoose.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 rounded-lg bg-background border border-border/20"
                >
                  <Check className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-foreground">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-heading mb-6">Begin Your Investment Journey</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              If you are considering commercial real estate investment in Canada, our team is ready to guide
              you through a clear and professional process.
            </p>
            <Button asChild size="lg" className="btn-gold border-0">
              <Link to="/contact" className="flex items-center gap-2">
                Book a Consultation
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <p className="text-muted-foreground mt-6">
              or contact us at info@alphapartnersinvestment.com
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default InternationalInvestors;
