"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Plus, ArrowUpRight } from "lucide-react";
import { navItems, NavItem, NavChild } from "./navigation";
import { Logo } from "../Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [hoveredChild, setHoveredChild] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuContentRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const lastActiveDataRef = useRef<NavItem | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredLabel(null);
    }, 100);
  };

  const cancelClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  useEffect(() => {
    if (!activeDropdown) return;

    const handleMouseMove = (e: MouseEvent) => {
      const navElement = navContainerRef.current;
      const menuElement = megaMenuRef.current;
      if (!navElement || !menuElement) return;

      const navRect = navElement.getBoundingClientRect();
      const menuRect = menuElement.getBoundingClientRect();

      const buffer = 20;
      const isInNav = e.clientX >= navRect.left - buffer && e.clientX <= navRect.right + buffer &&
        e.clientY >= navRect.top - buffer && e.clientY <= navRect.bottom;

      const isInMenu = e.clientX >= menuRect.left && e.clientX <= menuRect.right &&
        e.clientY >= menuRect.top && e.clientY <= menuRect.bottom;

      const isInGap = e.clientY >= navRect.bottom && e.clientY <= menuRect.top &&
        e.clientX >= Math.min(navRect.left, menuRect.left) &&
        e.clientX <= Math.max(navRect.right, menuRect.right);

      if (isInNav || isInMenu || isInGap) {
        cancelClose();
      } else {
        scheduleClose();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [activeDropdown]);

  useEffect(() => {
    if (hoveredLabel && hoverPillRef.current) {
      const activeItem = navContainerRef.current?.querySelector(`[data-label="${hoveredLabel}"]`);
      if (activeItem) {
        const { offsetLeft, offsetWidth } = activeItem as HTMLElement;
        gsap.to(hoverPillRef.current, {
          x: offsetLeft,
          width: offsetWidth,
          opacity: 1,
          duration: 0.15,
          ease: "power2.out",
        });
      }
    } else {
      gsap.to(hoverPillRef.current, {
        opacity: 0,
        duration: 0.1,
      });
    }
  }, [hoveredLabel]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;
      setScrolled(currentScrollY > 50);

      if (currentScrollY <= 0) {
        setVisible(true);
      } else if (scrollDiff > 0 && currentScrollY > 150) {
        setVisible(false);
      } else if (scrollDiff < -10) {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (activeDropdown && megaMenuRef.current && megaMenuContentRef.current) {
      const frame = requestAnimationFrame(() => {
        if (!megaMenuRef.current || !megaMenuContentRef.current) return;
        const content = megaMenuContentRef.current;
        gsap.to(megaMenuRef.current, {
          width: content.offsetWidth,
          height: content.offsetHeight,
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.25,
          ease: "expo.out",
          overwrite: true,
        });
      });
      return () => cancelAnimationFrame(frame);
    } else if (megaMenuRef.current) {
      gsap.to(megaMenuRef.current, {
        opacity: 0,
        y: 4,
        scale: 0.99,
        duration: 0.15,
        ease: "power2.inOut",
      });
    }
  }, [activeDropdown]);

  useEffect(() => {
    if (menuOpen && mobileLinksRef.current) {
      const links = mobileLinksRef.current.querySelectorAll(".mobile-link");
      gsap.fromTo(links,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power4.out", delay: 0.1 }
      );
    }
  }, [menuOpen]);

  const activeItemData = navItems.find((i) => i.label === activeDropdown) || null;
  if (activeItemData) lastActiveDataRef.current = activeItemData;
  const displayData = activeDropdown ? activeItemData : lastActiveDataRef.current;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/5 backdrop-blur-xl z-2500 transition-opacity duration-300 pointer-events-none hidden md:block",
          activeDropdown ? "opacity-100" : "opacity-0"
        )}
      />

      <nav
        style={{ top: scrolled ? "20px" : "54px" }}
        className={cn(
          "fixed left-0 right-0 z-3000 transition-all duration-300 ease-[0.76,0,0.24,1]",
          scrolled
            ? "mx-6 rounded-full border border-white/20 bg-white/60 backdrop-blur-3xl py-0 shadow-2xl"
            : "w-full bg-transparent py-4",
          visible ? "translate-y-0" : "translate-y-[-150%]"
        )}
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-20">
          <Link
            href="/"
            className={`z-10 transition-colors duration-300 ${scrolled ? "text-black" : "text-white"}`}
          >
            <Logo className="h-5 w-auto fill-current" />
          </Link>

          {/* Desktop Nav */}
          <div
            ref={navContainerRef}
            className="hidden md:flex items-center gap-0.5 lg:gap-1 px-1 relative h-full"
            onMouseLeave={scheduleClose}
          >
            <div
              ref={hoverPillRef}
              className="absolute h-[34px] bg-white rounded-full opacity-0 pointer-events-none z-0 shadow-sm transition-opacity duration-150 top-1/2 -translate-y-1/2"
            />

            {navItems.map((item) => (
              <div
                key={item.label}
                data-label={item.label}
                className="relative z-10"
                onMouseEnter={() => {
                  cancelClose();
                  setHoveredLabel(item.label);
                  if (item.children) {
                    setActiveDropdown(item.label);
                  } else {
                    setActiveDropdown(null);
                  }
                }}
                onMouseLeave={scheduleClose}
              >
                {item.label === "Work" && (
                  <span className="absolute -top-2 -right-1 bg-[#B2F6E3] text-black text-[8px] px-1.5 py-0.5 rounded-full font-medium z-20 shadow-sm whitespace-nowrap">
                    3K
                  </span>
                )}
                <Link
                  href={item.href}
                  className={cn(
                    "px-2 lg:px-4 py-2 text-sm lg:text-base font-medium transition-colors duration-300 h-[34px] flex items-center rounded-full relative z-10",
                    scrolled ? "text-black" : "text-white",
                    hoveredLabel === item.label && "text-black!"
                  )}
                >
                  {item.label}
                  {(item.label === "Services" || item.label === "Industries" || item.label === "International" || item.label === "About" || item.label === "Blog & Resources") && (
                    <Plus className="w-2.5 h-2.5 opacity-60 ml-0.5 lg:ml-1" />
                  )}
                </Link>
              </div>
            ))}

            <MegaMenu
              activeDropdown={activeDropdown}
              displayData={displayData}
              hoveredChild={hoveredChild}
              setHoveredChild={setHoveredChild}
              megaMenuRef={megaMenuRef}
              megaMenuContentRef={megaMenuContentRef}
            />
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/connect"
              className={cn(
                "nav-item hidden md:block h-[42px] overflow-hidden rounded-[21px] hover:rounded-[6px] transition-all duration-300 ease-[0.76,0,0.24,1] group/cta shadow-sm",
                scrolled ? "text-white bg-black" : "text-black bg-white"
              )}
            >
              <div className="flex flex-col transition-transform duration-300 ease-[0.76,0,0.24,1] group-hover/cta:-translate-y-1/2">
                <div className="flex items-center justify-center px-4 lg:px-6 h-[42px] text-[0.9rem] lg:text-[1.1rem] font-medium whitespace-nowrap gap-2">
                  Get In Touch <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-center px-4 lg:px-6 h-[42px] text-[0.9rem] lg:text-[1.1rem] font-medium whitespace-nowrap gap-2">
                  Get In Touch <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                if (!menuOpen) setExpandedCategory(null);
              }}
              className="md:hidden flex flex-col gap-1.5 p-1 relative z-110 transform-gpu"
              aria-label="Menu"
            >
              <span className={cn("block w-6 h-px transition-all duration-300 transform-gpu", (scrolled || menuOpen) ? "bg-black" : "bg-white", menuOpen && "rotate-45 translate-y-[7px]")} />
              <span className={cn("block w-6 h-px transition-all duration-300 transform-gpu", (scrolled || menuOpen) ? "bg-black" : "bg-white", menuOpen && "opacity-0")} />
              <span className={cn("block w-6 h-px transition-all duration-300 transform-gpu", (scrolled || menuOpen) ? "bg-black" : "bg-white", menuOpen && "-rotate-45 translate-y-[-7px]")} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        expandedCategory={expandedCategory}
        setExpandedCategory={setExpandedCategory}
        mobileLinksRef={mobileLinksRef}
      />
    </>
  );
}
