import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, FileCheck, Handshake, TrendingUp, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'Browse curated investment opportunities across diverse sectors and Canadian provinces.',
  },
  {
    icon: FileCheck,
    title: 'Due Diligence',
    description: 'Access comprehensive documentation and analysis for each opportunity.',
  },
  {
    icon: Handshake,
    title: 'Connect',
    description: 'Work directly with our team and business partners to structure your investment.',
  },
  {
    icon: TrendingUp,
    title: 'Grow',
    description: 'Monitor your investment performance and receive regular updates.',
  },
];

export const HowItWorksPreview = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="section-padding bg-background" aria-labelledby="how-it-works-heading">
      <div className="container-custom">
        <SectionHeading
          title="How It Works"
          subtitle="Our streamlined process makes investing in Canadian businesses simple and transparent."
          badge="Simple Process"
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
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              
              <div className="bg-card rounded-2xl p-8 border border-border card-hover text-center relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gold-gradient mb-6">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-heading text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="group">
            <Link to="/how-it-works">
              Learn More About Our Process
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
