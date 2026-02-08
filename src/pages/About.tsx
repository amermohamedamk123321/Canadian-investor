import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Target, Users, Globe, Award, Heart } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We maintain the highest standards of transparency and ethical conduct in all our dealings.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We pursue exceptional outcomes through rigorous analysis and strategic execution.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'We build lasting relationships based on trust, communication, and mutual success.',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'We connect international investors with Canadian opportunities through cultural understanding.',
  },
  {
    icon: Award,
    title: 'Results-Driven',
    description: 'We focus on delivering measurable returns and tangible value for our investors.',
  },
  {
    icon: Heart,
    title: 'Community Impact',
    description: 'We support investments that create jobs and strengthen Canadian communities.',
  },
];

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <>
      <SEOHead
        title="About Us"
        description="Learn about Alpha Partners Investment Inc., our mission, values, and commitment to connecting global investors with strategic Canadian opportunities."
        canonical="/about"
      />
      <Layout>
        {/* Hero Section */}
        <section className="section-padding hero-gradient">
          <div className="container-custom">
            <div className="max-w-3xl">
              <span className="trust-badge mb-6 inline-block bg-accent/20 text-accent">
                About Alpha Partners
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground">
                Building Bridges Between Vision and{' '}
                <span className="text-gold-gradient">Opportunity</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                Since our founding, Alpha Partners has been dedicated to connecting visionary 
                entrepreneurs and international investors with strategic opportunities across Canada.
              </p>
            </div>
          </div>
        </section>

        {/* Company Profile */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeading
                  title="Our Story"
                  subtitle="Alpha Partners Investment Inc. was established with a clear mission: to facilitate meaningful connections between international capital and Canadian business opportunities."
                  badge="Who We Are"
                />
                <div className="mt-8 space-y-4 text-muted-foreground">
                  <p>
                    Our team brings together decades of experience in investment banking, business 
                    development, and cross-border transactions. We understand both the opportunities 
                    and complexities of investing in Canada's diverse economy.
                  </p>
                  <p>
                    We take a hands-on approach, working closely with investors throughout the entire 
                    process—from initial opportunity identification through due diligence, transaction 
                    structuring, and ongoing portfolio monitoring.
                  </p>
                  <p>
                    Our network spans every Canadian province, with particular expertise in Ontario, 
                    British Columbia, Alberta, and Quebec. We partner with leading professionals in 
                    legal, accounting, immigration, and real estate to provide comprehensive support.
                  </p>
                </div>
              </div>
              <div className="bg-card rounded-2xl p-8 border border-border shadow-elegant">
                <h3 className="font-heading text-2xl font-semibold mb-6">Key Facts</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">14+</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Years of Experience</h4>
                      <p className="text-sm text-muted-foreground">Serving investors since 2010</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">10</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Provinces Covered</h4>
                      <p className="text-sm text-muted-foreground">Coast-to-coast network</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">50+</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Partner Network</h4>
                      <p className="text-sm text-muted-foreground">Vetted professional advisors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <SectionHeading
              title="Our Values"
              subtitle="These principles guide every decision we make and every relationship we build."
              badge="What We Stand For"
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
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="bg-card rounded-2xl p-8 border border-border card-hover text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl gold-gradient mb-6">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-12 bg-background">
          <div className="container-custom">
            <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8">
              <h3 className="font-heading font-semibold text-foreground mb-4">Important Disclaimer</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Alpha Partners Investment Inc. does not provide immigration, legal, or visa advice. 
                We are not immigration consultants, lawyers, or licensed to provide legal advice. 
                We connect investors with opportunities and facilitate introductions to licensed 
                professionals who can provide specialized advice. All investment decisions should 
                be made with appropriate professional advisors. Past performance does not guarantee 
                future results. Investments involve risk including potential loss of principal.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
