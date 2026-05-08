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
    const clone = content.cloneNode(true) as HTMLElement;
    marquee.appendChild(clone);

    // Continuous linear motion
    const duration = 40; // slow and steady

    const tl = gsap.to([content, clone], {
      xPercent: -100,
      repeat: -1,
      duration: duration,
      ease: "none",
    });

    // Pause on hover
    marquee.addEventListener("mouseenter", () => tl.pause());
    marquee.addEventListener("mouseleave", () => tl.resume());

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="w-full pt-6 xl:pt-12 overflow-hidden bg-white border-t border-black/5">
      <div className="w-full px-4 md:px-7">
        <div className="grid grid-cols-20 w-full gap-y-4 items-center">
          {/* Heading */}
          <div className="col-span-20 md:col-span-4 lg:col-span-3 xl:col-span-2">
            <h2 className="text-left text-[#1A1A1A] text-sm font-medium tracking-tight sm:max-w-32 leading-tight">
              The agency behind ...
            </h2>
          </div>

          {/* Marquee Container */}
          <div className="relative w-full col-span-20 md:col-span-16 lg:col-span-17 xl:col-span-18 overflow-hidden">
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div 
              ref={marqueeRef}
              className="flex items-center whitespace-nowrap select-none"
            >
              <div className="flex items-center">
                {clientLogos.map((logo, i) => (
                  <div 
                    key={`${logo.name}-${i}`} 
                    className="flex-shrink-0 w-[200px] md:w-[271px] flex justify-center items-center px-4 md:px-8"
                  >
                    <div className="w-20 md:w-24 py-5 relative aspect-[20/9] flex items-center justify-center text-black/90 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500 cursor-pointer">
                      {logo.isSvg && logo.component ? (
                        <div className="w-full h-full">
                          <logo.component />
                        </div>
                      ) : (
                        logo.src && (
                          <div className="w-full h-full relative">
                            <Image
                              src={logo.src}
                              alt={logo.name}
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                        )
                      )}
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
