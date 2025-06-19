import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TerminalWindow from "@/components/TerminalWindow";

type VisitorCountData = {
  count: number;
};

export default function Terminal() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [keyboardActivated, setKeyboardActivated] = useState(false);

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
    fetch("/api/visitors/increment", {
      method: "POST",
      credentials: "include",
    });
  }, []);

  const handleActivateKeyboard = () => {
    inputRef.current?.focus();
    setKeyboardActivated(true);
  };

  return (
    <div className="bg-black text-[#00ff00] font-mono h-screen w-screen overflow-hidden relative">
      {/* Input must be visible to trigger keyboard */}
      {!keyboardActivated && (
        <div className="absolute inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              inputMode="text"
              className="text-black p-2 rounded text-lg"
              placeholder="Tap here to start"
              onFocus={() => setKeyboardActivated(true)}
            />
            <p className="text-white text-sm">Tap the input above to start the terminal</p>
          </div>
        </div>
      )}

      <TerminalWindow visitorCount={visitorCount} />
    </div>
  );
}
