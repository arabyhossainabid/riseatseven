"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    id: 1,
    category: "News",
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
    author: "Carrie Rose",
    readTime: "2 mins",
    href: "/blog/global-operations-director-promotion",
    src: "/images/0B5A7827.jpg",
    date: "May 2026",
  },
  {
    id: 2,
    category: "Food/Hospitality/Drink",
    title: "Rise at Seven Appointed by Coneys to Drive Demand and Retail Growth",
    author: "Ray Saddiq",
    readTime: "2 mins",
    href: "/blog/coneys-brief",
    src: "/images/temp_image_43CEDE6C-4430-479F-9DBF-B348FA9AC991.WEBP",
    date: "Apr 2026",
  },
  {
    id: 3,
    category: "Food/Hospitality/Drink",
    title: "Rise at Seven Appointed by Langtins to Drive Demand for Noomz",
    author: "Carrie Rose",
    readTime: "2 mins",
    href: "/blog/noomz-brief",
    src: "/images/Screenshot-2025-06-23-at-22.39.35.png",
    date: "Mar 2026",
  },
];

function PostCard({ post }: { post: typeof posts[0] }) {
  return (
    <Link href={post.href} className="group block">
      <div className="img-zoom mb-4 aspect-[16/10] relative overflow-hidden rounded-2xl">
        <Image
          src={post.src}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-black/30 text-[0.6rem] tracking-[0.15em] uppercase border border-black/10 px-2 py-1">
            {post.category}
          </span>
          <span className="text-black/20 text-[0.6rem]">{post.date}</span>
        </div>
        <h3 className="text-black font-bold text-base md:text-lg tracking-tight leading-snug mb-3 group-hover:text-black/70 transition-colors duration-300">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 text-black/30 text-[0.65rem]">
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.readTime} read</span>
        </div>
      </div>
    </Link>
  );
}

export default function NewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current?.children ?? [], {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%" },
      });

      gsap.from(cardsRef.current?.children ?? [], {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-8 border-t border-black/5">
      <div ref={headRef} className="flex items-end justify-between mb-12 md:mb-16 gap-4">
        <div>
          <span className="text-black/30 text-[0.65rem] tracking-[0.25em] uppercase block mb-3">
            What&apos;s New
          </span>
          <h2 className="text-section font-black tracking-tightest leading-none text-black">
            Latest Thoughts
          </h2>
        </div>
        <Link
          href="/blog"
          className="text-black/40 hover:text-black text-[0.65rem] tracking-[0.15em] uppercase hover-line transition-colors duration-200 pb-1"
        >
          Explore More →
        </Link>
      </div>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
