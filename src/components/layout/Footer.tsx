import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Our Network', href: '/network' },
    { name: 'Contact', href: '/contact' },
  ],
  investors: [
    { name: 'Investment Opportunities', href: '/opportunities' },
    { name: 'International Investors', href: '/international-investors' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Sitemap', href: '/sitemap.xml' },
  ],
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
                <span className="font-heading text-primary text-lg">A</span>
              </div>
              <div>
                <span className="font-heading text-lg text-primary-foreground">
                  Alpha Partners
                </span>
                <span className="block text-xs text-primary-foreground/70 -mt-0.5">
                  Investment Inc.
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 text-sm mb-6 leading-relaxed">
              Connecting visionary entrepreneurs with strategic investment opportunities across Canada.
            </p>
            <div className="space-y-3">
              <a 
                href="mailto:info@alphapartners.ca" 
                className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4 text-accent" />
                info@alphapartners.ca
              </a>
              <a 
                href="tel:+1-XXX-XXX-XXXX" 
                className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4 text-accent" />
                +1 (XXX) XXX-XXXX
              </a>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
                <span>Toronto, Ontario, Canada</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Investors Links */}
          <div>
            <h3 className="font-heading text-lg mb-6">For Investors</h3>
            <ul className="space-y-3">
              {footerLinks.investors.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-heading text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-4 mt-6">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-accent hover:text-primary transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-accent hover:text-primary transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className="bg-primary-foreground/5 rounded-lg p-4 mb-6">
            <p className="text-xs text-primary-foreground/70 leading-relaxed">
              <strong className="text-accent">Legal Disclaimer:</strong> Alpha Partners Investment Inc. 
              does not provide immigration, legal, or visa advice. We are not immigration consultants, 
              lawyers, or licensed to provide legal advice. All investment decisions should be made 
              with appropriate professional advisors. Past performance does not guarantee future results.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© {currentYear} Alpha Partners Investment Inc. All rights reserved.</p>
            <p>Built with trust and transparency in Canada.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
