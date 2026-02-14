import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Shield, Lock, CheckCircle, Loader2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';

const trustPoints = [
  {
    icon: Lock,
    title: 'Data Protection',
    description: 'Your investment data is encrypted and protected with enterprise-grade security standards.',
  },
  {
    icon: Shield,
    title: 'Compliance',
    description: 'We adhere to all Canadian financial regulations and international security standards.',
  },
  {
    icon: CheckCircle,
    title: 'Regular Audits',
    description: 'Independent security audits ensure our systems remain secure and up-to-date.',
  },
];

interface FileAsset {
  id: string;
  url: string;
  name: string;
  uploaded_at: string;
}

export const SecuritySection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Fetch security PDF from admin
  const { data: securityPDF } = useQuery({
    queryKey: ['security-pdf'],
    queryFn: async () => {
      const response = await fetch('/api/admin/files?limit=1');
      if (!response.ok) return null;
      const data = await response.json();
      return data.data?.[0] as FileAsset | undefined;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleDownloadPDF = () => {
    if (!securityPDF?.url) return;
    const link = document.createElement('a');
    link.href = securityPDF.url;
    link.download = securityPDF.name || 'Security-Compliance-Guidelines.pdf';
    link.click();
  };

  return (
    <section className="section-padding bg-background" aria-labelledby="security-heading">
      <div className="container-custom">
        <SectionHeading
          title="Security & Compliance"
          subtitle="We prioritize your security and compliance. Learn more about our standards and practices."
          badge="Trust & Safety"
          centered
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16"
        >
          {/* Trust Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {trustPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card rounded-2xl p-8 border border-border shadow-elegant hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl text-foreground mb-3">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* PDF Download CTA */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 md:p-12 border border-accent/20 text-center"
          >
            <h3 className="font-heading text-2xl text-foreground mb-3">
              Security & Compliance Guidelines
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              For detailed information about our security protocols, compliance certifications, and data protection measures,
              download our comprehensive Security & Compliance Guidelines document.
            </p>
            <Button
              onClick={handleDownloadPDF}
              className="btn-gold border-0"
              disabled={!securityPDF}
            >
              {!securityPDF ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  Download Guidelines (PDF)
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
