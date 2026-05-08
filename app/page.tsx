"use client";
import { useEffect } from "react";
import Navigation from "@/components/navigation/Navigation";
import AnnouncementBar from "@/components/announcement/AnnouncementBar";
import HeroSection from "@/components/hero/HeroSection";
import ClientLogos from "@/components/ClientLogos";
import ServicesSection from "@/components/ServicesSection";
import FeaturedWork from "@/components/FeaturedWork";
import MissionStatement from "@/components/MissionStatement";
import NewsSection from "@/components/NewsSection";
import LegacySection from "@/components/LegacySection";
import CTAMarquee from "@/components/CTAMarquee";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="bg-white text-black min-h-screen">
      <div className="noise" aria-hidden />

      <AnnouncementBar />
      <Navigation />

      <div className="h-[54px]" />

      <HeroSection />

      <div className="relative z-10 bg-white">
        <ClientLogos />
        <MissionStatement />
        <FeaturedWork />
        <ServicesSection />
        <LegacySection />
        <CTAMarquee />
        <NewsSection />
        <Footer />
      </div>
    </main>
  );
}
