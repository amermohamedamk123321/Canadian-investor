/**
 * Services Page
 * Public-facing page for advisory and coordination services
 */

import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, FileDown } from 'lucide-react';

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

  return (
    <Layout>
      <Helmet>
        <title>{seo?.title || page?.title || 'Our Services'}</title>
        <meta name="description" content={seo?.description || page?.meta_description} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="trust-badge mb-6 inline-block bg-accent/20 text-accent">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground">
              {page?.title || 'Advisory & Coordination Services'}
            </h1>
          </div>
        </div>
      </section>

      {/* Page Content */}
      {page?.content && (
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>
          </div>
        </section>
      )}

      {/* Services Grid */}
      {services.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="mb-12">
              <h2 className="text-3xl font-heading font-bold mb-4">Our Service Offerings</h2>
              <p className="text-muted-foreground max-w-2xl">
                We provide comprehensive support throughout your investment journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service: ServiceEntry) => (
                <Card
                  key={service.id}
                  className="p-8 hover:shadow-lg transition flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold flex-1">{service.title}</h3>
                    <Badge variant={getAudienceBadgeVariant(service.audience)}>
                      {getAudienceLabel(service.audience)}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-4 flex-grow">
                    {service.description}
                  </p>

                  {service.details && (
                    <div className="mb-6 text-sm">
                      <div dangerouslySetInnerHTML={{ __html: service.details }} />
                    </div>
                  )}

                  {service.attachments && JSON.parse(service.attachments).length > 0 && (
                    <div className="border-t pt-4 mt-auto">
                      <p className="text-sm font-medium mb-2">Resources:</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <FileDown size={16} className="mr-2" />
                        Download Resources
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact our team to discuss how our services can support your investment goals
          </p>
          <Button size="lg">
            Book a Consultation
          </Button>
        </div>
      </section>
    </Layout>
  );
}
