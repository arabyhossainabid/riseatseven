"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnnouncementBar() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!curtainRef.current || !textRef.current) return;

    const tl = gsap.timeline();

    // Initial curtain shape (13 points for smooth rounding)
    gsap.set(curtainRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 90% 100%, 80% 100%, 70% 100%, 60% 100%, 50% 100%, 40% 100%, 30% 100%, 20% 100%, 10% 100%, 0% 100%)",
    });

    gsap.set(textRef.current, { opacity: 0 });

    // Perfectly rounded parabolic reveal (Middle leads UP)
    tl.to(curtainRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 90% -21%, 80% -38%, 70% -50%, 60% -57%, 50% -60%, 40% -57%, 30% -50%, 20% -38%, 10% -21%, 0% 0%)",
      duration: 1.6,
      ease: "power4.inOut",
    })
      .to(
        textRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.9"
      )
      .set(curtainRef.current, { display: "none" });

  }, []);

  return (
    <div className="bg-white w-full py-2 px-4 relative h-[54px] overflow-visible border-none outline-none">
      {/* The REAL bar - static, perfectly still, never moves or changes props */}
      <div className="w-full mx-auto flex justify-center">
        <div className="bg-[#B2F6E3] w-full h-[38px] rounded-full px-6 flex items-center justify-center">
          <div ref={textRef} className="h-[20px] overflow-hidden group cursor-pointer">
            <div className="flex flex-col transition-transform duration-200 ease-[0.76,0,0.24,1] group-hover:-translate-y-1/2">
              {/* First State */}
              <div className="flex items-center gap-2 h-[20px] whitespace-nowrap">
                <span className="text-base">🚨</span>
                <span className="text-[0.7rem] font-bold tracking-tight text-black uppercase">
                  THE CATEGORY LEADERBOARD — LIVE NOW
                </span>
              </div>
              {/* Hover State (Identical) */}
              <div className="flex items-center gap-2 h-[20px] whitespace-nowrap">
                <span className="text-base">🚨</span>
                <span className="text-[0.7rem] font-bold tracking-tight text-black uppercase">
                  THE CATEGORY LEADERBOARD — LIVE NOW
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The CURTAIN - Full-screen overlay that slides up to reveal the bar */}
      <div
        ref={curtainRef}
        className="fixed inset-0 bg-[#B2F6E3] z-9999 pointer-events-none"
      />
    </div>
  );
}
