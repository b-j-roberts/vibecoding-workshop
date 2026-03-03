"use client";

import { useEffect, useRef, useState } from "react";
import { useTotalSupply } from "@/hooks/useTotalSupply";

export default function TotalSupplyCard() {
  const { formatted, loading, error } = useTotalSupply();
  const prevFormatted = useRef<string | null>(null);
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    if (formatted && prevFormatted.current && formatted !== prevFormatted.current) {
      setFlashing(true);
      const timeout = setTimeout(() => setFlashing(false), 800);
      return () => clearTimeout(timeout);
    }
    prevFormatted.current = formatted;
  }, [formatted]);

  return (
    <div className="rounded-2xl border border-accent-muted bg-gradient-to-br from-bg-card to-[#1a1b2e] p-8">
      <p className="mb-2 text-sm font-medium text-text-secondary">
        Total USDC Supply
      </p>
      {loading ? (
        <div className="skeleton h-10 w-64 rounded-lg" />
      ) : error ? (
        <p className="font-mono text-4xl font-bold text-error">Error</p>
      ) : (
        <p className={`font-mono text-4xl font-bold text-text-primary ${flashing ? "supply-flash" : ""}`}>
          {formatted}
        </p>
      )}
    </div>
  );
}
