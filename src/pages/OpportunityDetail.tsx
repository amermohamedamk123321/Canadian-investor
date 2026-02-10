import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, TrendingUp, Clock, DollarSign, FileText, CheckCircle, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { opportunities } from '@/data/opportunities';

const OpportunityDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const opportunity = opportunities.find((o) => o.slug === slug);

  if (!opportunity) {
    return (
      <Layout>
        <div className="section-padding container-custom text-center">
          <h1 className="text-3xl font-heading mb-4">Opportunity Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The opportunity you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/opportunities">View All Opportunities</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <SEOHead
        title={opportunity.title}
        description={opportunity.shortDescription}
        canonical={`/opportunities/${opportunity.slug}`}
      />
      <Layout>
        {/* Hero */}
        <section className="section-padding hero-gradient">
          <div className="container-custom">
            <Link
              to="/opportunities"
              className="inline-flex items-center text-primary-foreground/70 hover:text-accent mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Opportunities
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex gap-3 mb-6">
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-accent text-primary">
                    {opportunity.sector}
                  </span>
                  {opportunity.status === 'closing-soon' && (
                    <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-destructive text-destructive-foreground">
                      Closing Soon
                    </span>
                  )}
                  {opportunity.status === 'open' && (
                    <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-teal text-teal-foreground">
                      Open
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-primary-foreground mb-6">
                  {opportunity.title}
                </h1>

                <p className="text-lg text-primary-foreground/80 leading-relaxed">
                  {opportunity.shortDescription}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-2xl p-8 shadow-elegant"
              >
                <h3 className="font-heading text-xl text-foreground mb-6">
                  Investment Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                    <MapPin className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold text-foreground">{opportunity.province}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                    <DollarSign className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Investment Range</p>
                      <p className="font-semibold text-foreground">{opportunity.investmentRange}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Returns</p>
                      <p className="font-semibold text-foreground">{opportunity.expectedReturns}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                    <Clock className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Investment Timeline</p>
                      <p className="font-semibold text-foreground">{opportunity.timeline}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Button asChild className="w-full btn-gold border-0">
                    <Link to="/contact">Request More Information</Link>
                  </Button>
                  {opportunity.pdfUrl && (
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-heading text-foreground mb-6">
                  About This Opportunity
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {opportunity.fullDescription}
                </p>

                <h3 className="text-xl font-heading text-foreground mb-4">
                  Investment Highlights
                </h3>
                <ul className="space-y-3">
                  {opportunity.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="bg-secondary rounded-2xl p-8">
                  <div className="aspect-square bg-muted rounded-xl flex items-center justify-center mb-6">
                    <Building2 className="h-24 w-24 text-muted-foreground/30" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Detailed documentation and photos available upon request
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-heading text-foreground mb-4">
              Interested in This Opportunity?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Contact our team to schedule a consultation and receive the full information package.
            </p>
            <Button asChild size="lg" className="btn-gold border-0">
              <Link to="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default OpportunityDetail;
