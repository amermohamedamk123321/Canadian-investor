import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, FileCheck, Users, Building2, Plane, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: Globe,
    title: 'Market Access',
    description: 'Direct access to one of the world\'s most stable and diverse economies with strong trade connections.',
  },
  {
    icon: FileCheck,
    title: 'Transparent Process',
    description: 'Clear regulatory frameworks and established legal protections for international investors.',
  },
  {
    icon: Users,
    title: 'Local Expertise',
    description: 'Connect with our network of professionals who understand cross-border investment nuances.',
  },
  {
    icon: Building2,
    title: 'Diverse Sectors',
    description: 'Opportunities across technology, resources, real estate, healthcare, and more.',
  },
];

const considerations = [
  'Currency exchange and hedging strategies',
  'Canadian tax implications for non-residents',
  'Provincial vs. federal regulatory requirements',
  'Due diligence documentation in English/French',
  'Time zone coordination for communications',
  'Wire transfer and banking requirements',
];

const InternationalInvestors = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <>
      <SEOHead
        title="For International Investors"
        description="Alpha Partners helps international investors navigate Canadian investment opportunities with local expertise, professional networks, and transparent processes."
        canonical="/international-investors"
      />
      <Layout>
        {/* Hero */}
        <section className="section-padding hero-gradient">
          <div className="container-custom">
            <div className="max-w-3xl">
              <span className="trust-badge mb-6 inline-block bg-accent/20 text-accent">
                <Plane className="h-4 w-4 mr-2" />
                International Investors
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground">
                Your Gateway to{' '}
                <span className="text-gold-gradient">Canadian Investment</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                Whether you're investing from Asia, Europe, the Middle East, or elsewhere, 
                Alpha Partners provides the local expertise and professional network you need 
                to succeed in the Canadian market.
              </p>
            </div>
          </div>
        </section>

        {/* Why Canada */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <SectionHeading
              title="Why Invest in Canada?"
              subtitle="Canada offers a unique combination of stability, growth potential, and quality of life that attracts investors from around the world."
              badge="Market Opportunity"
              centered
            />

            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="bg-card rounded-2xl p-8 border border-border card-hover text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl gold-gradient mb-6">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How We Help */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeading
                  title="How We Support International Investors"
                  subtitle="Our team bridges the gap between international capital and Canadian opportunities with comprehensive support services."
                  badge="Our Services"
                />
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                    <CheckCircle className="h-6 w-6 text-teal flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Opportunity Sourcing</h4>
                      <p className="text-sm text-muted-foreground">Curated investments matching your criteria and risk profile</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                    <CheckCircle className="h-6 w-6 text-teal flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Professional Network</h4>
                      <p className="text-sm text-muted-foreground">Connections to vetted legal, tax, and immigration advisors</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                    <CheckCircle className="h-6 w-6 text-teal flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Due Diligence Support</h4>
                      <p className="text-sm text-muted-foreground">On-the-ground research and verification services</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                    <CheckCircle className="h-6 w-6 text-teal flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Ongoing Reporting</h4>
                      <p className="text-sm text-muted-foreground">Regular updates on portfolio performance and market conditions</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border shadow-elegant">
                <h3 className="font-heading text-xl text-foreground mb-6">
                  Key Considerations for International Investors
                </h3>
                <ul className="space-y-4">
                  {considerations.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-12 bg-background">
          <div className="container-custom">
            <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8">
              <h3 className="font-heading text-foreground mb-4">Important Notice</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Alpha Partners Investment Inc. does not provide immigration, legal, or visa advice. 
                We are not immigration consultants, lawyers, or licensed to provide such services. 
                For immigration matters, we connect investors with licensed immigration consultants 
                and lawyers who specialize in investor and business immigration pathways. Always 
                seek independent professional advice before making investment or immigration decisions.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding hero-gradient">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-heading text-primary-foreground mb-6">
              Ready to Explore Canadian Opportunities?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Schedule a consultation to discuss your investment goals and how we can 
              help you navigate the Canadian market.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="btn-gold border-0">
                <Link to="/contact">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/opportunities">View Opportunities</Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default InternationalInvestors;
