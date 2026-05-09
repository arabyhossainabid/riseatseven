"use client";
import { useEffect } from "react";
import Navigation from "../components/navigation/Navigation";
import AnnouncementBar from "../components/announcement/AnnouncementBar";
import HeroSection from "../components/hero/HeroSection";
import ClientLogos from "../components/client-logos/ClientLogos";
import AgencySection from "../components/agency/AgencySection";
import FeaturedWorkSection from "@/components/featured-work/FeaturedWorkSection";
import ServicesSection from "@/components/services/ServicesSection";

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
        <AgencySection />
        <FeaturedWorkSection />
        <ServicesSection />
      </div>
    </main>
  );
}
