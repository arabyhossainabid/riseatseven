"use client";
import Link from "next/link";

const footerLinks = {
  company: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Culture", href: "/culture" },
    { label: "Meet The Risers", href: "/meet-the-team" },
  ],
  explore: [
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Webinars", href: "/webinars" },
    { label: "Careers", href: "/careers" },
  ],
  offices: [
    { label: "Sheffield", href: "#" },
    { label: "Manchester", href: "#" },
    { label: "London", href: "#" },
    { label: "New York", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { label: "FB", href: "https://facebook.com/riseatseven" },
  { label: "X", href: "https://x.com/riseatseven" },
  { label: "LI", href: "https://linkedin.com/company/riseatseven" },
  { label: "YT", href: "https://youtube.com" },
  { label: "TT", href: "https://tiktok.com/@riseatseven" },
  { label: "IG", href: "https://instagram.com/riseatseven" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 px-6 md:px-8 pt-16 pb-10">
      {/* Top row */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-12 mb-16">
        {/* Brand */}
        <div>
          <Link href="/" className="block text-black font-black text-lg tracking-[0.1em] uppercase mb-4 hover-line">
            Rise at Seven
          </Link>
          <p className="text-black/30 text-sm leading-relaxed max-w-xs">
            Award-winning search-first content marketing agency with offices in London, Sheffield, Manchester &amp; New York.
          </p>
          <div className="flex items-center gap-4 mt-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/30 hover:text-black text-[0.6rem] tracking-[0.15em] uppercase transition-colors duration-200"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Company links */}
        <div>
          <p className="text-black/20 text-[0.6rem] tracking-[0.2em] uppercase mb-5">Company</p>
          <ul className="space-y-3">
            {footerLinks.company.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-black/50 hover:text-black text-sm transition-colors duration-200 hover-line"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore links */}
        <div>
          <p className="text-black/20 text-[0.6rem] tracking-[0.2em] uppercase mb-5">Explore</p>
          <ul className="space-y-3">
            {footerLinks.explore.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-black/50 hover:text-black text-sm transition-colors duration-200 hover-line"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Offices */}
        <div>
          <p className="text-black/20 text-[0.6rem] tracking-[0.2em] uppercase mb-5">Offices</p>
          <ul className="space-y-3">
            {footerLinks.offices.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-black/50 hover:text-black text-sm transition-colors duration-200 hover-line"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Big CTA */}
      <div className="border-t border-black/5 pt-12 mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-black/30 text-[0.65rem] tracking-[0.2em] uppercase mb-2">
              Ready to rise?
            </p>
            <p className="text-black text-2xl md:text-3xl font-bold tracking-tight">
              Let&apos;s build something remarkable.
            </p>
          </div>
          <Link
            href="/connect"
            className="group inline-flex items-center gap-3 text-[0.7rem] tracking-[0.15em] uppercase font-bold text-white bg-black px-8 py-4 hover:bg-black/90 transition-colors duration-300 flex-shrink-0 rounded-full"
          >
            Get in touch
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Bottom row */}
      <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 text-black/25 text-[0.6rem]">
          <span>© 2025 Rise at Seven Ltd. All rights reserved</span>
          <span>Company Number 11955187</span>
          <span>VAT Registered GB 322402945</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/privacy-policy" className="text-black/25 hover:text-black text-[0.6rem] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-black/25 hover:text-black text-[0.6rem] transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
