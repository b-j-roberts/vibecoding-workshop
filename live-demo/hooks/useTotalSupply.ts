"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { getTotalSupply, formatUSDC } from "@/lib/usdc";
import { usePageVisibility } from "./usePageVisibility";

interface TotalSupplyState {
  raw: bigint | null;
  formatted: string | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

export function useTotalSupply(intervalMs = 30_000) {
  const [state, setState] = useState<TotalSupplyState>({
    raw: null,
    formatted: null,
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const isVisible = usePageVisibility();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchSupply = useCallback(async () => {
    try {
      const raw = await getTotalSupply();
      setState({
        raw,
        formatted: formatUSDC(raw),
        loading: false,
        error: null,
        lastUpdated: Date.now(),
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Failed to fetch supply",
      }));
    }
  }, []);

  useEffect(() => {
    fetchSupply();
  }, [fetchSupply]);

  useEffect(() => {
    if (isVisible) {
      fetchSupply();
      intervalRef.current = setInterval(fetchSupply, intervalMs);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isVisible, fetchSupply, intervalMs]);

  return state;
}
