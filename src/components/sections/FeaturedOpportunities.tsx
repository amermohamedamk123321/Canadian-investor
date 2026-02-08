import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, TrendingUp, ArrowRight, Building2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { opportunities } from '@/data/opportunities';

export const FeaturedOpportunities = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const featuredOpportunities = opportunities.slice(0, 3);

  return (
    <section className="section-padding bg-secondary" aria-labelledby="opportunities-heading">
      <div className="container-custom">
        <SectionHeading
          title="Featured Investment Opportunities"
          subtitle="Explore our curated selection of vetted investment opportunities across Canada's most promising sectors."
          badge="Current Openings"
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
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredOpportunities.map((opportunity) => (
            <motion.article
              key={opportunity.slug}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-card rounded-2xl overflow-hidden border border-border card-hover group"
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-muted relative overflow-hidden">
                <div className="absolute inset-0 hero-gradient opacity-80 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-accent/50" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent text-primary">
                    {opportunity.sector}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {opportunity.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {opportunity.shortDescription}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {opportunity.province}
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {opportunity.investmentRange}
                  </span>
                </div>

                <Link
                  to={`/opportunities/${opportunity.slug}`}
                  className="inline-flex items-center text-accent font-medium text-sm hover:underline"
                >
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="btn-gold border-0">
            <Link to="/opportunities">
              View All Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
