"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NavItem, NavChild, childImages } from "./navigation";

interface MegaMenuProps {
  activeDropdown: string | null;
  displayData: NavItem | null;
  hoveredChild: string | null;
  setHoveredChild: (child: string | null) => void;
  megaMenuRef: React.RefObject<HTMLDivElement | null>;
  megaMenuContentRef: React.RefObject<HTMLDivElement | null>;
}

export function MegaMenu({
  activeDropdown,
  displayData,
  hoveredChild,
  setHoveredChild,
  megaMenuRef,
  megaMenuContentRef,
}: MegaMenuProps) {
  return (
    <div
      ref={megaMenuRef}
      className={`absolute left-1/2 -translate-x-1/2 top-full bg-white rounded-[40px] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.2)] border border-black/5 overflow-hidden z-100 opacity-0 scale-[0.98] origin-top mt-2 ${activeDropdown ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        ref={megaMenuContentRef}
        className="inline-flex items-stretch gap-12 p-6 min-w-max"
      >
        {displayData?.children && (
          <>
            {/* Left Side: Navigation Links */}
            <div className="flex flex-col w-auto justify-center">
              {displayData?.label === "Services" && (
                <span className="text-black/30 text-[0.7rem] font-bold tracking-widest uppercase mb-4 block">
                  Core Services
                </span>
              )}
              <div className={`grid gap-x-12 gap-y-4 ${displayData.singleColumn ? "grid-cols-1" : "grid-cols-2"}`}>
                {displayData.children.map((child: NavChild, idx: number) => (
                  <div
                    key={`${displayData.label}-${child.label}-${idx}`}
                    className="group/child"
                    onMouseEnter={() => setHoveredChild(child.label)}
                    onMouseLeave={() => setHoveredChild(null)}
                  >
                    <Link
                      href={child.href}
                      className="block h-[30px] overflow-hidden pointer-events-auto relative"
                    >
                      <div className="flex flex-col transition-transform duration-300 ease-[0.76,0,0.24,1] group-hover/child:-translate-y-1/2 pointer-events-none">
                        <span className="h-[30px] flex items-center text-[1.5rem] font-medium tracking-tight text-black leading-none whitespace-nowrap">
                          {child.label}
                        </span>
                        <span className="h-[30px] flex items-center text-[1.5rem] font-medium tracking-tight text-black/50 leading-none whitespace-nowrap">
                          {child.label}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Featured Visual - Fixed height to prevent jumps */}
            <div className="w-[300px] h-[200px] relative rounded-3xl overflow-hidden group/image shrink-0 shadow-lg">
              <img
                key={hoveredChild || displayData.label}
                src={hoveredChild && childImages[hoveredChild] ? childImages[hoveredChild] : (displayData.defaultImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80")}
                alt="Featured"
                className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover/image:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
              {displayData?.label === "Services" && (
                <Link
                  href={displayData.href}
                  className="absolute bottom-3 left-3 right-3 w-40 bg-black text-white px-4 py-2 rounded-[24px] hover:rounded-[6px] flex items-center justify-between text-sm font-medium tracking-tight hover:bg-black/90 transition-all duration-200 ease-[0.76,0,0.24,1] shadow-xl"
                >
                  View All Services <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
