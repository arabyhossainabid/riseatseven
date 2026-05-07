"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";

const platforms = [
  { name: "Google", logo: "https://rise-atseven.transforms.svdcdn.com/production/images/Placeholder-logos/gogle.png?w=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847622&s=a7382d4409915b1abb45c9bb1a46ecb5" },
  { name: "ChatGPT", logo: "https://rise-atseven.transforms.svdcdn.com/production/images/Placeholder-logos/chat-gpt.png?w=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847621&s=6b6ab14958d6b993c66099365de714a9" },
  { name: "Gemini", logo: "https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Social/White/gemini.png?w=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847619&s=d95fa8ba08c60d6d2ef595327d306f79" },
  { name: "TikTok", logo: "https://rise-atseven.transforms.svdcdn.com/production/images/Placeholder-logos/tiktok.png?w=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847623&s=f086fb6557612f99edef10aa79347c0b" },
  { name: "YouTube", logo: "https://rise-atseven.transforms.svdcdn.com/production/images/Placeholder-logos/youtube.png?w=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847623&s=c70bddea4b620693075bdd9e26e6abbc" },
  { name: "Pinterest", logo: "https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Social/White/pinterest.png?w=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847620&s=690b1cfec72e348875ac88b154038727" },
  { name: "GIPHY", logo: "https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Social/White/giphy.png?w=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847619&s=8e9f230dcd3f43c84fd153d7446f3404" },
  { name: "reddit", logo: "https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Social/White/reddit.png?w=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847620&s=d811bdc0b0ffd3534694e19e0b32ca2e" },
  { name: "amazon", logo: "https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Social/White/amazon.png?w=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847619&s=b89cbede6552cbbce6327b02957d8fbb" },
];

const heroImages = [
  "/images/Emirates-airpline-in-flight.avif",
  "/images/RedBull-Instagram-Post-45.png",
  "https://rise-atseven.transforms.svdcdn.com/production/images/spaseekers.png?w=654&h=654&q=100&auto=format&fit=crop&dm=1750847719&s=7878b323cf448fba3f57e5ecbcef8ed1",
  "https://rise-atseven.transforms.svdcdn.com/production/images/unnamed-6.png?w=213&h=278&q=100&auto=format&fit=crop&dm=1750948726&s=0ecee9869674cd309d3170dfd7b29674",
  "https://rise-atseven.transforms.svdcdn.com/production/images/Pooky-Rechargable-Doorstop-Cordless-100-Straight-Empire-Pendant-Silk-Ikat-Shade-in-Black-and-Cream-Atlas-44-Single-chukka-Cordless-95-scaled-1-1.jpg?w=2560&h=1707&q=100&auto=format&fit=crop&dm=1750847623&s=2e6f5684a2dcbdbd148a651a17aafe47",
  "https://rise-atseven.transforms.svdcdn.com/production/images/RedBull-Instagram-Post-45.png?w=1890&h=2363&q=100&auto=format&fit=crop&dm=1753775231&s=60dc0e3c84825da30f8d809caf5fabe1",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
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
          className="object-cover opacity-30 brightness-100 blur-[2px] scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* Awards Label */}
        <div className="awards-label flex flex-col items-center gap-4 mb-12">
          <div className="flex items-center gap-x-4 opacity-80">
            <div className="w-12 h-6 relative">
              <Image
                src="https://rise-atseven.transforms.svdcdn.com/production/images/Placeholder-logos/global-search-awards.png?w=400&q=80&fm=webp"
                alt="Global Search Awards"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-12 h-6 relative">
              <Image
                src="https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Awards/White/UKSocial-Media-Awards-White.png?w=400&q=80&fm=webp"
                alt="UK Social Media Awards"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-12 h-6 relative">
              <Image
                src="https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Awards/White/UK-Content-Awards-White.png?w=400&q=80&fm=webp"
                alt="UK Content Awards"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-white font-bold tracking-widest text-[10px] uppercase opacity-60">Global Agency of the Year 2024</p>
        </div>

        {/* Main headline */}
        <h1
          ref={headlineRef}
          className="flex flex-col items-center leading-[0.85] tracking-[-0.04em] font-black text-white mb-10"
        >
          <div className="overflow-hidden">
            <span className="headline-word block text-[clamp(3.5rem,14vw,11rem)]">We Create</span>
          </div>
          <div className="overflow-hidden flex items-center gap-[0.05em] flex-wrap justify-center mt-[-0.1em]">
            <span className="headline-word text-[clamp(3.5rem,14vw,11rem)]">Category</span>
            <span
              ref={imageSpanRef}
              className="relative inline-block w-[1.1em] h-[0.7em] mx-[0.1em] rounded-[0.2em] overflow-hidden align-middle bg-white/10"
            >
              <Image
                src={currentImage}
                alt="Headline Category"
                fill
                className="object-cover"
              />
            </span>
            <span className="headline-word text-[clamp(3.5rem,14vw,11rem)]">Leaders</span>
          </div>
        </h1>

        <p className="sub-headline text-white/70 text-[clamp(1.1rem,2.5vw,1.8rem)] font-medium max-w-3xl leading-tight tracking-tight mt-4">
          on every searchable platform
        </p>

        {/* Platforms */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12 gap-y-6 mt-16 max-w-5xl opacity-40 hover:opacity-100 transition-opacity duration-500">
          {platforms.map((p) => (
            <div key={p.name} className="platform-logo w-12 h-6 md:w-16 md:h-8 relative">
              <Image
                src={p.logo}
                alt={p.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Footer */}
      <div className="relative z-10 w-full px-10 pb-12 flex justify-between items-end">
        <div className="max-w-md">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
            Organic media planners creating, distributing & <br />
            optimising <span className="text-white">search-first</span> content for SEO, Social, <br />
            PR, Ai and LLM search
          </p>
        </div>
        <div className="text-right">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
            4 Global Offices serving <br />
            <span className="text-white">UK, USA (New York) & EU</span>
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
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
    </section>
  );
}

      <style jsx>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
