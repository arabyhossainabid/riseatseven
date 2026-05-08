"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function MissionStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll(".mission-word");
      if (!words) return;

      words.forEach((word, i) => {
        gsap.fromTo(
          word,
          { opacity: 0.15 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: word,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const missionText = "A global team of search-first content marketers engineering semantic relevancy & category signals for both the internet and people";

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-8 border-t border-black/5">
      <div className="max-w-5xl">
        <div className="mb-12 flex items-center justify-between">
          <span className="text-black/30 text-[0.65rem] tracking-[0.25em] uppercase">
            Our story
          </span>
          <div className="flex gap-4">
            <Link
              href="/about"
              className="text-black/40 hover:text-black text-[0.65rem] tracking-[0.15em] uppercase hover-line transition-colors duration-200"
            >
              Our Story
            </Link>
            <Link
              href="/services"
              className="text-black/40 hover:text-black text-[0.65rem] tracking-[0.15em] uppercase hover-line transition-colors duration-200"
            >
              Our Services →
            </Link>
          </div>
        </div>
 
        <div ref={textRef} className="text-display font-bold tracking-tight leading-[1.05]">
          {missionText.split(" ").map((word, i) => (
            <span
              key={i}
              className="mission-word inline-block mr-[0.25em] text-black"
              style={{ opacity: 0.15 }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
