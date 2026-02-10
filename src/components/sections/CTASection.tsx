import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CTASection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="section-padding hero-gradient relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full gold-gradient blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full gold-gradient blur-3xl" />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="container-custom relative z-10 text-center"
      >
        <span className="trust-badge mb-6 inline-block bg-accent/20 text-accent">
          Start Your Investment Journey
        </span>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-primary-foreground max-w-3xl mx-auto">
          Ready to Explore Strategic Investment Opportunities?
        </h2>
        
        <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
          Connect with our team to discuss how Alpha Partners can help you achieve 
          your investment goals in Canada's growing markets.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="btn-gold border-0 text-base">
            <Link to="/opportunities">
              View Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground text-base"
          >
            <Link to="/contact">
              <Phone className="mr-2 h-5 w-5" />
              Schedule a Call
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};
