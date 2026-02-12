import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const regions = [
  'Ontario',
  'British Columbia',
  'Alberta',
  'Quebec',
  'Other major Canadian regions'
];

export const WhereWeOperateSection = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="section-padding bg-background" aria-labelledby="operate-heading">
      <div className="container-custom">
        <SectionHeading
          title="Where We Operate"
          subtitle="We serve Canadian and international investors across key markets and strategic regions"
          badge="Coverage"
          centered
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          {regions.map((region, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center gap-3 px-6 py-4 bg-secondary rounded-xl border border-border/20 hover:border-accent/50 hover:bg-secondary/80 transition-all duration-300 group"
            >
              <MapPin className="h-5 w-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-medium text-foreground">{region}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
