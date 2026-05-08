"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { clientLogos } from "./hero/clientLogosData";

export default function ClientLogos() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const content = marquee.firstElementChild as HTMLElement;
    if (!content) return;

    // Duplicate content for seamless loop
    const clone = content.cloneNode(true);
    marquee.appendChild(clone);

    const duration = 30; // seconds for one full loop

    const tl = gsap.to([content, clone], {
      xPercent: -100,
      repeat: -1,
      duration: duration,
      ease: "none",
    });

    marquee.addEventListener("mouseenter", () => tl.pause());
    marquee.addEventListener("mouseleave", () => tl.resume());

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="w-full pt-6 xl:pt-12 overflow-hidden border-t border-black/5 bg-white">
      <div className="w-full px-4 md:px-7">
        <div className="grid grid-cols-20 w-full gap-y-2 items-center">
          {/* Left Heading */}
          <div className="col-span-20 md:col-span-4 lg:col-span-3 xl:col-span-2">
            <h2 className="text-left text-black/40 text-[0.65rem] md:text-sm font-medium tracking-tight sm:max-w-32 uppercase">
              The agency behind ...
            </h2>
          </div>

          {/* Right Marquee Container */}
          <div className="relative w-full col-span-20 md:col-span-16 lg:col-span-17 xl:col-span-18">
            {/* Blurs */}
            <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

            <div 
              ref={marqueeRef}
              className="flex items-center overflow-hidden whitespace-nowrap"
            >
              <div className="flex items-center gap-12 md:gap-24 px-12 md:px-24 py-10">
                {clientLogos.map((logo, i) => (
                  <div 
                    key={`${logo.name}-${i}`} 
                    className="flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  >
                    <div className="w-20 md:w-32 h-10 relative">
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
