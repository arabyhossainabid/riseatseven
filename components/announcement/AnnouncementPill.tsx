"use client";

interface AnnouncementPillProps {
  textRef: React.RefObject<HTMLDivElement | null>;
}

export function AnnouncementPill({ textRef }: AnnouncementPillProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-[54px] z-3100 flex items-center justify-center pointer-events-none">
      <div className="bg-[#B2F6E3] w-full max-w-[calc(100%-2rem)] h-[38px] rounded-full px-6 flex items-center justify-center pointer-events-auto">
        <div ref={textRef} className="h-[20px] overflow-hidden group cursor-pointer">
          <div className="flex flex-col transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-1/2">
            <div className="flex items-center gap-2 h-[20px] whitespace-nowrap">
              <span className="text-base">🚨</span>
              <span className="text-[0.7rem] font-bold tracking-tight text-black uppercase">
                THE CATEGORY LEADERBOARD — LIVE NOW
              </span>
            </div>
            <div className="flex items-center gap-2 h-[20px] whitespace-nowrap">
              <span className="text-base">🚨</span>
              <span className="text-[0.7rem] font-bold tracking-tight text-black uppercase">
                THE CATEGORY LEADERBOARD — LIVE NOW
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
