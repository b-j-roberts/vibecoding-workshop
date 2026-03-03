"use client";

import { useEffect, useState, useCallback } from "react";
import { getTotalSupply, formatUSDC } from "@/lib/usdc";

interface TotalSupplyState {
  raw: bigint | null;
  formatted: string | null;
  loading: boolean;
  error: string | null;
}

export function useTotalSupply(intervalMs = 30_000) {
  const [state, setState] = useState<TotalSupplyState>({
    raw: null,
    formatted: null,
    loading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    try {
      const raw = await getTotalSupply();
      setState({ raw, formatted: formatUSDC(raw), loading: false, error: null });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Failed to fetch supply",
      }));
    }
  }, []);

  useEffect(() => {
    fetch();
    const id = setInterval(fetch, intervalMs);
    return () => clearInterval(id);
  }, [fetch, intervalMs]);

  return state;
}
