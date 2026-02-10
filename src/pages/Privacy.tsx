import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';

const Privacy = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="Alpha Partners Investment Inc. privacy policy - how we collect, use, and protect your personal information."
        canonical="/privacy"
      />
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-custom max-w-4xl">
            <h1 className="text-4xl font-heading text-foreground mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: February 2025
              </p>

              <h2 className="text-2xl font-heading text-foreground mt-10 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly to us, such as when you fill out 
                a contact form, request information about investment opportunities, or communicate 
                with us. This may include your name, email address, phone number, company name, 
                and any other information you choose to provide.
              </p>

              <h2 className="text-2xl font-heading text-foreground mt-10 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Respond to your inquiries and provide requested information</li>
                <li>Send you updates about investment opportunities (with your consent)</li>
                <li>Connect you with appropriate professional advisors</li>
                <li>Improve our services and website functionality</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-heading text-foreground mt-10 mb-4">
                3. Information Sharing
              </h2>
              <p className="text-muted-foreground mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Professional partners (with your consent) to provide requested services</li>
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
              </ul>

              <h2 className="text-2xl font-heading text-foreground mt-10 mb-4">
                4. Data Security
              </h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or 
                destruction. This includes encryption, secure servers, and access controls.
              </p>

              <h2 className="text-2xl font-heading text-foreground mt-10 mb-4">
                5. Your Rights
              </h2>
              <p className="text-muted-foreground mb-4">
                You have the right to access, correct, or delete your personal information. 
                You may also withdraw consent for marketing communications at any time. To 
                exercise these rights, please contact us at privacy@alphapartners.ca.
              </p>

              <h2 className="text-2xl font-heading text-foreground mt-10 mb-4">
                6. Cookies
              </h2>
              <p className="text-muted-foreground mb-4">
                We use essential cookies to ensure our website functions properly. We may also 
                use analytics cookies to understand how visitors interact with our website. You 
                can control cookie preferences through your browser settings.
              </p>

              <h2 className="text-2xl font-heading text-foreground mt-10 mb-4">
                7. Contact Us
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about this privacy policy or our data practices, please 
                contact us at:
              </p>
              <p className="text-muted-foreground">
                Alpha Partners Investment Inc.<br />
                Toronto, Ontario, Canada<br />
                Email: privacy@alphapartners.ca
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Privacy;
