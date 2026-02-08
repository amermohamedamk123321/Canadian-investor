export interface Opportunity {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  sector: string;
  province: string;
  investmentRange: string;
  minInvestment: number;
  expectedReturns: string;
  timeline: string;
  highlights: string[];
  pdfUrl?: string;
  status: 'open' | 'closing-soon' | 'closed';
  createdAt: string;
}

export const opportunities: Opportunity[] = [
  {
    slug: 'tech-startup-ontario',
    title: 'Technology Innovation Hub - Ontario',
    shortDescription: 'Invest in a growing tech ecosystem supporting AI and machine learning startups in the Greater Toronto Area.',
    fullDescription: 'This opportunity provides investors with exposure to a curated portfolio of early-stage technology companies focused on artificial intelligence, machine learning, and enterprise software solutions. Located in Toronto\'s thriving tech corridor, this fund targets companies with proven traction and clear paths to profitability.',
    sector: 'Technology',
    province: 'Ontario',
    investmentRange: '$250K - $1M',
    minInvestment: 250000,
    expectedReturns: '15-25% IRR',
    timeline: '3-5 years',
    highlights: [
      'Access to 10+ vetted startups',
      'Quarterly performance reports',
      'Co-investment opportunities',
      'Board observer rights for larger investments',
    ],
    status: 'open',
    createdAt: '2024-01-15',
  },
  {
    slug: 'renewable-energy-alberta',
    title: 'Clean Energy Project - Alberta',
    shortDescription: 'Solar and wind energy infrastructure development across Alberta with long-term power purchase agreements.',
    fullDescription: 'Join the clean energy transition with this infrastructure project developing solar and wind facilities across Alberta. Backed by 20-year power purchase agreements with major utilities, this investment offers stable, predictable returns while contributing to Canada\'s renewable energy goals.',
    sector: 'Energy',
    province: 'Alberta',
    investmentRange: '$500K - $2M',
    minInvestment: 500000,
    expectedReturns: '8-12% annual yield',
    timeline: '10-15 years',
    highlights: [
      '20-year power purchase agreements',
      'Government incentives and tax benefits',
      'Inflation-adjusted returns',
      'Environmental impact reporting',
    ],
    status: 'open',
    createdAt: '2024-02-01',
  },
  {
    slug: 'hospitality-british-columbia',
    title: 'Premium Resort Development - BC',
    shortDescription: 'Luxury eco-resort development in British Columbia\'s stunning Okanagan Valley wine region.',
    fullDescription: 'This premium hospitality development brings a luxury eco-resort to the heart of British Columbia\'s wine country. The 150-room resort will feature sustainable design, a world-class spa, and partnerships with local wineries. Pre-sales indicate strong demand from both domestic and international travelers.',
    sector: 'Hospitality',
    province: 'British Columbia',
    investmentRange: '$100K - $500K',
    minInvestment: 100000,
    expectedReturns: '12-18% IRR',
    timeline: '5-7 years',
    highlights: [
      'Prime Okanagan Valley location',
      'Sustainable LEED certification target',
      'Revenue sharing from operations',
      'Personal usage benefits for investors',
    ],
    status: 'closing-soon',
    createdAt: '2024-01-20',
  },
  {
    slug: 'healthcare-quebec',
    title: 'Medical Technology Fund - Quebec',
    shortDescription: 'Healthcare innovation fund focusing on medical devices and digital health solutions from Quebec\'s biotech sector.',
    fullDescription: 'Capitalize on Quebec\'s world-renowned biotech and pharmaceutical research ecosystem. This fund targets companies developing breakthrough medical devices, digital health platforms, and therapeutic solutions with regulatory approval pathways and established commercial partnerships.',
    sector: 'Healthcare',
    province: 'Quebec',
    investmentRange: '$200K - $750K',
    minInvestment: 200000,
    expectedReturns: '18-28% IRR',
    timeline: '4-6 years',
    highlights: [
      'Access to Quebec R&D tax credits',
      'Portfolio of 8-12 companies',
      'FDA/Health Canada pathways',
      'Expert medical advisory board',
    ],
    status: 'open',
    createdAt: '2024-02-10',
  },
  {
    slug: 'agriculture-saskatchewan',
    title: 'Sustainable Agriculture - Saskatchewan',
    shortDescription: 'Modern farming operations leveraging precision agriculture and sustainable practices in Canada\'s breadbasket.',
    fullDescription: 'Invest in the future of food production with this sustainable agriculture project in Saskatchewan. Utilizing cutting-edge precision farming technology, organic certification, and vertical integration, this operation produces premium crops for domestic and export markets.',
    sector: 'Agriculture',
    province: 'Saskatchewan',
    investmentRange: '$150K - $600K',
    minInvestment: 150000,
    expectedReturns: '10-14% annual yield',
    timeline: '7-10 years',
    highlights: [
      'Precision agriculture technology',
      'Organic certification in progress',
      'Export contracts with Asian markets',
      'Land appreciation potential',
    ],
    status: 'open',
    createdAt: '2024-02-15',
  },
  {
    slug: 'fintech-ontario',
    title: 'Financial Services Innovation - Ontario',
    shortDescription: 'Fintech accelerator fund supporting next-generation payment, lending, and wealth management solutions.',
    fullDescription: 'Toronto\'s emergence as a global fintech hub presents unique investment opportunities. This fund provides capital to high-growth financial technology companies disrupting traditional banking, payments, and wealth management sectors with innovative digital solutions.',
    sector: 'Finance',
    province: 'Ontario',
    investmentRange: '$300K - $1.5M',
    minInvestment: 300000,
    expectedReturns: '20-30% IRR',
    timeline: '3-5 years',
    highlights: [
      'Access to top fintech accelerators',
      'Regulatory sandbox participation',
      'Strategic bank partnerships',
      'Secondary liquidity options',
    ],
    status: 'open',
    createdAt: '2024-03-01',
  },
];

export const sectors = [...new Set(opportunities.map((o) => o.sector))];
export const provinces = [...new Set(opportunities.map((o) => o.province))];
