"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}

function AgencyButton({ href, label, variant = "primary" }: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tight capitalize font-sans font-medium overflow-hidden cursor-pointer focus:outline-none text-base px-6 py-3 rounded-full transition-all duration-500 ease-[0.76,0,0.24,1]",
        isPrimary
          ? "bg-white text-black border border-transparent hover:rounded-2xl ring-1 ring-black/5"
          : "bg-transparent text-black"
      )}
    >
      <div className="relative overflow-hidden h-5">
        {/* First Label */}
        <div className="flex items-center gap-x-2 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-6">
          <span className="whitespace-nowrap">{label}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
        {/* Second Label (Absolute) */}
        <div className="absolute top-0 left-0 flex items-center gap-x-2 translate-y-6 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:translate-y-0">
          <span className="whitespace-nowrap">{label}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}

export default function AgencySection() {
  return (
    <section className="w-full py-12 xl:py-24 bg-white">
      <div className="w-full px-4 md:px-7">
        <div className="w-full flex flex-col-reverse md:flex-row justify-between items-start gap-x-5 gap-y-8">

          {/* Left Column (Mobile Buttons & Description) */}
          <div className="w-full flex flex-col gap-y-6">
            {/* Mobile Buttons */}
            <div className="flex flex-wrap gap-4 w-full md:hidden">
              <AgencyButton href="#" label="Our Story" variant="primary" />
              <AgencyButton href="#" label="Our Services" variant="secondary" />
            </div>

            {/* Description Paragraph */}
            <div className="w-full max-w-sm xl:max-w-xl 3xl:max-w-2xl 4xl:max-w-3xl">
              <div className="text-left text-black text-lg md:text-xl xl:text-2xl 4xl:text-3xl font-sans font-medium tracking-tight leading-tight">
                A global team of search-first content marketers engineering semantic relevancy & category signals for both the internet and people
              </div>
            </div>
          </div>

          {/* Right Column (Heading & Desktop Buttons) */}
          <div className="w-full flex flex-col gap-y-7 md:max-w-160 xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-[52rem] 4xl:max-w-5xl">
            <h2 className="flex flex-col text-left text-black text-5xl md:text-6xl xl:text-7xl 3xl:text-[5rem] 4xl:text-8xl font-sans font-medium tracking-tighter leading-[0.9]">
              <div className="flex flex-wrap items-center gap-x-3 md:gap-x-4">
                <span>Driving</span>
                <span>Demand</span>
                <span>&</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 md:gap-x-4">
                <span>Discovery</span>
                <div className="inline-flex shrink-0 bg-black/5 relative overflow-hidden rounded-[15%] w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 mt-2">
                  <Image
                    src="https://rise-atseven.transforms.svdcdn.com/production/images/b2087e0cd3f699d3efc76f809ec72a85a6ab378e-1080x1350.jpg?w=200&h=200&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847630&s=a668733e8ced1733809794da9c15f062"
                    alt="Agency Discovery"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </h2>

            {/* Desktop Buttons */}
            <div className="hidden md:flex flex-wrap gap-4">
              <AgencyButton href="#" label="Our Story" variant="primary" />
              <AgencyButton href="#" label="Our Services" variant="secondary" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
