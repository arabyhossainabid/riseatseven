"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "expo.inOut",
          onComplete,
        });
      },
    });

    // Count up
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setCount(current);
    }, 80);

    tl.to(barRef.current, { scaleX: 1, duration: 1.2, ease: "expo.out" }, 0);
    tl.to(textRef.current, { opacity: 0, duration: 0.3 }, 1.3);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center"
    >
      <div ref={textRef} className="text-center">
        <div className="text-[0.65rem] tracking-[0.3em] uppercase text-white/40 mb-8">
          Rise at Seven
        </div>
        <div className="text-[5rem] font-black tracking-tightest leading-none text-white">
          {count}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px]">
        <div
          ref={barRef}
          className="h-full bg-white"
          style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        />
      </div>
    </div>
  );
}
