import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const processSteps = [
  { number: 1, title: 'Initial consultation', description: 'Understand your investment objectives and criteria' },
  { number: 2, title: 'Understanding your investment goals', description: 'Define your investment strategy and timeline' },
  { number: 3, title: 'Identifying suitable opportunities', description: 'Find the right properties that match your goals' },
  { number: 4, title: 'Coordinating with licensed professionals', description: 'Work with legal and real estate experts' },
  { number: 5, title: 'Secure closing and continued support', description: 'Complete the transaction with full support' },
];

export const InvestmentProcessSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="section-padding bg-secondary/50" aria-labelledby="process-heading">
      <div className="container-custom">
        <SectionHeading
          title="Our Investment Process"
          subtitle="A structured and transparent approach to guide you through every step"
          badge="How It Works"
          centered
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {processSteps.map((step) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="relative group"
            >
              {/* Connector line for desktop */}
              {step.number < processSteps.length && (
                <div className="hidden lg:block absolute -right-3 top-1/3 w-6 h-0.5 bg-gradient-to-r from-accent/50 to-transparent" />
              )}

              <div className="bg-background rounded-xl p-6 border border-border/20 hover:border-accent/50 transition-all duration-300 h-full group-hover:shadow-lg">
                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                    {step.number}
                  </div>
                </div>

                {/* Step title */}
                <h3 className="text-lg font-heading mb-2 text-foreground">
                  {step.title}
                </h3>

                {/* Step description */}
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
