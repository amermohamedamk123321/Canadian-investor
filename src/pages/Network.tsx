import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { partners } from '@/data/partners';

const Network = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <>
      <SEOHead
        title="Our Professional Network"
        description="Alpha Partners maintains a vetted network of professional partners including lawyers, accountants, immigration consultants, and business advisors across Canada."
        canonical="/network"
      />
      <Layout>
        {/* Hero */}
        <section className="section-padding hero-gradient">
          <div className="container-custom">
            <div className="max-w-3xl">
              <span className="trust-badge mb-6 inline-block bg-accent/20 text-accent">
                Professional Network
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground">
                Trusted Partners for Your{' '}
                <span className="text-gold-gradient">Investment Journey</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                Our network of vetted professionals provides comprehensive support across 
                legal, financial, immigration, and business services.
              </p>
            </div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <SectionHeading
              title="Our Professional Partners"
              subtitle="We've carefully selected partners who share our commitment to excellence and client success."
              badge="Trusted Advisors"
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
              className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {partners.map((partner) => (
                <motion.article
                  key={partner.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="bg-card rounded-2xl p-8 border border-border card-hover"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center">
                      <Briefcase className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-foreground">
                        {partner.name}
                      </h3>
                      <p className="text-sm text-accent">{partner.type}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">
                    {partner.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {partner.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Join Network CTA */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="bg-card rounded-2xl p-12 border border-border shadow-elegant text-center">
              <h2 className="text-3xl font-heading text-foreground mb-4">
                Become a Network Partner
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Are you a professional advisor interested in joining our network? 
                We're always looking for qualified partners who share our commitment 
                to exceptional client service.
              </p>
              <Button asChild size="lg" className="btn-gold border-0">
                <Link to="/contact">
                  Contact Us to Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Network;
