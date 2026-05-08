"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    title: "Pioneers",
    body: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.\n\nWe're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
    src: "/images/b2087e0cd3f699d3efc76f809ec72a85a6ab378e-1080x1350.jpg",
  },
  {
    title: "Award Winning",
    body: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
    src: "/images/d4df0d30-d590-4e94-9056-9491f4beacba.JPG",
  },
  {
    title: "Speed",
    body: "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
    src: "/images/Screenshot-2025-06-23-at-23.15.19.png",
  },
];

const stats = [
  { number: "79+", label: "Awards Won" },
  { number: "6", label: "Years Old" },
  { number: "150+", label: "Team Members" },
  { number: "4", label: "Global Offices" },
];

export default function LegacySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);
  const imgRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        opacity: 0, y: 30, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%" },
      });

      gsap.from(statsRef.current?.children ?? [], {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 1.03 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" }
      );
    }
  }, [activePanel]);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-8 border-t border-black/5">
      <div ref={headRef} className="mb-16">
        <span className="text-black/30 text-[0.65rem] tracking-[0.25em] uppercase block mb-4">
          Legacy in the making
        </span>
        <h2 className="text-section font-black tracking-tightest leading-none text-black">
          Who We Are
        </h2>
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
        {/* Text panels */}
        <div className="space-y-0">
          {panels.map((panel, i) => (
            <div
              key={i}
              className={`border-t border-black/10 py-6 cursor-pointer transition-all duration-300 ${
                activePanel === i ? "border-black/30" : ""
              }`}
              onClick={() => setActivePanel(i)}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    className={`text-xl font-bold tracking-tight mb-3 transition-colors duration-300 ${
                      activePanel === i ? "text-black" : "text-black/40"
                    }`}
                  >
                    {panel.title}
                  </h3>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      activePanel === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {panel.body.split("\n\n").map((para, j) => (
                      <p key={j} className="text-black/50 text-sm leading-relaxed mb-3">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
                <span
                  className={`text-xl transition-all duration-300 flex-shrink-0 mt-1 ${
                    activePanel === i ? "rotate-45 text-black" : "text-black/20"
                  }`}
                >
                  +
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="relative h-80 lg:h-auto lg:min-h-[400px] overflow-hidden rounded-3xl">
          <div ref={imgRef} className="absolute inset-0">
            <Image
              src={panels[activePanel].src}
              alt={panels[activePanel].title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-black/5 pt-12"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <div className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tightest leading-none text-black mb-2">
              {stat.number}
            </div>
            <div className="text-black/30 text-[0.65rem] tracking-[0.2em] uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
