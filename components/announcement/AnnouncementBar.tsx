"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AnnouncementCurtain } from "./AnnouncementCurtain";
import { AnnouncementPill } from "./AnnouncementPill";

export default function AnnouncementBar() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!curtainRef.current || !textRef.current) return;

    const tl = gsap.timeline();

    gsap.set(curtainRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 90% 100%, 80% 100%, 70% 100%, 60% 100%, 50% 100%, 40% 100%, 30% 100%, 20% 100%, 10% 100%, 0% 100%)",
    });

    gsap.set(textRef.current, { opacity: 0 });

    tl.to(curtainRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 90% -21%, 80% -38%, 70% -50%, 60% -57%, 50% -60%, 40% -57%, 30% -50%, 20% -38%, 10% -21%, 0% 0%)",
      duration: 0.6,
      ease: "power4.inOut",
    })
      .to(
        textRef.current,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .set(curtainRef.current, { display: "none" });

  }, []);

  return (
    <>
      <div className="bg-white w-full py-2 px-4 fixed top-0 left-0 right-0 h-[54px] z-1000 pointer-events-none" />
      <AnnouncementPill textRef={textRef} />
      <AnnouncementCurtain curtainRef={curtainRef} />
    </>
  );
}
