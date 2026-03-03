"use client";

import { useEffect, useState, useCallback } from "react";
import { getRecentTransfers } from "@/lib/usdc";
import { Transfer } from "@/lib/types";

interface TransfersState {
  transfers: Transfer[];
  loading: boolean;
  error: string | null;
}

export function useTransfers(intervalMs = 15_000) {
  const [state, setState] = useState<TransfersState>({
    transfers: [],
    loading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    try {
      const transfers = await getRecentTransfers();
      setState({ transfers, loading: false, error: null });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Failed to fetch transfers",
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
