"use client";

interface AnnouncementCurtainProps {
  curtainRef: React.RefObject<HTMLDivElement | null>;
}

export function AnnouncementCurtain({ curtainRef }: AnnouncementCurtainProps) {
  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 bg-[#B2F6E3] z-9999 pointer-events-none"
    />
  );
}
