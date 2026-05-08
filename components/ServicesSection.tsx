"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    name: "Digital PR",
    desc: "Earn high-authority links and coverage that drives organic visibility",
    href: "/services/digital-pr",
    src: "/images/Screenshot-2025-06-23-at-22.39.35.png",
  },
  {
    number: "02",
    name: "Organic Social & Content",
    desc: "Multi-channel content that performs on every platform",
    href: "/services/social",
    src: "/images/Screenshot-2025-07-01-at-21.36.35.png",
  },
  {
    number: "03",
    name: "Search & Growth Strategy",
    desc: "Data-led strategies that engineer category leadership",
    href: "/services/strategy-growth",
    src: "/images/data.jpg",
  },
  {
    number: "04",
    name: "Content Experience",
    desc: "Award-winning content that converts and ranks",
    href: "/services/content-experience",
    src: "/images/0B5A6875.jpg",
  },
  {
    number: "05",
    name: "Data & Insights",
    desc: "Proprietary data tools powering search decisions",
    href: "/services/data-insights",
    src: "/images/Screenshot-2025-09-24-at-11.47.25.png",
  },
  {
    number: "06",
    name: "Onsite SEO",
    desc: "Technical and on-page SEO that scales organic growth",
    href: "/services/onsite-seo",
    src: "/images/Screenshot-2025-06-23-at-23.16.14.png",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current?.children ?? [], {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%" },
      });

      const rows = sectionRef.current?.querySelectorAll(".service-row");
      gsap.from(rows ?? [], {
        opacity: 0, x: -20, stagger: 0.06, duration: 0.7, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (imgContainerRef.current) {
      if (hovered !== null) {
        gsap.to(imgContainerRef.current, { opacity: 1, duration: 0.3, ease: "expo.out" });
      } else {
        gsap.to(imgContainerRef.current, { opacity: 0, duration: 0.3 });
      }
    }
  }, [hovered]);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-8 border-t border-black/5">
      <div ref={headRef} className="flex items-end justify-between mb-12 gap-4">
        <h2 className="text-section font-black tracking-tightest leading-none text-black">
          Our Services
        </h2>
        <Link
          href="/services"
          className="text-black/40 hover:text-black text-[0.65rem] tracking-[0.15em] uppercase hover-line transition-colors duration-200 pb-1"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* Service list */}
        <div>
          {services.map((service, i) => (
            <Link
              key={service.number}
              href={service.href}
              className="service-row group flex items-center justify-between py-5 md:py-6 gap-4 hover:border-black/25 transition-all duration-300 border-b border-black/5"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-start gap-6">
                <span className="text-black/20 text-[0.6rem] tracking-[0.2em] uppercase mt-1 w-6 flex-shrink-0">
                  {service.number}
                </span>
                <div>
                  <h3 className="text-black text-lg md:text-xl font-bold tracking-tight group-hover:text-black/70 transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-black/30 text-sm mt-1 max-w-lg">{service.desc}</p>
                </div>
              </div>
              <span className="text-black/20 group-hover:text-black transition-all duration-300 text-xl flex-shrink-0 group-hover:translate-x-1 transform">
                ↗
              </span>
            </Link>
          ))}
        </div>

        {/* Hover image */}
        <div
          ref={imgContainerRef}
          className="hidden lg:block relative opacity-0 sticky top-24 h-[350px] overflow-hidden rounded-2xl"
        >
          {services.map((service, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-300 ${
                hovered === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={service.src}
                alt={service.name}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          ))}
          {hovered === null && (
            <div className="absolute inset-0 border border-black/5 flex items-center justify-center">
              <span className="text-black/15 text-[0.6rem] tracking-[0.25em] uppercase">Hover a service</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
