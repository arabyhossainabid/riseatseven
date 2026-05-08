"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { heroImages } from "./heroData";
import { HeroAwards } from "./HeroAwards";
import { HeroHeadline } from "./HeroHeadline";
import { HeroPlatforms } from "./HeroPlatforms";
import { HeroFooter } from "./HeroFooter";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageSpanRef = useRef<HTMLSpanElement>(null);
  const [currentImage, setCurrentImage] = useState(heroImages[0]);

  useEffect(() => {
    // Rotation logic on mount
    const savedIndex = localStorage.getItem("heroImageIndex");
    const nextIndex = savedIndex ? (parseInt(savedIndex) + 1) % heroImages.length : 1;

    setCurrentImage(heroImages[savedIndex ? parseInt(savedIndex) : 0]);
    localStorage.setItem("heroImageIndex", nextIndex.toString());

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate the Awards Label first
      tl.from(".awards-label", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate Headline words
      tl.from(".headline-word", {
        y: 100,
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.5");

      // Animate Image Span width expansion
      tl.from(imageSpanRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.8,
        ease: "expo.inOut",
      }, "-=0.3");

      // Animate secondary headline
      tl.from(".sub-headline", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.5");

      // Animate Platforms
      tl.from(".platform-logo", {
        opacity: 0,
        y: 20,
        stagger: 0.04,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[95vh] flex flex-col mx-4 mt-0 rounded-4xl overflow-hidden bg-[#1A1A1A]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentImage}
          alt="Background"
          fill
          className="object-cover opacity-50 brightness-100 scale-110 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/5 via-transparent to-black/10" />
      </div>

      {/* Main content */}
      <div className="relative z-10 grow flex flex-col items-center justify-center text-center px-4 pt-32 md:pt-44">
        <HeroAwards />
        <HeroHeadline imageSpanRef={imageSpanRef} currentImage={currentImage} />
        <HeroPlatforms />
      </div>

      <HeroFooter />

      {/* Scroll indicator - absolute positioned relative to section */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
        <div className="w-px h-12 bg-white/30 overflow-hidden">
          <div
            className="w-full h-1/2 bg-white"
            style={{
              animation: "scroll-line 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
