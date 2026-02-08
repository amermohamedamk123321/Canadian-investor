import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <>
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        noIndex
      />
      <Layout>
        <section className="min-h-[70vh] flex items-center justify-center bg-background">
          <div className="container-custom text-center">
            <div className="max-w-md mx-auto">
              <h1 className="text-8xl font-heading font-bold text-gold-gradient mb-6">
                404
              </h1>
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
                Page Not Found
              </h2>
              <p className="text-muted-foreground mb-8">
                The page you're looking for doesn't exist or has been moved. 
                Let's get you back on track.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="btn-gold border-0">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/opportunities">
                    View Opportunities
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default NotFound;
