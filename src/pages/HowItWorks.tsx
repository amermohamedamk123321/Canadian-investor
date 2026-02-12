import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, FileCheck, Handshake, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery & Matching',
    description: 'Begin by exploring our curated investment opportunities or sharing your investment criteria with our team.',
    details: [
      'Browse opportunities by sector, province, and investment size',
      'Schedule an introductory call with our investment team',
      'Receive personalized opportunity recommendations',
      'Access preliminary information packages',
    ],
  },
  {
    icon: FileCheck,
    number: '02',
    title: 'Due Diligence',
    description: 'Access comprehensive documentation and conduct thorough analysis with support from our professional network.',
    details: [
      'Review detailed business plans and financials',
      'Connect with legal and accounting professionals',
      'Site visits and management meetings',
      'Third-party verification and background checks',
    ],
  },
  {
    icon: Handshake,
    number: '03',
    title: 'Transaction Structuring',
    description: 'Work with our team to structure your investment in a way that aligns with your goals and risk tolerance.',
    details: [
      'Negotiate terms and conditions',
      'Legal documentation preparation',
      'Escrow and fund transfer coordination',
      'Regulatory compliance verification',
    ],
  },
  {
    icon: TrendingUp,
    number: '04',
    title: 'Portfolio Management',
    description: 'Receive ongoing monitoring, reporting, and support throughout the lifecycle of your investment.',
    details: [
      'Quarterly performance reports',
      'Annual investor meetings',
      'Ongoing portfolio company support',
      'Exit strategy planning and execution',
    ],
  },
];

const HowItWorks = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <>
      <SEOHead
        title="How It Works"
        description="Learn how Alpha Partners guides investors through the process of identifying, evaluating, and executing strategic investments in Canada."
        canonical="/how-it-works"
      />
      <Layout>
        {/* Hero */}
        <section className="section-padding hero-gradient">
          <div className="container-custom">
            <div className="max-w-3xl">
              <span className="trust-badge mb-6 inline-block">
                Our Process
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground">
                A Clear Path to{' '}
                <span className="text-gold-gradient">Investment Success</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                Our streamlined four-step process ensures transparency, thorough due diligence, 
                and ongoing support throughout your investment journey.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
              className="space-y-16"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center">
                        <step.icon className="h-8 w-8 text-primary" />
                      </div>
                      <span className="text-6xl font-heading text-muted/30">
                        {step.number}
                      </span>
                    </div>
                    <h2 className="text-3xl font-heading text-foreground mb-4">
                      {step.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {step.description}
                    </p>
                  </div>
                  <div className={`bg-card rounded-2xl p-8 border border-border shadow-elegant ${
                    index % 2 === 1 ? 'lg:col-start-1' : ''
                  }`}>
                    <h3 className="font-heading text-foreground mb-6">
                      What to Expect
                    </h3>
                    <ul className="space-y-4">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Explore our current investment opportunities or contact our team to discuss 
              how we can help you achieve your investment goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="btn-gold border-0">
                <Link to="/opportunities">
                  View Opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default HowItWorks;
