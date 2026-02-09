/**
 * Canadian Investors Page
 * Public-facing page for Canadian investment opportunities
 */

import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Layout } from '../components/layout/Layout';
import { Hero } from '../components/sections/Hero';
import { CTASection } from '../components/sections/CTASection';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Loader2 } from 'lucide-react';

interface CanadianInvestorEntry {
  id: string;
  title: string;
  slug: string;
  description: string;
  asset_types: string;
  attachments: string;
  display_order: number;
}

export default function InvestorsCanadianPage() {
  // Fetch page content
  const { data: pageData, isLoading: pageLoading } = useQuery({
    queryKey: ['pages', 'canadian-investors'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/pages/canadian-investors`);
      if (!response.ok) throw new Error('Failed to fetch page');
      return response.json();
    },
  });

  // Fetch Canadian investor entries
  const { data: entriesData, isLoading: entriesLoading } = useQuery({
    queryKey: ['canadian-investors'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/canadian-investors`);
      if (!response.ok) throw new Error('Failed to fetch entries');
      return response.json();
    },
  });

  // Fetch SEO metadata
  const { data: seoData } = useQuery({
    queryKey: ['seo', 'canadian-investors'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/seo/canadian-investors`);
      if (!response.ok) return null;
      return response.json();
    },
  });

  const page = pageData?.data;
  const entries = entriesData?.data || [];
  const seo = seoData?.data;

  if (pageLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{seo?.title || page?.title || 'Canadian Investors'}</title>
        <meta name="description" content={seo?.description || page?.meta_description} />
        {seo?.og_title && <meta property="og:title" content={seo.og_title} />}
        {seo?.og_description && <meta property="og:description" content={seo.og_description} />}
      </Helmet>

      {/* Hero Section */}
      <Hero
        title={page?.title || 'Investment Opportunities for Canadian Investors'}
        subtitle={page?.content ? 'Explore carefully curated opportunities' : 'Find your next investment opportunity'}
        cta={{
          label: 'Book a Consultation',
          href: '/contact',
        }}
      />

      {/* Main Content */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        {page?.content && (
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        )}

        {/* Entries Grid */}
        {entriesLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="animate-spin" />
          </div>
        ) : entries.length > 0 ? (
          <div>
            <h2 className="text-3xl font-heading font-bold mb-8">Investment Opportunities by Province</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map((entry: CanadianInvestorEntry) => (
                <Card key={entry.id} className="p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-bold mb-2">{entry.title}</h3>
                  <p className="text-muted-foreground mb-4">{entry.description}</p>

                  {entry.asset_types && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Asset Types:</p>
                      <div className="flex flex-wrap gap-2">
                        {JSON.parse(entry.asset_types).map((type: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button className="w-full">Learn More</Button>
                </Card>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Invest?"
        description="Contact our team to discuss opportunities tailored to your investment goals."
        ctaLabel="Get Started"
        ctaHref="/contact"
      />
    </Layout>
  );
}
