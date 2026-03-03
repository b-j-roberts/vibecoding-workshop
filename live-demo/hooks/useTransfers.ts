"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { getRecentTransfers } from "@/lib/usdc";
import { Transfer } from "@/lib/types";
import { usePageVisibility } from "./usePageVisibility";

interface TransfersState {
  transfers: Transfer[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

export function useTransfers(intervalMs = 15_000) {
  const [state, setState] = useState<TransfersState>({
    transfers: [],
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const isVisible = usePageVisibility();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchTransfers = useCallback(async () => {
    try {
      const transfers = await getRecentTransfers();
      setState({ transfers, loading: false, error: null, lastUpdated: Date.now() });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Failed to fetch transfers",
      }));
    }
  }, []);

  useEffect(() => {
    fetchTransfers();
  }, [fetchTransfers]);

  useEffect(() => {
    if (isVisible) {
      fetchTransfers();
      intervalRef.current = setInterval(fetchTransfers, intervalMs);
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
  }, [isVisible, fetchTransfers, intervalMs]);

  return state;
}
