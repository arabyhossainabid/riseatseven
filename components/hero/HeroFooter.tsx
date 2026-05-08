"use client";

export function HeroFooter() {
  return (
    <div className="relative z-10 w-full px-5 md:px-10 pb-8 md:pb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-0">
      <div className="max-w-full text-center md:text-left">
        <p className="text-white/70 text-[10px] md:text-sm font-medium leading-relaxed uppercase tracking-wider">
          Organic media planners creating, distributing & optimising <br className="hidden md:block" />
          <span className="font-bold text-white">search-first</span> content for SEO, Social, PR, Ai and LLM search
        </p>
      </div>
      <div className="text-center md:text-right">
        <p className="text-white/70 text-[10px] md:text-sm font-medium leading-relaxed uppercase tracking-wider">
          4 Global Offices serving <br className="hidden md:block" />
          <span className="font-bold text-white uppercase">UK, USA (New York) & EU</span>
        </p>
      </div>
    </div>
  );
}
