"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";

const Loader = dynamic(() => import("@/components/Loader"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function Home() {
  useEffect(() => {
    // Smooth scroll to top on refresh
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="bg-white text-black">
      <div className="noise" aria-hidden />
      <CustomCursor />
      <div className="opacity-100">
        <header className="relative z-100">
          <AnnouncementBar />
        </header>
        <Navigation />
        <HeroSection />
      </div>
    </main>
  );
}
