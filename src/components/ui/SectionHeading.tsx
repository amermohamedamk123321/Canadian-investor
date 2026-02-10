import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  children?: ReactNode;
}

export const SectionHeading = ({
  title,
  subtitle,
  badge,
  centered = false,
  children,
}: SectionHeadingProps) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}
    >
      {badge && (
        <span className="trust-badge mb-4 inline-block">
          {badge}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-heading text-foreground heading-underline ${
          centered ? 'heading-underline-center' : ''
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  );
};
