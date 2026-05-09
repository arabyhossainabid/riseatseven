"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { marqueeItems } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Infinite Marquee Animation
    const tl = gsap.to(container, {
      xPercent: -50, // Move exactly half its width
      ease: "none",
      duration: 150,  // Ultra slow base speed
      repeat: -1,
    });

    let timeoutId: any;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self: any) => {
        const velocity = self.getVelocity();

        // Make it more sensitive to scroll direction so it actively speeds up / reverses
        let targetTimeScale = 1 + velocity / 400;

        // Allow it to go noticeably backwards (-4x) or faster forwards (5x)
        targetTimeScale = Math.min(Math.max(targetTimeScale, -4), 5);

        // Animate the timeline's timeScale smoothly
        gsap.to(tl, {
          timeScale: targetTimeScale,
          duration: 0.4, // React somewhat quickly to the scroll
          ease: "power2.out",
          overwrite: true,
        });

        // Reset to normal speed very smoothly after scrolling stops
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          gsap.to(tl, {
            timeScale: 1,
            duration: 2.0, // Smoothly glide back to normal over 2 seconds
            ease: "power3.out",
            overwrite: true,
          });
        }, 150);
      },
    });

    // Custom Cursor Logic
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });

    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");

    const moveCursor = (e: MouseEvent) => {
      xSetter(e.clientX);
      ySetter(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      clearTimeout(timeoutId);
    };
  }, { scope: sectionRef });

  const showCursor = () => {
    gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: "power3.out" });
  };

  const hideCursor = () => {
    gsap.to(cursorRef.current, { scale: 0, duration: 0.3, ease: "power3.in" });
  };

  // We repeat the base items multiple times to ensure the block is wider than the screen
  const repeatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section
      ref={sectionRef}
      className="w-full py-0 overflow-hidden relative cursor-none"
      onMouseEnter={showCursor}
      onMouseLeave={hideCursor}
    >
      <Link href="https://riseatseven.com/contact/" className="block w-full relative z-10">
        <div className="w-full relative z-0 overflow-hidden">
          <div ref={containerRef} className="flex shrink-0 w-fit">

            {/* FIRST COPY */}
            <div className="flex shrink-0 items-center">
              {repeatedItems.map((item, i) => (
                <div key={`copy1-${i}`} className="shrink-0 flex items-center gap-x-4 px-2 pb-3 lg:pt-5 lg:pb-10 lg:gap-x-10 lg:px-5">
                  <h2 className="inline-flex flex-wrap text-balance relative text-left justify-start text-black text-[4rem] leading-[0.9] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[12vw] font-sans font-medium tracking-tight lg:pb-10 whitespace-nowrap">
                    {item.text}
                  </h2>
                  <div className="shrink-0 rounded-2xl overflow-hidden w-[25vw] md:w-[15vw] lg:mb-10 lg:rounded-3xl lg:w-[12vw] relative aspect-square">
                    <Image
                      src={item.image}
                      alt={item.text}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* SECOND COPY (Identical to First) */}
            <div className="flex shrink-0 items-center">
              {repeatedItems.map((item, i) => (
                <div key={`copy2-${i}`} className="shrink-0 flex items-center gap-x-4 px-2 pb-3 lg:pt-5 lg:pb-10 lg:gap-x-10 lg:px-5">
                  <h2 className="inline-flex flex-wrap text-balance relative text-left justify-start text-black text-[4rem] leading-[0.9] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[12vw] font-sans font-medium tracking-tight lg:pb-10 whitespace-nowrap">
                    {item.text}
                  </h2>
                  <div className="shrink-0 rounded-2xl overflow-hidden w-[25vw] md:w-[15vw] lg:mb-10 lg:rounded-3xl lg:w-[12vw] relative aspect-square">
                    <Image
                      src={item.image}
                      alt={item.text}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </Link>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 bg-[#c4fdf5] rounded-full z-999999 pointer-events-none flex items-center justify-center shadow-lg overflow-hidden h-[40px] px-5 lg:h-[46px] lg:px-6"
      >
        <div className="flex items-center gap-2 text-black text-xs lg:text-sm font-medium whitespace-nowrap uppercase tracking-tight">
          Send Us Your Brief
          <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4" />
        </div>
      </div>
    </section>
  );
}
