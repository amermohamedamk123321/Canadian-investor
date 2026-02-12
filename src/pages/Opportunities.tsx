import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, TrendingUp, ArrowRight, Building2, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { opportunities, sectors, provinces } from '@/data/opportunities';

const Opportunities = () => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      if (selectedSector && opp.sector !== selectedSector) return false;
      if (selectedProvince && opp.province !== selectedProvince) return false;
      return true;
    });
  }, [selectedSector, selectedProvince]);

  const clearFilters = () => {
    setSelectedSector(null);
    setSelectedProvince(null);
  };

  const hasActiveFilters = selectedSector || selectedProvince;

  return (
    <>
      <SEOHead
        title="Investment Opportunities"
        description="Explore vetted investment opportunities across Canada. Filter by sector, province, and investment size to find opportunities that match your investment criteria."
        canonical="/opportunities"
      />
      <Layout>
        {/* Hero */}
        <section className="section-padding hero-gradient">
          <div className="container-custom">
            <div className="max-w-3xl">
              <span className="trust-badge mb-6 inline-block">
                Investment Opportunities
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground">
                Curated Opportunities Across{' '}
                <span className="text-gold-gradient">Canada</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                Each opportunity has been carefully vetted by our team. Filter by sector 
                and province to find investments that align with your goals.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-background border-b border-border sticky top-20 z-40">
          <div className="container-custom">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              {/* Sector Filter */}
              <div className="flex flex-wrap gap-2">
                {sectors.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => setSelectedSector(selectedSector === sector ? null : sector)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedSector === sector
                        ? 'bg-accent text-primary'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>

              <div className="hidden sm:block w-px h-6 bg-border" />

              {/* Province Filter */}
              <div className="flex flex-wrap gap-2">
                {provinces.map((province) => (
                  <button
                    key={province}
                    onClick={() => setSelectedProvince(selectedProvince === province ? null : province)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedProvince === province
                        ? 'bg-accent text-primary'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {province}
                  </button>
                ))}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-destructive hover:text-destructive/80"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Opportunities Grid */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredOpportunities.length}</span>{' '}
                {filteredOpportunities.length === 1 ? 'opportunity' : 'opportunities'}
              </p>
            </div>

            {filteredOpportunities.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">
                  No opportunities match your current filters.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredOpportunities.map((opportunity) => (
                  <motion.article
                    key={opportunity.slug}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="bg-card rounded-2xl overflow-hidden border border-border card-hover group"
                  >
                    {/* Image */}
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <div className="absolute inset-0 hero-gradient opacity-80 flex items-center justify-center">
                        <Building2 className="h-16 w-16 text-accent/50" />
                      </div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent text-primary">
                          {opportunity.sector}
                        </span>
                        {opportunity.status === 'closing-soon' && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-destructive text-destructive-foreground">
                            Closing Soon
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-heading text-foreground mb-2 group-hover:text-accent transition-colors">
                        {opportunity.title}
                      </h2>
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

                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {opportunity.expectedReturns}
                        </span>
                        <Link
                          to={`/opportunities/${opportunity.slug}`}
                          className="inline-flex items-center text-accent font-medium text-sm hover:underline"
                        >
                          View Details
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-background">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-heading text-foreground mb-4">
              Don't See What You're Looking For?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              We regularly source new opportunities. Contact us to discuss your specific 
              investment criteria and we'll notify you when matching opportunities become available.
            </p>
            <Button asChild size="lg" className="btn-gold border-0">
              <Link to="/contact">
                Contact Our Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Opportunities;
