"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Search, TrendingUp } from "lucide-react";
import { Project } from "./types";

interface ProjectCardProps {
  project: Project;
  onEnter: () => void;
  onLeave: () => void;
  isExternalHover: boolean;
  onInternalHover: (isHovered: boolean) => void;
}

export function ProjectCard({ 
    project, 
    onEnter, 
    onLeave, 
    isExternalHover,
    onInternalHover 
}: ProjectCardProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExternalHover) {
        gsap.to(overlayRef.current, {
            clipPath: "circle(150% at 50% 100%)",
            duration: 0.45,
            ease: "power3.inOut"
        });
    } else {
        gsap.to(overlayRef.current, {
            clipPath: "circle(0% at 50% 100%)",
            duration: 0.45,
            ease: "power3.inOut"
        });
    }
  }, [isExternalHover]);

  const handleMouseEnter = () => {
    onEnter();
    onInternalHover(true);
  };

  const handleMouseLeave = () => {
    onLeave();
    onInternalHover(false);
  };

  const handleTouchStart = () => {
    onEnter();
    onInternalHover(true);
  };

  const handleTouchEnd = () => {
    onLeave();
    setTimeout(() => onInternalHover(false), 2000);
  };

  return (
    <div 
      className="project-card relative group rounded-3xl lg:rounded-[2.5rem] overflow-hidden aspect-[4/3.2] cursor-none block z-10 shrink-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105 pointer-events-none">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* BASE IMAGE LAYER - COMPLETELY CLEAN */}

      {/* Hover Reveal Overlay - No Title (e.g. SIXT) */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 z-40 flex flex-col items-start justify-between p-6 lg:p-14 pointer-events-none"
        style={{ 
          backgroundColor: project.color,
          clipPath: "circle(0% at 50% 100%)"
        }}
      >
        <div className="max-w-[95%]">
          <h3 className="text-[#111212] text-2xl lg:text-4xl xl:text-5xl 4xl:text-6xl font-display font-medium tracking-tight leading-[1.05]">
            {project.description}
          </h3>
        </div>

        <div className="w-full flex items-end justify-end">
           {/* 
                REMOVED Project Title from here as requested.
                Keeping the right-side category badge for visual interest and context.
           */}
           <div className="flex items-center gap-x-3 bg-[#111212]/10 backdrop-blur-sm border border-[#111212]/10 px-4 py-2 lg:px-5 lg:py-2.5 rounded-full text-[#111212] font-medium">
              <Search className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="uppercase tracking-wider text-[8px] lg:text-[10px] font-bold">{project.category}</span>
              <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
