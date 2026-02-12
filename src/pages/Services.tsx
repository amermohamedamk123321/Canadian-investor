/**
 * Services Page
 * Public-facing page for advisory and coordination services
 */

import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check, FileDown, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageHero, PageCard, PageGrid } from '@/components/pages/PageComponents';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceEntry {
  id: string;
  title: string;
  slug: string;
  description: string;
  details: string;
  audience: string;
  attachments: string;
  display_order: number;
}

interface PageContent {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_description: string;
}

interface SEOMetadata {
  title: string;
  description: string;
}

export default function ServicesPage() {
  // Fetch page content
  const { data: pageData, isLoading: pageLoading } = useQuery({
    queryKey: ['pages', 'services'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/pages/services`);
      if (!response.ok) throw new Error('Failed to fetch page');
      return response.json();
    },
  });

  // Fetch services
  const { data: servicesData, isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/services`);
      if (!response.ok) throw new Error('Failed to fetch services');
      return response.json();
    },
  });

  // Fetch SEO metadata
  const { data: seoData } = useQuery({
    queryKey: ['seo', 'services'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/seo/services`);
      if (!response.ok) return null;
      return response.json();
    },
  });

  const page = pageData?.data as PageContent | undefined;
  const services = servicesData?.data || [];
  const seo = seoData?.data as SEOMetadata | undefined;

  if (pageLoading || servicesLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      </Layout>
    );
  }

  const getAudienceBadgeVariant = (audience: string) => {
    switch (audience) {
      case 'canadian':
        return 'default';
      case 'international':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case 'canadian':
        return 'Canadian Investors';
      case 'international':
        return 'International Investors';
      default:
        return 'All Investors';
    }
  };

  const ourServices = [
    'Investment opportunity sourcing and evaluation',
    'Market insight and investment guidance',
    'Investor profiling and opportunity alignment',
    'Transaction coordination',
    'Coordination with licensed legal professionals',
  ];

  return (
    <Layout>
      <Helmet>
        <title>{seo?.title || 'Services - Alpha Partners'}</title>
        <meta name="description" content={seo?.description || 'Investment Advisory & Professional Coordination Services for Canadian and International Investors'} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Hero Section */}
      <PageHero
        badge="Services"
        title="Investment Advisory & Professional Coordination"
      />

      {/* Intro Section */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl">
          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            Alpha Partners Investment Inc provides focused investment guidance and professional
            coordination for real estate and land investments across Canada.
          </p>
        </div>
      </section>

      {/* Our Services */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <h2 className="text-3xl font-heading mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {ourServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl p-6 border border-border/20 hover:border-accent/50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <p className="text-foreground font-medium">{service}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Canadian Investors */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading mb-4">For Canadian Investors</h2>
            <p className="text-lg text-foreground/80">
              Guidance and coordination for residential, commercial, and land investments across Canada.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-accent/5 border border-accent/20">
            <p className="text-foreground">
              We work with Canadian investors to identify suitable investment opportunities, provide market insight,
              and coordinate with licensed professionals throughout the investment process.
            </p>
          </div>
        </div>
      </section>

      {/* For International Investors */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading mb-4">For International Investors</h2>
            <p className="text-lg text-foreground/80">
              Structured support for commercial real estate and land investments in Canada, in coordination
              with licensed legal and authorized immigration professionals.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-accent/5 border border-accent/20">
            <p className="text-foreground">
              We provide specialized guidance for international investors seeking compliant and well-structured
              entry into the Canadian commercial real estate market.
            </p>
          </div>
        </div>
      </section>

      {/* Our Role */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-heading mb-4">Our Role</h2>
            <p className="text-lg text-foreground/80">
              Alpha Partners Investment Inc acts as an investment advisory and coordination partner,
              supporting a clear, structured, and compliant investment process.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-primary/5 border border-border/20">
            <h4 className="font-heading text-foreground mb-3">Important Notice</h4>
            <p className="text-sm text-muted-foreground">
              Alpha Partners Investment Inc does not provide legal or immigration advice.
              All legal and immigration services are provided by licensed professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Service Entries Grid */}
      {servicesLoading ? (
        <section className="section-padding bg-secondary/50 flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </section>
      ) : services.length > 0 ? (
        <section className="section-padding bg-secondary/50">
          <div className="container-custom">
            <h2 className="text-3xl font-heading mb-12">Service Offerings</h2>
            <PageGrid columns={3}>
              {services.map((service: ServiceEntry) => (
                <PageCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  badge={
                    service.audience
                      ? {
                          label: getAudienceLabel(service.audience),
                          variant: getAudienceBadgeVariant(service.audience) as 'default' | 'secondary' | 'outline',
                        }
                      : undefined
                  }
                  footer={
                    <Button asChild className="w-full btn-gold border-0" size="sm">
                      <Link to="/contact">Learn More</Link>
                    </Button>
                  }
                >
                  {service.details && (
                    <div className="text-sm text-muted-foreground prose prose-sm">
                      <div dangerouslySetInnerHTML={{ __html: service.details }} />
                    </div>
                  )}
                </PageCard>
              ))}
            </PageGrid>
          </div>
        </section>
      ) : null}

      {/* CTA Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact our team to discuss how our services can support your investment goals
          </p>
          <Button asChild size="lg" className="btn-gold border-0">
            <Link to="/contact" className="flex items-center gap-2">
              Book a Consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
