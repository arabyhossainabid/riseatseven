"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { services } from "./data";
import { MoveUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          width: 0,
          opacity: 0,
          marginRight: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full pb-12 xl:pb-24 bg-white relative z-20">
      <div className="w-full px-4 md:px-7">
        <div className="grid grid-cols-12 overflow-hidden lg:pt-5 gap-y-3 md:gap-y-7 gap-x-3 md:gap-x-5">

          {/* Header */}
          <div className="col-span-12">
            <div className="grid grid-cols-12 md:border-b md:border-gray-200 md:pb-5 gap-y-3 md:gap-y-7 gap-x-3 md:gap-x-5">
              <div className="col-span-11 md:col-span-9 flex items-end">
                <h2 className="inline-flex flex-wrap text-balance relative flex-col text-left justify-start text-black text-[3.5rem] leading-[0.9] md:text-7xl lg:text-7xl 2xl:text-8xl font-sans font-medium tracking-tight">
                  <div className="flex flex-wrap items-center">
                    <span className="mr-3 md:mr-4">Our</span>
                    <div ref={imageRef} className="inline-flex shrink-0 bg-black/5 relative overflow-hidden rounded-[15%] w-16 h-16 md:w-20 md:h-20 lg:w-[90px] lg:h-[90px] mr-3 md:mr-4">
                      <Image
                        src="https://rise-atseven.transforms.svdcdn.com/production/images/IMG_5079.JPG?w=200&h=200&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750944462&s=5eb651d549739cde26429958911743ea"
                        alt="Our Services"
                        fill
                        className="object-cover object-center"
                        unoptimized
                      />
                    </div>
                    <span>Services</span>
                  </div>
                </h2>
              </div>

              {/* Desktop Button */}
              <div className="col-span-12 md:col-span-3 md:items-center md:justify-end hidden md:flex">
                <Link
                  href="/services"
                  className="group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tight capitalize font-sans font-medium overflow-hidden border border-black/5 cursor-pointer focus:outline-none md:w-auto text-sm px-6 py-3 rounded-full transition-all hover:rounded-xl bg-white text-black shadow-sm hover:shadow-md flex-row-reverse"
                >
                  <div className="relative overflow-hidden h-[20px]">
                    <div className="flex flex-col transition-transform duration-300 ease-[0.76,0,0.24,1] group-hover:-translate-y-1/2">
                      <div className="flex items-center gap-x-1.5 h-[20px]">
                        <span>View All Services</span>
                        <MoveUpRight className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex items-center gap-x-1.5 h-[20px]">
                        <span>View All Services</span>
                        <MoveUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="col-span-12 grid grid-cols-12 gap-x-2 md:gap-x-5 lg:gap-x-10 mt-2 md:mt-0">
            {services.map((service, index) => (
              <div key={index} className="col-span-12 md:col-span-6 relative">
                <div className="group relative">

                  {/* Bottom Border */}
                  <div className="absolute w-full bottom-0 left-0 z-0">
                    <div className="w-full h-px bg-gray-200"></div>
                  </div>

                  <Link href={service.href} className="grid grid-cols-1 relative z-10 w-full">

                    {/* Foreground Content */}
                    <div className="col-start-1 row-start-1 relative z-20 py-5 lg:py-8 flex items-center gap-3 text-black transition-colors duration-500 group-hover:text-white pl-2 lg:pl-4">

                      {/* Mobile Thumbnail */}
                      <div className="inline-flex relative w-12 h-12 rounded-lg overflow-hidden md:hidden shrink-0">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Desktop Text + Arrow Hover */}
                      <div className="transition-transform duration-300">
                        <div className="relative flex items-center">
                          {/* Arrow Container */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 lg:w-10 h-10 overflow-hidden flex items-center justify-center">
                            <div className="transition-all duration-300 -translate-x-full translate-y-full -rotate-45 opacity-0 group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                              <i className="fa-regular fa-sharp fa-arrow-up-right text-2xl lg:text-4xl" aria-hidden="true"></i>
                            </div>
                          </div>

                          {/* Text */}
                          <div className="transition-transform duration-300 group-hover:translate-x-10 lg:group-hover:translate-x-12">
                            <h3 className="inline-flex flex-wrap text-balance relative text-left justify-start text-current text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-sans font-medium tracking-tight">
                              {service.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Hover Background Image Reveal */}
                    <div className="col-start-1 row-start-1 relative rounded-full overflow-hidden z-10 transition-opacity duration-500 bg-black opacity-0 group-hover:opacity-100">
                      <div className="w-full h-full opacity-60 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                        <div className="relative overflow-hidden w-full h-full">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>

                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="col-span-12 md:hidden mt-6">
            <Link
              href="/services"
              className="group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tight capitalize font-sans font-medium overflow-hidden border border-black/5 cursor-pointer focus:outline-none w-full text-sm px-6 py-3 rounded-full transition-all hover:rounded-xl bg-white text-black shadow-sm hover:shadow-md flex-row-reverse"
            >
              <div className="relative overflow-hidden h-[20px] w-full flex justify-center">
                <div className="flex flex-col transition-transform duration-300 ease-[0.76,0,0.24,1] group-hover:-translate-y-1/2">
                  <div className="flex items-center gap-x-1.5 h-[20px]">
                    <span>View All Services</span>
                    <MoveUpRight className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-x-1.5 h-[20px]">
                    <span>View All Services</span>
                    <MoveUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
