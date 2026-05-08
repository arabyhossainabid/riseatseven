"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    id: 1,
    title: "SIXT",
    category: "Car rental",
    years: "2023-2025",
    description: "An extra 3m clicks regionally through SEO",
    src: "/images/Screenshot-2025-06-23-at-23.14.49.png",
    href: "/work/sixt",
    size: "large",
  },
  {
    id: 2,
    title: "Dojo - B2B",
    category: "Card Machines",
    years: "2021-2025",
    description: "A B2B success story for Dojo card machines",
    src: "/images/WhatsApp-Image-2025-06-03-at-08.34.50.jpeg",
    href: "/work/dojo",
    size: "small",
  },
  {
    id: 3,
    title: "Magnet Trade - B2B",
    category: "Full service SEO",
    years: "2023-2024",
    description: "A full service SEO success story 170%+ increase",
    src: "/images/Screenshot-2025-06-23-at-23.16.14.png",
    href: "/work/magnet-trade",
    size: "small",
  },
  {
    id: 4,
    title: "JD Sports",
    category: "Trainers",
    years: "2025",
    description: "65% up YoY in clicks for JDSports FR, IT, ES",
    src: "/images/0B5A6875.jpg",
    href: "/work/jd-sports",
    size: "wide",
  },
  {
    id: 5,
    title: "Parkdean Resorts",
    category: "Easter Breaks",
    years: "2019-2025",
    description: "Dominating Google and AI search",
    src: "/images/Screenshot-2025-06-23-at-22.39.35.png",
    href: "/work/parkdean",
    size: "small",
  },
  {
    id: 6,
    title: "Revolution Beauty",
    category: "Beauty Dupes",
    years: "2022-2025",
    description: "Building the UK's leading beauty dupe brand",
    src: "/images/temp_image_43CEDE6C-4430-479F-9DBF-B348FA9AC991.WEBP",
    href: "/work/revolution-beauty",
    size: "small",
  },
];

function WorkCard({ work }: { work: typeof works[0] }) {
  return (
    <Link href={work.href} className="work-card group block relative overflow-hidden bg-black/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={work.src}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          unoptimized
        />
        <div className="work-overlay absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
          <p className="text-white text-sm font-semibold">{work.description}</p>
        </div>
      </div>
      <div className="p-4 md:p-5 border-t border-black/5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[0.6rem] text-black/30 tracking-[0.15em] uppercase mb-1">
              {work.category} · {work.years}
            </p>
            <h3 className="text-black font-bold text-base md:text-lg tracking-tight">
              {work.title}
            </h3>
          </div>
          <span className="text-black/30 group-hover:text-black transition-colors duration-300 mt-1 text-lg">
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current?.children ?? [], {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%" },
      });

      const cards = gridRef.current?.children ?? [];
      gsap.from(cards, {
        opacity: 0, y: 40, stagger: 0.07, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-8 border-t border-black/5">
      <div ref={headRef} className="flex items-end justify-between mb-12 md:mb-16 gap-4">
        <h2 className="text-section font-black tracking-tightest leading-none text-black">
          Featured Work
        </h2>
        <Link
          href="/work"
          className="text-black/40 hover:text-black text-[0.65rem] tracking-[0.15em] uppercase hover-line transition-colors duration-200 flex-shrink-0 pb-1"
        >
          Explore All Work →
        </Link>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
      >
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </section>
  );
}
