import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import TerminalWindow from "@/components/TerminalWindow";

type VisitorCountData = {
  count: number;
};

export default function Terminal() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data: visitorCountData } = useQuery<VisitorCountData>({
    queryKey: ["/api/visitors/count"],
    queryFn: async () => {
      const res = await fetch("/api/visitors/count", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch visitor count");
      return res.json();
    },
    staleTime: 0,
  });

  const visitorCount = visitorCountData?.count || 1;

  useEffect(() => {
    // Increment count
    fetch("/api/visitors/increment", {
      method: "POST",
      credentials: "include",
    });

    // Mobile virtual keyboard trigger
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    if (isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="bg-black text-[#00ff00] font-mono h-screen w-screen overflow-hidden">
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0"
        inputMode="text"
      />
      <TerminalWindow visitorCount={visitorCount} />
    </div>
  );
}
