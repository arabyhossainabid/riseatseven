"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navItems } from "./navigation";
import { Logo } from "../Logo";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  expandedCategory: string | null;
  setExpandedCategory: (category: string | null) => void;
  mobileLinksRef: React.RefObject<HTMLDivElement | null>;
}

export function MobileMenu({
  menuOpen,
  setMenuOpen,
  expandedCategory,
  setExpandedCategory,
  mobileLinksRef,
}: MobileMenuProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/70 backdrop-blur-xl z-100 flex flex-col justify-between transition-all duration-500 ease-[0.76,0,0.24,1] will-change-transform will-change-opacity transform-gpu",
        menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      <div className="flex items-center justify-between px-6 h-20 absolute top-0 left-0 right-0">
        <Logo className="h-5 w-auto fill-white" />

        <button
          onClick={() => setMenuOpen(false)}
          className="w-10 h-10 flex items-center justify-center text-white"
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="pt-24 h-full flex flex-col px-6 overflow-y-auto" ref={mobileLinksRef}>
        <div className="flex flex-col mb-12">
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-white/10 mobile-link">
              <button
                onClick={() => setExpandedCategory(expandedCategory === item.label ? null : item.label)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-[2.2rem] font-bold text-white tracking-tight leading-none">
                  {item.label}
                </span>
                {item.children && (
                  <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${expandedCategory === item.label ? "rotate-180" : ""}`}>
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </button>

              {item.children && (
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[0.76,0,0.24,1] ${expandedCategory === item.label ? "max-h-[600px] pb-6" : "max-h-0"}`}
                >
                  <div className="flex flex-col gap-4">
                    {item.children.map((child, idx) => (
                      <Link
                        key={`${child.label}-${idx}`}
                        href={child.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-lg font-medium text-white/60 hover:text-white transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mobile-link mt-auto pb-12">
          <Link
            href="/connect"
            onClick={() => setMenuOpen(false)}
            className="w-full h-16 bg-white text-black rounded-full flex items-center justify-center text-lg font-bold shadow-xl active:scale-[0.98] transition-transform gap-2"
          >
            Get In Touch <ArrowUpRight className="w-5 h-5" />
          </Link>

          <div className="flex gap-6 justify-center mt-8">
            {['Instagram', 'LinkedIn', 'Twitter'].map(social => (
              <a key={social} href="#" className="text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">{social}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
