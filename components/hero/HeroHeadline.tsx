"use client";
import Image from "next/image";

interface HeroHeadlineProps {
  imageSpanRef: React.RefObject<HTMLSpanElement | null>;
  currentImage: string;
}

export function HeroHeadline({ imageSpanRef, currentImage }: HeroHeadlineProps) {
  return (
    <div className="mb-8 md:mb-12 overflow-hidden">
      <h1 className="text-[2.25rem] sm:text-[4rem] md:text-[7rem] lg:text-[9rem] font-black tracking-tightest leading-[0.9] md:leading-[0.85] text-white flex flex-col items-center">
        <span className="flex items-center gap-x-3 md:gap-x-6">
          <span className="headline-word inline-block">We</span>
          <span className="headline-word inline-block">Create</span>
        </span>
        <span className="flex items-center gap-x-3 md:gap-x-6">
          <span className="headline-word inline-block">Category</span>
          <span ref={imageSpanRef} className="inline-block w-14 h-8 sm:w-24 sm:h-14 md:w-32 md:h-20 bg-white/10 rounded-xl md:rounded-2xl overflow-hidden relative translate-y-1 md:translate-y-2">
            <Image src={currentImage} alt="Small" fill className="object-cover" />
          </span>
          <span className="headline-word inline-block">Leaders</span>
        </span>
      </h1>
      <p className="sub-headline text-[0.9rem] sm:text-[1.1rem] md:text-[1.5rem] font-medium text-white/90 mt-6 md:mt-8 px-4">
        on every searchable platform
      </p>
    </div>
  );
}
