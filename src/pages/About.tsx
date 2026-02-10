import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Loader2 } from 'lucide-react';

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

const About = () => {
  // Fetch page content
  const { data: pageData, isLoading: pageLoading } = useQuery({
    queryKey: ['pages', 'about'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/pages/about`);
      if (!response.ok) throw new Error('Failed to fetch page');
      return response.json();
    },
  });

  // Fetch SEO metadata
  const { data: seoData } = useQuery({
    queryKey: ['seo', 'about'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/seo/about`);
      if (!response.ok) return null;
      return response.json();
    },
  });

  const page = pageData?.data as PageContent | undefined;
  const seo = seoData?.data as SEOMetadata | undefined;

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
        <title>{seo?.title || page?.title || 'About Us'}</title>
        <meta name="description" content={seo?.description || page?.meta_description} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="trust-badge mb-6 inline-block bg-accent/20 text-accent">
              About Alpha Partners
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground">
              {page?.title || 'About Alpha Partners'}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="prose prose-lg max-w-none">
            {page?.content && (
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            )}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8">
            <h3 className="font-heading font-semibold text-foreground mb-4">Important Disclaimer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Alpha Partners Investment Inc. does not provide immigration, legal, or visa advice.
              We are not immigration consultants, lawyers, or licensed to provide legal advice.
              We connect investors with opportunities and facilitate introductions to licensed
              professionals who can provide specialized advice. All investment decisions should
              be made with appropriate professional advisors. Past performance does not guarantee
              future results. Investments involve risk including potential loss of principal.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
