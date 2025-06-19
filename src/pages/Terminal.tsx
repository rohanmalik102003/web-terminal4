import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import TerminalWindow from "@/components/TerminalWindow";

// Type for the visitor count data
type VisitorCountData = {
  count: number;
};

export default function Terminal() {
  // Fetch visitor count when the component mounts
  const { data: visitorCountData } = useQuery<VisitorCountData>({
    queryKey: ["/api/visitors/count"],
    queryFn: async () => {
      const res = await fetch("/api/visitors/count", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch visitor count");
      return res.json();
    },
    staleTime: 0, // Always get fresh count
  });

  // Get the visitor count or use 1 as a fallback
  const visitorCount = visitorCountData?.count || 1;

  // Increment the visitor count when the component mounts
  useEffect(() => {
    fetch("/api/visitors/increment", {
      method: "POST",
      credentials: "include",
    });
  }, []);

  return (
    <div className="bg-black text-[#00ff00] font-mono h-screen w-screen overflow-hidden">
      <input
  type="text"
  className="absolute opacity-0 pointer-events-none"
  autoFocus
  inputMode="text"
/>

      <TerminalWindow visitorCount={visitorCount} />
    </div>
  );
}
