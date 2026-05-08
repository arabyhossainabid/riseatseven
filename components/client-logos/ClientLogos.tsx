"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import ScrollTrigger from "gsap/ScrollTrigger";
import { clientLogos } from "./clientLogosData";

gsap.registerPlugin(ScrollTrigger);

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
    const duration = 100; // slow and steady

    const tl = gsap.to([content, clone], {
      xPercent: -100,
      repeat: -1,
      duration: duration,
      ease: "none",
    });

    // No pause on hover as per user request
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="w-full pt-6 xl:pt-12 overflow-hidden bg-white">
      <div className="w-full px-4 md:px-7">
        <div className="grid grid-cols-20 w-full gap-y-4 items-center">
          {/* Heading */}
          <div className="col-span-20 md:col-span-4 lg:col-span-3 xl:col-span-2">
            <h2 className="text-left text-black/80 text-sm font-medium tracking-tight leading-tight">
              The agency behind ...
            </h2>
          </div>

          {/* Marquee Container */}
          <div className="relative w-full col-span-20 md:col-span-16 lg:col-span-17 xl:col-span-18 overflow-hidden">
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

            <div
              ref={marqueeRef}
              className="flex items-center whitespace-nowrap select-none"
            >
              <div className="flex items-center">
                {clientLogos.map((logo, i) => (
                  <div
                    key={`${logo.name}-${i}`}
                    className="shrink-0 w-[200px] md:w-[271px] flex justify-center items-center px-4 md:px-8"
                  >
                    <div className="flex items-center justify-center h-16 md:h-20 w-auto px-4 md:px-6 transition-all duration-500 cursor-pointer group">
                      <div className="h-8 md:h-10 w-auto relative flex items-center justify-center text-black grayscale hover:opacity-100 transition-all duration-300">
                        {logo.isSvg && logo.component ? (
                          <div className="h-full w-auto py-1">
                            <logo.component />
                          </div>
                        ) : (
                          logo.src && (
                            <div className="h-full w-[160px] md:w-[200px] relative">
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
