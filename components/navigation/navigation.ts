export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  singleColumn?: boolean;
  defaultImage?: string;
}

export const navItems: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    defaultImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    children: [
      { label: "Search & Growth Strategy", href: "/services/search-growth-strategy" },
      { label: "Onsite SEO", href: "/services/onsite-seo" },
      { label: "Content Experience", href: "/services/content-experience" },
      { label: "B2B Marketing", href: "/services/b2b-marketing" },
      { label: "Digital PR", href: "/services/digital-pr" },
      { label: "Social Media & Campaigns", href: "/services/social-media-campaigns" },
      { label: "Data & Insights", href: "/services/data-insights" },
      { label: "Social SEO/Search", href: "/services/social-seo-search" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    singleColumn: true,
    defaultImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80",
    children: [
      { label: "B2B Marketing", href: "/industries/b2b-marketing" },
    ],
  },
  {
    label: "International",
    href: "/international",
    singleColumn: true,
    defaultImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
    children: [
      { label: "US Digital PR", href: "/international/us-digital-pr" },
      { label: "Spain Digital PR", href: "/international/spain-digital-pr" },
      { label: "Germany Digital PR", href: "/international/germany-digital-pr" },
      { label: "Netherlands Digital PR", href: "/international/netherlands-digital-pr" },
    ],
  },
  {
    label: "About",
    href: "/about",
    singleColumn: true,
    defaultImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Meet The Risers", href: "/about/meet-the-risers" },
      { label: "Culture", href: "/about/culture" },
      { label: "Testimonials", href: "/about/testimonials" },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Careers", href: "/careers" },
  {
    label: "Blog & Resources",
    href: "/blog",
    singleColumn: true,
    defaultImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Category Leaderboard", href: "/blog/category-leaderboard" },
      { label: "Multi-Channel Search Report", href: "/blog/multi-channel-search-report" },
    ],
  },
  { label: "Webinar", href: "/webinar" },
];

export const childImages: Record<string, string> = {
  "Search & Growth Strategy": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  "Onsite SEO": "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80",
  "Content Experience": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
  "B2B Marketing": "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80",
  "Digital PR": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
  "Social Media & Campaigns": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
  "Data & Insights": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  "Social SEO/Search": "https://images.unsplash.com/photo-1488229297570-58520851e868?w=600&q=80",
  "Retail & E-commerce": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  "Finance": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
  "Technology": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  "Travel & Leisure": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
  "Healthcare": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
  "Education": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  "US Expansion": "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&q=80",
  "Europe & Nordics": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
  "MENA Region": "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=600&q=80",
  "APAC Market": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
  "Our Story": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
  "The Team": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
  "Careers": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  "Contact": "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=600&q=80",
};
