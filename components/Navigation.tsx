"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const navItems = [
  {
    label: "Services",
    href: "/services",
    defaultImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    children: [
      "Search & Growth Strategy",
      "Onsite SEO",
      "Content Experience",
      "B2B Marketing",
      "Digital PR",
      "Social Media & Campaigns",
      "Data & Insights",
      "Social SEO/Search",
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    defaultImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80",
    children: [
      "B2B Marketing",
    ],
  },
  {
    label: "International",
    href: "/international",
    singleColumn: true,
    defaultImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
    children: [
      "US Digital PR",
      "Spain Digital PR",
      "Germany Digital PR",
      "Netherlands Digital PR",
    ],
  },
  {
    label: "About",
    href: "/about",
    singleColumn: true,
    defaultImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    children: [
      "About Us",
      "Meet The Risers",
      "Culture",
      "Testimonials",
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Careers", href: "/careers" },
  { label: "Blog & Resources", href: "/blog" },
  { label: "Webinar", href: "/webinar" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [hoveredChild, setHoveredChild] = useState<string | null>(null);

  const childImages: Record<string, string> = {
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

  const navContainerRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownInnerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredLabel(null);
    }, 100);
  };

  const cancelClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  useEffect(() => {
    if (hoveredLabel && hoverPillRef.current) {
      const activeItem = navContainerRef.current?.querySelector(`[data-label="${hoveredLabel}"]`);
      if (activeItem) {
        const { offsetLeft, offsetWidth } = activeItem as HTMLElement;
        gsap.to(hoverPillRef.current, {
          x: offsetLeft,
          width: offsetWidth,
          opacity: 1,
          duration: 0.15,
          ease: "power2.out",
        });
      }
    } else {
      gsap.to(hoverPillRef.current, {
        opacity: 0,
        duration: 0.1,
      });
    }
  }, [hoveredLabel]);

  useEffect(() => {
    if (activeDropdown && dropdownRef.current && dropdownInnerRef.current) {
      // Animate shared dropdown dimensions
      gsap.to(dropdownRef.current, {
        height: dropdownInnerRef.current.offsetHeight,
        width: dropdownInnerRef.current.offsetWidth,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
        overwrite: true
      });
    } else if (!activeDropdown && dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power3.in",
      });
    }
  }, [activeDropdown, hoveredChild]); // hoveredChild added to trigger height change if image changes size (though unlikely)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;

      // Determine if scrolled past threshold for background change
      setScrolled(currentScrollY > 50);

      // Show/Hide logic with thresholds
      if (currentScrollY <= 0) {
        // At the very top
        setVisible(true);
      } else if (scrollDiff > 0 && currentScrollY > 150) {
        // Scrolling down significantly - hide
        setVisible(false);
      } else if (scrollDiff < -10) {
        // Scrolling up by at least 10px - show
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Dynamic top position to sit below AnnouncementBar initially
  const topPos = scrolled ? 20 : Math.max(0, 54 - lastScrollY);

  return (
    <>
      <nav
        style={{ top: `${topPos}px` }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out ${scrolled
          ? "mx-6 rounded-full border border-white/20 bg-white/60 backdrop-blur-3xl py-0 shadow-2xl"
          : "w-full bg-transparent py-4"
          } ${visible ? "translate-y-0" : "translate-y-[-150%]"}`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`z-10 transition-colors duration-300 ${scrolled ? "text-black" : "text-white"}`}
          >
            <svg className="h-5 w-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 21" fill="none">
              <path d="M91.3152 5.40061C91.3152 3.94241 92.5306 2.67359 93.9881 2.67359C95.7162 2.67359 96.797 3.83419 96.797 5.56225H99.7127C99.7127 2.1873 97.3096 0 93.9874 0C90.9371 0 88.3988 2.32257 88.3988 5.42766C88.3988 9.31596 90.883 10.2344 93.9874 11.4221C95.6627 12.07 97.2007 12.5563 97.2007 14.6895C97.2007 16.634 95.9867 18.0651 93.9874 18.0651C91.8813 18.0651 90.7477 16.3905 90.7477 14.446H87.832C87.832 18.0651 90.3426 20.7381 93.9874 20.7381C97.6323 20.7381 100.118 18.2816 100.118 14.6895C100.118 7.10161 91.3145 9.64061 91.3145 5.40061H91.3152Z"></path>
              <path d="M109.209 4.99609C104.834 4.99609 101.539 8.53405 101.539 12.8539C101.539 17.1737 104.888 20.738 109.155 20.738C112.422 20.738 115.203 18.713 116.337 15.662H113.529C112.718 17.2278 111.017 18.1733 109.262 18.1733C106.806 18.1733 104.915 16.4182 104.348 14.0963H116.743C116.797 13.6371 116.823 13.1508 116.823 12.6922C116.823 8.47926 113.447 4.99609 109.209 4.99609ZM104.348 11.9361C104.509 9.47823 106.751 7.56147 109.181 7.56147C111.611 7.56147 113.853 9.47823 114.014 11.9361H104.348Z"></path>
              <path d="M127.476 5.40039L123.575 16.0941L119.673 5.40039H116.676L122.617 20.3598H124.588L130.475 5.40039H127.476Z"></path>
              <path d="M137.942 4.99609C133.567 4.99609 130.273 8.53405 130.273 12.8539C130.273 17.1737 133.621 20.738 137.888 20.738C141.155 20.738 143.936 18.713 145.071 15.662H142.262C141.453 17.2278 139.75 18.1733 137.996 18.1733C135.538 18.1733 133.649 16.4182 133.081 14.0963H145.476C145.53 13.6371 145.556 13.1508 145.556 12.6922C145.556 8.47926 142.182 4.99609 137.942 4.99609ZM133.081 11.9361C133.243 9.47823 135.484 7.56147 137.915 7.56147C140.347 7.56147 142.586 9.47823 142.749 11.9361H133.081Z"></path>
              <path d="M147.473 8.21195V8.69013V20.3618H150.032V10.1815L167.216 20.3618V17.2405L147.473 5.40039V8.21195Z"></path>
              <path d="M67.8431 7.50804H67.789C66.6818 5.80635 64.7103 4.99609 62.713 4.99609C58.1775 4.99609 54.7734 8.3981 54.7734 12.935C54.7734 17.4719 58.2296 20.7387 62.713 20.7387C64.7651 20.7387 66.7359 19.8473 67.789 18.0387H67.8431V20.3606H70.652V5.40122H67.8431V7.50804ZM62.686 18.1733C59.823 18.1733 57.5823 15.7168 57.5823 12.9073C57.5823 10.0978 59.7425 7.56079 62.7124 7.56079C65.6822 7.56079 67.8972 9.90973 67.8972 12.9073C67.8972 15.9048 65.6024 18.1733 62.6867 18.1733H62.686Z"></path>
              <path d="M77.5832 0.378906H74.7736V5.40144H72.75V7.96681H74.7736V20.3608H77.5832V7.96681H80.0403V5.40144H77.5832V0.378906Z"></path>
              <path d="M18.3089 0.378906H15.5V3.2953H18.3089V0.378906Z"></path>
              <path d="M18.3089 5.02344H15.5V19.9828H18.3089V5.02344Z"></path>
              <path d="M25.8409 10.7205C24.8142 10.3959 23.5183 10.0996 23.5183 8.77603C23.5183 7.77639 24.3279 7.18256 25.2728 7.18256C26.4077 7.18256 27.0549 7.91166 27.1895 8.99178H29.9984C29.9443 6.39935 27.9727 4.61719 25.4087 4.61719C22.8447 4.61719 20.7088 6.3723 20.7088 8.93767C20.7088 14.2307 27.5412 12.6102 27.5412 15.743C27.5412 17.0389 26.6227 17.7951 25.381 17.7951C23.707 17.7951 22.9516 16.6074 22.8427 15.0681H20.0352C20.0352 17.417 21.1951 19.2269 23.4094 20.0094C24.0303 20.2252 24.6789 20.3604 25.3262 20.3604C28.1892 20.3604 30.3494 18.5248 30.3494 15.5807C30.3494 12.6366 28.296 11.476 25.8402 10.7205H25.8409Z"></path>
              <path d="M39.3637 4.61719C34.9891 4.61719 31.6953 8.15514 31.6953 12.475C31.6953 16.7948 35.0432 20.3591 39.3096 20.3591C42.577 20.3591 45.3581 18.3341 46.493 15.2831H43.6842C42.8746 16.8489 41.1722 17.7944 39.4178 17.7944C36.96 17.7944 35.0709 16.0393 34.5028 13.7174H46.8975C46.9516 13.2582 46.978 12.7719 46.978 12.3133C46.978 8.10036 43.6037 4.61719 39.3637 4.61719ZM34.5028 11.5565C34.6651 9.09864 36.9059 7.18188 39.3373 7.18188C41.7688 7.18188 44.0075 9.09932 44.1705 11.5565H34.5028Z"></path>
              <path d="M9.55945 12.1512C12.1519 11.2327 13.3395 9.09953 13.3395 6.39957C13.3395 4.67151 12.7728 2.88934 11.5046 1.67395C10.0998 0.297591 8.07419 0 6.18314 0H0V19.9826H2.91572V13.8069L13.3389 19.9826V16.8606L6.22575 12.5949L7.61496 12.5293C8.26222 12.5293 8.96359 12.3676 9.55809 12.1512H9.55945ZM4.91499 10.3156H2.91572V2.67359H5.99444C8.317 2.67359 10.4231 3.86192 10.4231 6.40024C10.4231 9.5865 7.50742 10.3156 4.91499 10.3156Z"></path>
              <path d="M164.759 7.94414L166.061 8.71517V8.08955L165.395 7.69051C165.437 7.68172 165.48 7.66954 165.521 7.65466C165.869 7.53157 166.061 7.24209 166.061 6.84034C166.061 6.57725 165.966 6.33579 165.801 6.17753C165.583 5.9638 165.277 5.93945 165.065 5.93945H164.191V8.63807H164.758V7.94346L164.759 7.94414ZM164.908 7.22856H164.76V6.47715H165.043C165.261 6.47715 165.495 6.57251 165.495 6.84102C165.495 7.10953 165.297 7.22856 164.908 7.22856H164.908Z"></path>
              <path d="M165.127 10.1622C166.714 10.1622 168 8.87583 168 7.28913C168 5.70242 166.714 4.41602 165.127 4.41602C163.54 4.41602 162.254 5.70242 162.254 7.28913C162.254 8.87583 163.54 10.1622 165.127 10.1622ZM165.127 5.22763C166.264 5.22763 167.189 6.15219 167.189 7.28913C167.189 8.42606 166.264 9.35062 165.127 9.35062C163.99 9.35062 163.066 8.42606 163.066 7.28913C163.066 6.15219 163.99 5.22763 165.127 5.22763Z"></path>
            </svg>
          </Link>

          {/* Desktop Nav */}
          <div
            ref={navContainerRef}
            className="hidden lg:flex items-center gap-1 px-1 relative h-full"
            onMouseLeave={scheduleClose}
          >
            {/* Sliding Hover Pill */}
            <div
              ref={hoverPillRef}
              className="absolute h-[34px] bg-white rounded-full opacity-0 pointer-events-none z-0 shadow-sm transition-opacity duration-150 top-1/2 -translate-y-1/2"
            />

            {navItems.map((item) => (
              <div
                key={item.label}
                data-label={item.label}
                className="relative z-10"
                onMouseEnter={() => {
                  cancelClose();
                  setHoveredLabel(item.label);
                  if (item.children) setActiveDropdown(item.label);
                }}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={item.href}
                  className={`px-4 py-2 text-base font-medium transition-colors duration-300 h-[34px] flex items-center rounded-full relative z-10 ${scrolled ? "text-black" : "text-white"} ${hoveredLabel === item.label ? "text-black!" : ""}`}
                >
                  {item.label}
                  {(item.label === "Services" || item.label === "Industries" || item.label === "International" || item.label === "About") && (
                    <span className="text-[10px] opacity-60 ml-1">+</span>
                  )}
                  {item.label === "Work" && (
                    <span className="bg-[#B2F6E3] text-black text-[8px] px-1 rounded-full font-bold ml-1">3K</span>
                  )}
                </Link>
              </div>
            ))}

            {/* Shared Mega Menu Container */}
            <div
              ref={dropdownRef}
              className={`fixed left-1/2 -translate-x-1/2 top-[80px] bg-white rounded-4xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.18)] border border-black/5 overflow-hidden z-50 pointer-events-none transition-opacity duration-200 ${activeDropdown ? "opacity-100 pointer-events-auto" : "opacity-0"}`}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <div ref={dropdownInnerRef} className="p-10 inline-flex gap-10">
                {activeDropdown && navItems.find(i => i.label === activeDropdown)?.children && (
                  <>
                    {/* Left: Title + Links Grid */}
                    <div className="flex-1">
                      <span className="text-black/40 text-[0.75rem] font-semibold tracking-widest uppercase mb-6 block">
                        Core {activeDropdown}
                      </span>
                      <div className={`grid gap-x-8 gap-y-3 ${navItems.find(i => i.label === activeDropdown)?.singleColumn ? "grid-cols-1" : "grid-cols-2"}`}>
                        {navItems.find(i => i.label === activeDropdown)?.children?.map((child) => (
                          <div
                            key={child}
                            className="group/child"
                            onMouseEnter={() => setHoveredChild(child)}
                            onMouseLeave={() => setHoveredChild(null)}
                          >
                            <Link
                              href={`/${child.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block h-[26px] overflow-hidden"
                            >
                              <div className="flex flex-col transition-transform duration-200 ease-out group-hover/child:-translate-y-1/2">
                                <span className="h-[26px] flex items-center text-[1rem] font-bold tracking-tight text-black leading-none whitespace-nowrap">{child}</span>
                                <span className="h-[26px] flex items-center text-[1rem] font-bold tracking-tight text-black/50 leading-none whitespace-nowrap">{child}</span>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Featured Image Section */}
                    <div className="w-[260px] relative rounded-2xl overflow-hidden group/image shrink-0">
                      <img
                        src={hoveredChild && childImages[hoveredChild]
                          ? childImages[hoveredChild]
                          : (navItems.find(i => i.label === activeDropdown)?.defaultImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80")}
                        alt="Featured"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover/image:bg-black/10" />

                      <Link
                        href={navItems.find(i => i.label === activeDropdown)?.href || "#"}
                        className="absolute bottom-6 left-6 bg-black text-white px-6 py-4 rounded-full flex items-center gap-2 text-sm font-bold tracking-tight hover:bg-black/80 transition-all duration-300 shadow-lg"
                      >
                        View All {activeDropdown} <span className="text-xs">↗</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-5">
            <Link
              href="/connect"
              className={`nav-item hidden md:block h-[42px] overflow-hidden rounded-full transition-all duration-300 group/cta ${scrolled
                ? "text-white bg-black hover:bg-black/80"
                : "text-black bg-white hover:bg-white/90"
                }`}
            >
              <div className="flex flex-col transition-transform duration-300 ease-[0.76,0,0.24,1] group-hover/cta:-translate-y-1/2">
                <div className="flex items-center justify-center px-6 h-[42px] text-base font-semibold whitespace-nowrap gap-2">
                  Get In Touch <span className="text-sm">↗</span>
                </div>
                <div className="flex items-center justify-center px-6 h-[42px] text-base font-semibold whitespace-nowrap gap-2">
                  Get In Touch <span className="text-sm">↗</span>
                </div>
              </div>
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-1"
              aria-label="Menu"
            >
              <span
                className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
              />
              <span
                className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 translate-y-[-7px]" : ""
                  }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black z-99 flex flex-col justify-between p-8 transition-all duration-500 ${menuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="pt-16 mt-4">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block text-white text-[2rem] font-bold tracking-tight border-b border-white/10 py-4 hover:text-white/60 transition-colors"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/connect"
          onClick={() => setMenuOpen(false)}
          className="inline-flex items-center justify-center text-[0.75rem] tracking-[0.15em] uppercase font-semibold text-black bg-white px-8 py-4"
        >
          Get in touch
        </Link>
      </div>
    </>
  );
}
