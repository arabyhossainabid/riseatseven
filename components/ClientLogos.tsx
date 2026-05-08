"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "Red Bull", src: "/images/red-bull-logo-black.png" },
  { name: "SIXT", src: "https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Client/Black/01J76SW385WN4X1CBJWJV7QSAP.png?w=200&q=80&fm=webp" },
  { name: "Emirates", src: "/images/Untitled-design.png" },
];

export default function ClientLogos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0, y: 15, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
      gsap.from(logosRef.current?.children ?? [], {
        opacity: 0, y: 20, stagger: 0.08, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: logosRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-6 md:px-8 border-t border-black/5">
      <div ref={labelRef} className="mb-10">
        <span className="text-black/30 text-[0.65rem] tracking-[0.25em] uppercase">
          The agency behind...
        </span>
      </div>
      <div
        ref={logosRef}
        className="flex flex-wrap items-center justify-between gap-8 md:gap-12"
      >
        {clients.map((client) => (
          <div key={client.name} className="relative h-8 md:h-10 w-24 md:w-32 grayscale hover:grayscale-0 transition-all duration-500 opacity-30 hover:opacity-100">
            <Image
              src={client.src}
              alt={client.name}
              fill
              className="object-contain"
            />
          </div>
        ))}
        {/* Additional clients as text if no logos found */}
        {["Dojo", "JD Sports", "Parkdean", "Pooky", "Revolution Beauty"].map(
          (name) => (
            <span
              key={name}
              className="text-black/20 text-[0.75rem] tracking-[0.15em] uppercase font-semibold hover:text-black/50 transition-colors duration-300"
            >
              {name}
            </span>
          )
        )}
      </div>
    </section>
  );
}
