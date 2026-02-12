import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Info, Zap, Briefcase, Globe, Users, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
  { name: 'How It Works', href: '/how-it-works', icon: Zap },
  { name: 'Opportunities', href: '/opportunities', icon: Briefcase },
  { name: 'International', href: '/international-investors', icon: Globe },
  { name: 'Network', href: '/network', icon: Users },
  { name: 'Contact', href: '/contact', icon: Mail },
];

// Circular icon button component
const CircleNavButton = ({ item, isActive, onHover, isHovered }: any) => {
  const Icon = item.icon;

  if (item.href === '#') {
    return (
      <div
        className="relative group"
        onMouseEnter={() => onHover(item.name)}
        onMouseLeave={() => onHover(null)}
      >
        <motion.button
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isActive
              ? 'bg-accent text-primary shadow-lg'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={item.name}
        >
          <Icon className="w-5 h-5" />
        </motion.button>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max bg-accent text-primary px-3 py-1.5 rounded-full text-xs font-medium pointer-events-none whitespace-nowrap"
            >
              {item.name}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      to={item.href}
      className="relative group outline-none"
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={() => onHover(null)}
      aria-label={item.name}
      aria-current={isActive ? 'page' : undefined}
    >
      <motion.div
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
          isActive
            ? 'bg-accent text-primary shadow-lg'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon className="w-5 h-5" />
      </motion.div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max bg-accent text-primary px-3 py-1.5 rounded-full text-xs font-medium pointer-events-none whitespace-nowrap"
          >
            {item.name}
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    if (href === '#') return false;
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-xl border-b border-border/30 shadow-lg" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)' }}>
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            aria-label="Alpha Partners Investment Inc. - Home"
          >
            <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
              <span className="font-heading text-primary text-lg">A</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-heading text-lg text-foreground">
                Alpha Partners
              </span>
              <span className="block text-xs text-muted-foreground -mt-0.5">
                Investment Inc.
              </span>
            </div>
          </Link>

          {/* Desktop Circular Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {navigation.map((item) => (
              <CircleNavButton
                key={item.name}
                item={item}
                isActive={isActive(item.href)}
                onHover={setHoveredNav}
                isHovered={hoveredNav === item.name}
              />
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button asChild className="btn-gold border-0">
              <Link to="/contact" className="flex items-center gap-2">
                Book a Consultation
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin/login" className="flex items-center gap-2">
                <Lock size={16} />
                Admin
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'text-accent bg-accent/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 px-4 space-y-3 border-t border-border">
                  <Button asChild className="w-full btn-gold border-0">
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2">
                      Book a Consultation
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2">
                      <Lock size={16} />
                      Admin
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
