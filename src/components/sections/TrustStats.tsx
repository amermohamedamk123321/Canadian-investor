import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { SectionHeading } from '@/components/ui/SectionHeading';

const stats = [
  {
    end: 150,
    suffix: '+',
    label: 'Successful Investments',
    description: 'Across diverse sectors and provinces',
  },
  {
    end: 50,
    prefix: '$',
    suffix: 'M+',
    label: 'Capital Deployed',
    description: 'Supporting Canadian business growth',
  },
  {
    end: 95,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Based on annual investor surveys',
  },
];

export const TrustStats = () => {
  return (
    <section className="section-padding bg-secondary" aria-labelledby="trust-stats-heading">
      <div className="container-custom">
        <SectionHeading
          title="Trusted by Investors Worldwide"
          subtitle="Our track record speaks for itself. We've helped hundreds of investors achieve their goals through strategic, transparent partnerships."
          badge="Our Impact"
          centered
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <AnimatedCounter
              key={index}
              end={stat.end}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
