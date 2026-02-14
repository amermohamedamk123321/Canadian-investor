import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const processSteps = [
  { number: 1, title: 'Initial consultation', description: 'Understand your investment objectives and criteria', borderColor: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.5)' },
  { number: 2, title: 'Understanding your investment goals', description: 'Define your investment strategy and timeline', borderColor: '#10b981', shadowColor: 'rgba(16, 185, 129, 0.5)' },
  { number: 3, title: 'Identifying suitable opportunities', description: 'Find the right properties that match your goals', borderColor: '#f59e0b', shadowColor: 'rgba(245, 158, 11, 0.5)' },
  { number: 4, title: 'Coordinating with licensed professionals', description: 'Work with legal and real estate experts', borderColor: '#a855f7', shadowColor: 'rgba(168, 85, 247, 0.5)' },
  { number: 5, title: 'Secure closing and continued support', description: 'Complete the transaction with full support', borderColor: '#f43f5e', shadowColor: 'rgba(244, 63, 94, 0.5)' },
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

              <div
                className="relative bg-background rounded-xl p-6 border-2 transition-all duration-300 h-full overflow-hidden"
                style={{
                  borderColor: step.borderColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 30px ${step.shadowColor}, 0 0 60px ${step.shadowColor.replace('0.5)', '0.25)')}`;
                  e.currentTarget.style.borderColor = step.borderColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Glow overlay background */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${step.shadowColor}, transparent 70%)`,
                  }}
                />

                {/* Content wrapper */}
                <div className="relative z-10">
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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
