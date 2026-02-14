import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useCreateContactSubmission } from '@/api/hooks';
import { useInView } from 'react-intersection-observer';
import {
  staggerContainerVariants,
  staggerItemVariants,
  fadeInUpVariants,
  fadeInUpTransition,
  scrollTriggerOptions,
  heroTitleVariants,
  heroSubtitleVariants,
} from '@/lib/animations';

interface FormData {
  name: string;
  company: string;
  email: string;
  country: string;
  phone: string;
  message: string;
  honeypot: string;
}

const Contact = () => {
  const { toast } = useToast();
  const createSubmission = useCreateContactSubmission();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    country: '',
    phone: '',
    message: '',
    honeypot: '',
  });

  const { ref: contactInfoRef, inView: contactInfoInView } = useInView(scrollTriggerOptions);
  const { ref: formRef, inView: formInView } = useInView(scrollTriggerOptions);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      return;
    }

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: 'Missing Required Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createSubmission.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        inquiry_type: 'general',
        message: formData.message,
      });

      setIsSubmitted(true);

      toast({
        title: 'Message Sent!',
        description:
          "Thank you for contacting us. We'll respond within 1-2 business days.",
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const contactDetails = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@alphapartnersinvestment.com',
      href: 'mailto:info@alphapartnersinvestment.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (XXX) XXX-XXXX',
      href: 'tel:+1-XXX-XXX-XXXX',
    },
    {
      icon: MapPin,
      label: 'Office Location',
      value: 'Toronto, Ontario, Canada',
      href: null,
    },
  ];

  return (
    <>
      <SEOHead
        title="Contact Us - Alpha Partners Investment Inc"
        description="Get in touch with Alpha Partners Investment Inc. to discuss investment opportunities, schedule a consultation, or learn more about our services."
        canonical="/contact"
      />
      <Layout>
        {/* Hero */}
        <section className="section-padding hero-gradient">
          <div className="container-custom">
            <motion.div
              className="max-w-3xl"
              initial="initial"
              animate="animate"
              variants={staggerContainerVariants}
            >
              <motion.span
                className="trust-badge mb-6 inline-block"
                variants={fadeInUpVariants}
                transition={fadeInUpTransition}
              >
                Get in Touch
              </motion.span>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground"
                variants={heroTitleVariants}
              >
                Let's Discuss Your{' '}
                <span className="text-gold-gradient">Investment Goals</span>
              </motion.h1>
              <motion.p
                className="mt-6 text-lg md:text-xl text-primary-foreground/80 leading-relaxed"
                variants={heroSubtitleVariants}
              >
                Whether you're ready to explore opportunities or simply want to learn more,
                our team is here to help. Reach out and we'll respond within 1-2 business
                days.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <motion.div
                ref={contactInfoRef}
                className="lg:col-span-1"
                initial="initial"
                animate={contactInfoInView ? 'animate' : 'initial'}
                variants={staggerContainerVariants}
              >
                <motion.h2
                  className="text-3xl md:text-4xl font-heading text-foreground mb-4"
                  variants={fadeInUpVariants}
                  transition={fadeInUpTransition}
                >
                  Contact Information
                </motion.h2>
                <motion.div
                  className="h-1 w-20 gold-gradient rounded-full mb-8"
                  variants={fadeInUpVariants}
                  transition={fadeInUpTransition}
                ></motion.div>

                <div className="space-y-6 mb-12">
                  {contactDetails.map((detail, idx) => {
                    const Icon = detail.icon;
                    return (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                        variants={staggerItemVariants}
                      >
                        <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading text-foreground mb-1">
                            {detail.label}
                          </h3>
                          {detail.href ? (
                            <a
                              href={detail.href}
                              className="text-muted-foreground hover:text-accent transition-colors font-medium"
                            >
                              {detail.value}
                            </a>
                          ) : (
                            <p className="text-muted-foreground font-medium">
                              {detail.value}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div
                  className="p-6 bg-accent/10 border border-accent/40 shadow-md shadow-accent/10 hover:border-accent/80 hover:shadow-lg hover:shadow-accent/30 transition-all rounded-2xl"
                  variants={staggerItemVariants}
                  whileHover={{ backgroundColor: 'rgba(217, 70, 39, 0.15)' }}
                >
                  <h3 className="font-heading text-foreground mb-3">
                    Response Time
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We typically respond to inquiries within 1-2 business days. For urgent
                    matters, please indicate so in your message.
                  </p>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                ref={formRef}
                className="lg:col-span-2"
                initial="initial"
                animate={formInView ? 'animate' : 'initial'}
                variants={staggerContainerVariants}
              >
                <div className="bg-card rounded-2xl p-8 md:p-12 border border-accent/40 shadow-md shadow-accent/10 hover:border-accent/80 hover:shadow-lg hover:shadow-accent/30 transition-all">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="text-center py-12"
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <CheckCircle className="h-8 w-8 text-accent" />
                      </motion.div>
                      <h3 className="text-2xl font-heading text-foreground mb-4">
                        Message Received!
                      </h3>
                      <p className="text-muted-foreground mb-8">
                        Thank you for reaching out. A member of our team will contact you
                        within 1-2 business days.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        Send Another Message
                        <ArrowRight size={16} />
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <motion.h2
                        className="text-2xl font-heading text-foreground mb-2"
                        variants={fadeInUpVariants}
                        transition={fadeInUpTransition}
                      >
                        Send Us a Message
                      </motion.h2>
                      <motion.p
                        className="text-muted-foreground mb-8"
                        variants={fadeInUpVariants}
                        transition={{ ...fadeInUpTransition, delay: 0.1 }}
                      >
                        Fill out the form below and we'll get back to you promptly.
                      </motion.p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Honeypot - hidden from users */}
                        <input
                          type="text"
                          name="honeypot"
                          value={formData.honeypot}
                          onChange={handleChange}
                          className="hidden"
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden="true"
                        />

                        <motion.div
                          className="grid md:grid-cols-2 gap-6"
                          variants={staggerContainerVariants}
                        >
                          <motion.div
                            className="space-y-2"
                            variants={staggerItemVariants}
                          >
                            <Label htmlFor="name">
                              Full Name{' '}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Smith"
                              required
                              maxLength={100}
                              className="transition-all focus:ring-2 focus:ring-accent/50"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            variants={staggerItemVariants}
                          >
                            <Label htmlFor="company">Company</Label>
                            <Input
                              id="company"
                              name="company"
                              type="text"
                              value={formData.company}
                              onChange={handleChange}
                              placeholder="Your Company Name"
                              maxLength={100}
                              className="transition-all focus:ring-2 focus:ring-accent/50"
                            />
                          </motion.div>
                        </motion.div>

                        <motion.div
                          className="grid md:grid-cols-2 gap-6"
                          variants={staggerContainerVariants}
                        >
                          <motion.div
                            className="space-y-2"
                            variants={staggerItemVariants}
                          >
                            <Label htmlFor="email">
                              Email Address{' '}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@example.com"
                              required
                              maxLength={255}
                              className="transition-all focus:ring-2 focus:ring-accent/50"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            variants={staggerItemVariants}
                          >
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              name="country"
                              type="text"
                              value={formData.country}
                              onChange={handleChange}
                              placeholder="Your Country"
                              maxLength={100}
                              className="transition-all focus:ring-2 focus:ring-accent/50"
                            />
                          </motion.div>
                        </motion.div>

                        <motion.div
                          className="space-y-2"
                          variants={staggerItemVariants}
                        >
                          <Label htmlFor="phone">Phone Number (Optional)</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (XXX) XXX-XXXX"
                            maxLength={20}
                            className="transition-all focus:ring-2 focus:ring-accent/50"
                          />
                        </motion.div>

                        <motion.div
                          className="space-y-2"
                          variants={staggerItemVariants}
                        >
                          <Label htmlFor="message">
                            Message <span className="text-destructive">*</span>
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your investment interests and goals..."
                            rows={6}
                            required
                            maxLength={2000}
                            className="transition-all focus:ring-2 focus:ring-accent/50"
                          />
                          <p className="text-xs text-muted-foreground text-right">
                            {formData.message.length}/2000
                          </p>
                        </motion.div>

                        <motion.div
                          className="bg-accent/5 p-4 rounded-xl border border-accent/40 shadow-md shadow-accent/10 hover:border-accent/80 hover:shadow-lg hover:shadow-accent/30 transition-all"
                          variants={staggerItemVariants}
                        >
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            By submitting this form, you agree to our privacy policy. We will
                            never share your information with third parties without your
                            consent.
                          </p>
                        </motion.div>

                        <motion.div
                          variants={staggerItemVariants}
                        >
                          <Button
                            type="submit"
                            size="lg"
                            className="w-full btn-gold border-0 group"
                            disabled={createSubmission.isPending}
                          >
                            {createSubmission.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
