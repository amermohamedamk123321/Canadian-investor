import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5 },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
      
      {/* Gold Accent Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 right-0 h-1 gold-gradient origin-left"
      />

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Trust Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-accent/20 text-accent mb-8">
              <Shield className="h-4 w-4" />
              Trusted Investment Partner Since 2010
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground leading-tight"
          >
            Strategic Investments.{' '}
            <span className="text-gold-gradient">
              Exceptional Returns.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed"
          >
            Alpha Partners connects visionary entrepreneurs with strategic investment 
            opportunities across Canada, fostering growth and creating lasting value.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="btn-gold border-0 text-base">
              <Link to="/opportunities">
                Explore Investment Opportunities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground text-base"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg"
          >
            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-foreground">$50M+</div>
              <div className="text-sm text-primary-foreground/60">Invested</div>
            </div>
            <div className="text-center">
              <Globe className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-foreground">10+</div>
              <div className="text-sm text-primary-foreground/60">Provinces</div>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-foreground">100%</div>
              <div className="text-sm text-primary-foreground/60">Compliant</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 opacity-10 hidden lg:block">
        <div className="w-full h-full gold-gradient rounded-l-full" />
      </div>
    </section>
  );
};
