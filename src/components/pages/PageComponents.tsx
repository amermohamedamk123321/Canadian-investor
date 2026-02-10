/**
 * Reusable Page Components Library
 * Common components for public pages that fetch content from API
 */

import { ReactNode } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

/**
 * PageHero - Hero section for page top
 */
interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export function PageHero({ title, subtitle, badge }: PageHeroProps) {
  return (
    <section className="section-padding hero-gradient">
      <div className="container-custom">
        <div className="max-w-3xl">
          {badge && (
            <span className="trust-badge mb-6 inline-block">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * PageContent - Standard content section with HTML rendering
 */
interface PageContentProps {
  content: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export function PageContent({ content, maxWidth = 'lg' }: PageContentProps) {
  const maxWidthClass = {
    sm: 'max-w-2xl',
    md: 'max-w-3xl',
    lg: 'max-w-4xl',
    xl: 'max-w-5xl',
  }[maxWidth];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className={`prose prose-lg max-w-none ${maxWidthClass} mx-auto`}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </section>
  );
}

/**
 * PageLoadingState - Loading spinner for async content
 */
export function PageLoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );
}

/**
 * PageCard - Reusable card component for entries
 */
interface PageCardProps {
  title: string;
  description: string;
  badge?: { label: string; variant?: 'default' | 'secondary' | 'outline' };
  footer?: ReactNode;
  children?: ReactNode;
}

export function PageCard({
  title,
  description,
  badge,
  footer,
  children,
}: PageCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition flex flex-col h-full">
      <div className="flex items-start justify-between mb-4 gap-4">
        <h3 className="text-xl flex-1">{title}</h3>
        {badge && (
          <span className="text-xs px-2 py-1 rounded whitespace-nowrap" style={{background: 'hsl(45 90% 80%)', color: 'hsl(222 47% 11%)'}}>
            {badge.label}
          </span>
        )}
      </div>

      <p className="text-muted-foreground mb-4 flex-grow">{description}</p>

      {children && <div className="mb-4">{children}</div>}

      {footer && <div className="border-t pt-4 mt-auto">{footer}</div>}
    </Card>
  );
}

/**
 * PageGrid - Grid layout for cards/entries
 */
interface PageGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

export function PageGrid({ children, columns = 3 }: PageGridProps) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  }[columns];

  return (
    <div className={`grid grid-cols-1 ${colsClass} gap-6`}>
      {children}
    </div>
  );
}

/**
 * PageCTA - Call-to-action section
 */
interface PageCTAProps {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function PageCTA({
  title,
  description,
  ctaLabel = 'Get Started',
  ctaHref = '#',
}: PageCTAProps) {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-heading mb-4">{title}</h2>
        {description && (
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <Button size="lg" asChild>
          <a href={ctaHref}>{ctaLabel}</a>
        </Button>
      </div>
    </section>
  );
}

/**
 * PageSection - Generic section wrapper
 */
interface PageSectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  background?: 'primary' | 'secondary' | 'background';
  centered?: boolean;
}

export function PageSection({
  title,
  subtitle,
  children,
  background = 'background',
  centered = false,
}: PageSectionProps) {
  const bgClass = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary',
    background: 'bg-background',
  }[background];

  return (
    <section className={`section-padding ${bgClass}`}>
      <div className="container-custom">
        {title && (
          <div className={centered ? 'text-center mb-12' : 'mb-8'}>
            <h2 className="text-3xl font-heading mb-2">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/**
 * PageDivider - Visual separator between sections
 */
export function PageDivider() {
  return <div className="h-px bg-border my-12" />;
}

/**
 * PageBadgeList - List of badges/tags
 */
interface PageBadgeListProps {
  items: string[];
}

export function PageBadgeList({ items }: PageBadgeListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, idx) => (
        <span
          key={idx}
          className="text-xs bg-primary/10 text-primary px-3 py-1 rounded"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

/**
 * PageFeatureList - List of features with descriptions
 */
interface Feature {
  title: string;
  description: string;
}

interface PageFeatureListProps {
  features: Feature[];
  columns?: 2 | 3;
}

export function PageFeatureList({
  features,
  columns = 2,
}: PageFeatureListProps) {
  const colClass = columns === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2';

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-6`}>
      {features.map((feature, idx) => (
        <div key={idx} className="p-4">
          <h4 className="font-semibold mb-2">{feature.title}</h4>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * PageList - Formatted list with bullets
 */
interface PageListProps {
  items: string[];
  ordered?: boolean;
}

export function PageList({ items, ordered = false }: PageListProps) {
  const Tag = ordered ? 'ol' : 'ul';
  const className = ordered ? 'list-decimal' : 'list-disc';

  return (
    <Tag className={`${className} list-inside space-y-2`}>
      {items.map((item, idx) => (
        <li key={idx} className="text-foreground">
          {item}
        </li>
      ))}
    </Tag>
  );
}

/**
 * PageEmptyState - Message when no content available
 */
interface PageEmptyStateProps {
  title: string;
  description?: string;
}

export function PageEmptyState({
  title,
  description,
}: PageEmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      <p className="text-muted-foreground text-lg">{title}</p>
      {description && (
        <p className="text-muted-foreground text-sm mt-2">{description}</p>
      )}
    </div>
  );
}
