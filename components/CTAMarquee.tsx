"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function CTAMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on marquee
      gsap.to(marqueeRef.current, {
        xPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(sectionRef.current, {
        opacity: 0, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const text = "Chasing Consumers   Not Algorithms   ";

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 overflow-hidden border-t border-black/5 relative bg-white"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,0.1), transparent)",
          }}
        />
      </div>

      <div ref={marqueeRef} className="relative z-20 overflow-hidden">
        <div
          className="whitespace-nowrap inline-flex"
          style={{ animation: "marquee 18s linear infinite" }}
        >
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="text-[clamp(3rem,8vw,7rem)] font-black tracking-tightest leading-none inline-flex items-center gap-8 pr-8"
            >
              <span className="text-black">Chasing Consumers</span>
              <span className="text-black/10 text-[0.15em] align-middle">■</span>
              <span className="text-black/10">Not Algorithms</span>
              <span className="text-black/10 text-[0.15em] align-middle">■</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-20 mt-12 px-6 md:px-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <p className="text-black/40 text-sm max-w-sm">
          We create, distribute and optimise content for humans first — making you impossible to ignore.
        </p>
        <Link
          href="/connect"
          className="group flex-shrink-0 inline-flex items-center gap-3 text-[0.7rem] tracking-[0.15em] uppercase font-bold text-white bg-black px-7 py-3.5 hover:bg-black/90 transition-colors duration-300 rounded-full"
        >
          Start a project
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
