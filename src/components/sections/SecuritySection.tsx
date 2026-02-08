import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Check } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const warnings = [
  'Unscanned file uploads',
  'No HTTPS',
  'Weak rate limiting',
  'Large/unoptimized images',
  'Missing CSP headers',
  'Storing docs indefinitely',
  'Weak backups',
];

const remedies = [
  'Server-side virus scanning (ClamAV)',
  'Always HTTPS',
  'Rate-limiting + CAPTCHA',
  'Image optimization & srcset',
  'CSP headers configured',
  'Retention policy + secure storage',
  'Automated backups + rollback',
];

export const SecuritySection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="section-padding bg-background" aria-labelledby="security-heading">
      <div className="container-custom">
        <SectionHeading
          title="Security First Approach"
          subtitle="We take security seriously. Here's what we protect against and the measures we implement."
          badge="Enterprise Security"
          centered
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Warnings Column */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-elegant">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="h-5 w-5 text-destructive" />
              </span>
              Security Risks We Mitigate
            </h3>
            <div className="space-y-4">
              {warnings.map((warning, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="warning-item"
                >
                  <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-foreground">{warning}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Remedies Column */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-elegant">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'hsl(168 76% 36% / 0.1)' }}>
                <Check className="h-5 w-5 text-teal" />
              </span>
              Our Security Measures
            </h3>
            <div className="space-y-4">
              {remedies.map((remedy, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="remedy-item"
                >
                  <Check className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-foreground">{remedy}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
