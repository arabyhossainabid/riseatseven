"use client";
import Image from "next/image";
import { platforms } from "./heroData";

export function HeroPlatforms() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-12 gap-y-4 md:gap-y-6 mt-8 md:mt-12 max-w-4xl">
      {platforms.map((p) => (
        <div key={p.name} className="platform-logo w-12 h-6 md:w-16 md:h-8 relative opacity-50 hover:opacity-100 transition-opacity">
          <Image
            src={p.logo}
            alt={p.name}
            fill
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}
