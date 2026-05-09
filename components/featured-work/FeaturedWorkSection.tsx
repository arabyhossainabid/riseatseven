"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "./data";
import { ProjectCard } from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeProjectId, setActiveProjectId] = useState<number>(projects[0].id);
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);

  useGSAP(() => {
    // DESKTOP ONLY ANIMATION
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const pinContent = pinContentRef.current;
      const rightColumn = rightColumnRef.current;
      const headings = headingsRef.current;
      
      if (!pinContent || !rightColumn || !headings) return;

      const textItems = Array.from(headings.children) as HTMLElement[];
      const firstText = textItems[0];
      const lastText = textItems[textItems.length - 1];
      const maxTextScroll = lastText.offsetTop - firstText.offsetTop;

      const imageItems = Array.from(rightColumn.children) as HTMLElement[];
      const firstImage = imageItems[0];
      const lastImage = imageItems[imageItems.length - 1]; 
      const maxImageScroll = lastImage.offsetTop - firstImage.offsetTop;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContent,
          start: "top top",
          end: `+=${projects.length * 900}`, 
          pin: true,
          scrub: 0.1, 
          onUpdate: (self: any) => {
            const index = Math.min(
              Math.floor(self.progress * projects.length),
              projects.length - 1
            );
            setActiveProjectId(projects[index].id);
          }
        }
      });

      tl.to(headings, { y: -maxTextScroll, ease: "none" }, 0);
      tl.to(rightColumn, { y: -maxImageScroll, ease: "none" }, 0);
    });

    // CUSTOM CURSOR
    const cursor = cursorRef.current;
    if (!cursor) return;
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });
    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");
    const moveCursor = (e: MouseEvent) => {
      xSetter(e.clientX);
      ySetter(e.clientY);
    };
    const moveTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        xSetter(e.touches[0].clientX);
        ySetter(e.touches[0].clientY);
      }
    };
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("touchmove", moveTouch);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("touchmove", moveTouch);
    };
  }, { scope: containerRef });

  const showCustomCursor = () => {
    gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: "power3.out" });
  };

  const hideCustomCursor = () => {
    gsap.to(cursorRef.current, { scale: 0, duration: 0.3, ease: "power3.in" });
  };

  return (
    <section ref={containerRef} className="w-full bg-white relative pb-10">
      
      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-20 h-20 lg:w-24 lg:h-24 bg-[#c4fdf5] rounded-full z-999999 pointer-events-none flex items-center justify-center shadow-2xl overflow-hidden"
      >
        <ArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8 text-black" />
      </div>

      {/* DESKTOP VIEW (LG+) */}
      <div className="hidden lg:block">
        <div ref={pinContentRef} className="w-full h-[90vh] px-4 md:px-7 py-5 overflow-hidden">
          <div className="w-full h-full bg-[#111212] rounded-[3rem] grid grid-cols-12 relative overflow-hidden">
            
            <div className="col-span-7 pl-16 pr-8 flex flex-col pt-20 pb-16 relative z-30">
              <h2 className="text-white text-lg font-display font-medium tracking-tight mb-24 opacity-100 uppercase">
                Featured Work
              </h2>
              <div className="relative flex-1 w-full overflow-hidden">
                <div ref={headingsRef} className="relative z-10 pt-[35vh] pb-[35vh]">
                  {projects.map((project) => (
                    <div 
                      key={project.id}
                      className={cn(
                        "transition-all duration-700 py-6 max-w-[850px]", 
                        activeProjectId === project.id ? "opacity-100 translate-x-4 scale-105" : "opacity-40 translate-x-0 scale-100"
                      )}
                      onMouseEnter={() => setHoveredProjectId(project.id)}
                      onMouseLeave={() => setHoveredProjectId(null)}
                    >
                      <div className="flex items-start gap-x-4 group cursor-default">
                        <div className={cn(
                          "font-display font-medium tracking-tighter leading-[0.8] whitespace-normal text-6xl xl:text-7xl transition-colors duration-500",
                          activeProjectId === project.id ? "text-white" : "text-white/40"
                        )}>
                          {project.title}
                        </div>
                        <div className={cn(
                          "text-white text-xs font-medium mt-4 transition-all duration-500",
                          activeProjectId === project.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        )}>
                          [{project.year}]
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-5 col-start-8 py-24 relative z-10 pr-16 h-full overflow-hidden">
               <div 
                  ref={rightColumnRef} 
                  className="flex flex-col gap-y-32 w-full pt-[35vh] pb-[35vh]"
               >
                {projects.map((project) => (
                  <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onEnter={showCustomCursor}
                      onLeave={hideCustomCursor}
                      isExternalHover={hoveredProjectId === project.id}
                      onInternalHover={(isHovered) => setHoveredProjectId(isHovered ? project.id : null)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW (<LG) */}
      <div className="lg:hidden px-4 md:px-7 py-5">
        <div className="w-full bg-[#111212] rounded-3xl p-5 flex flex-col gap-y-8">
            <h2 className="text-white text-xs font-display font-medium tracking-widest opacity-60 uppercase mb-2">
                Featured Work
            </h2>
            <div className="flex flex-col gap-y-6">
                {projects.map((project) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        onEnter={showCustomCursor}
                        onLeave={hideCustomCursor}
                        isExternalHover={hoveredProjectId === project.id}
                        onInternalHover={(isHovered) => setHoveredProjectId(isHovered ? project.id : null)}
                    />
                ))}
            </div>
        </div>
      </div>

      {/* 
        EXPLORE BUTTON: Soft glow shadow from all 4 sides
      */}
      <div className="w-full flex justify-center mt-8 lg:mt-12 px-4">
          <button 
            className="h-[42px] overflow-hidden rounded-[21px] hover:rounded-[6px] bg-white text-black border border-black/5 transition-all duration-300 ease-[0.76,0,0.24,1] group/cta shadow-[0_0_35px_rgba(0,0,0,0.08)] hover:shadow-[0_0_50px_rgba(0,0,0,0.12)]"
          >
            <div className="flex flex-col transition-transform duration-200 ease-[0.76,0,0.24,1] group-hover/cta:-translate-y-1/2">
                <div className="flex items-center justify-center px-8 h-[42px] text-[0.9rem] lg:text-[1rem] font-display font-medium whitespace-nowrap gap-3 uppercase tracking-tight">
                    Explore Our Work <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-center px-8 h-[42px] text-[0.9rem] lg:text-[1rem] font-display font-medium whitespace-nowrap gap-3 uppercase tracking-tight">
                    Explore Our Work <ArrowUpRight className="w-4 h-4" />
                </div>
            </div>
          </button>
      </div>

      <div className="w-full h-10 lg:h-20 bg-white" />
    </section>
  );
}
