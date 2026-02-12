import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const whatWeDo = [
  'Commercial real estate and land investment guidance',
  'Residential real estate investment guidance for Canadian investors',
  'Identification of quality investment opportunities',
  'Market review and investment insight',
  'Coordination with licensed legal professionals',
  'Support for international investors through authorized immigration partners',
];

export const WhoWeAreSection = () => {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="section-padding bg-background" aria-labelledby="who-we-are-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <SectionHeading
              title="Who We Are"
              subtitle="About Alpha Partners Investment Inc"
              badge="About Us"
              centered={false}
            />
            
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Alpha Partners Investment Inc is a Canada based investment advisory team focused on 
              commercial real estate and land investments.
            </p>

            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              We work with Canadian and international investors by providing clear guidance, market 
              insight, and a well-structured investment approach.
            </p>
          </motion.div>

          {/* Right - What We Do */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-4"
          >
            <h3 id="who-we-are-heading" className="text-2xl font-heading mb-6">
              What We Do
            </h3>
            {whatWeDo.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-accent" />
                </div>
                <p className="text-muted-foreground leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
