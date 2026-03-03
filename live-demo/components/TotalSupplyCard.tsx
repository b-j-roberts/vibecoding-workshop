"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useTotalSupply } from "@/hooks/useTotalSupply";

export default function TotalSupplyCard() {
  const { formatted, loading, error, retry } = useTotalSupply();
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

  const hasStaleData = error && formatted;

  return (
    <div className="rounded-2xl border border-accent-muted bg-gradient-to-br from-bg-card to-[#1a1b2e] p-8">
      <p className="mb-2 text-sm font-medium text-text-secondary">
        Total USDC Supply
      </p>
      {loading && !formatted ? (
        <div className="skeleton h-10 w-64 rounded-lg" />
      ) : error && !formatted ? (
        <div className="flex items-center gap-3">
          <p className="font-mono text-4xl font-bold text-error">--</p>
          <button
            onClick={retry}
            className="flex items-center gap-1.5 rounded-md border border-error-muted bg-error-muted/50 px-3 py-1.5 text-xs font-medium text-error transition-colors hover:bg-error-muted"
          >
            <RefreshCw className="h-3 w-3" />
            Retry
          </button>
        </div>
      ) : (
        <>
          <p className={`font-mono text-4xl font-bold text-text-primary ${flashing ? "supply-flash" : ""} ${hasStaleData ? "opacity-60" : ""}`}>
            {formatted}
          </p>
          {hasStaleData && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-error">Stale data — update failed</span>
              <button
                onClick={retry}
                className="text-xs font-medium text-error underline underline-offset-2 hover:text-error/80"
              >
                Retry
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
