"use client";

import { useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";
import { Transfer } from "@/lib/types";
import { truncateAddress, formatUSDC } from "@/lib/usdc";

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

interface TransferFeedProps {
  transfers: Transfer[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export default function TransferFeed({ transfers, loading, error, onRetry }: TransferFeedProps) {
  const prevHashesRef = useRef<Set<string>>(new Set());
  const isInitialRef = useRef(true);

  useEffect(() => {
    if (!loading && transfers.length > 0) {
      if (isInitialRef.current) {
        isInitialRef.current = false;
      }
      prevHashesRef.current = new Set(transfers.map((tx) => tx.transactionHash));
    }
  }, [transfers, loading]);

  const isNewTransfer = (hash: string) => {
    if (isInitialRef.current) return false;
    return !prevHashesRef.current.has(hash);
  };

  const hasStaleData = error && transfers.length > 0;

  return (
    <div className="rounded-xl border border-border-default bg-bg-card p-6 lg:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">
          Recent Transfers
        </h2>
        {hasStaleData && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-error">Update failed</span>
            {onRetry && (
              <button
                onClick={onRetry}
                className="flex items-center gap-1 rounded-md border border-error-muted bg-error-muted/50 px-2 py-0.5 text-xs font-medium text-error transition-colors hover:bg-error-muted"
              >
                <RefreshCw className="h-2.5 w-2.5" />
                Retry
              </button>
            )}
          </div>
        )}
      </div>

      {loading && transfers.length === 0 ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border-default bg-bg-primary px-4 py-3">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="skeleton h-4 w-24 rounded" />
                  <div className="skeleton h-3 w-3 rounded-full" />
                  <div className="skeleton h-4 w-24 rounded" />
                </div>
                <div className="skeleton h-3 w-32 rounded" />
              </div>
              <div className="skeleton ml-4 h-4 w-20 rounded" />
            </div>
          ))}
        </div>
      ) : error && transfers.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-8">
          <p className="text-sm text-error">Failed to load transfers</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-1.5 rounded-md border border-error-muted bg-error-muted/50 px-3 py-1.5 text-xs font-medium text-error transition-colors hover:bg-error-muted"
            >
              <RefreshCw className="h-3 w-3" />
              Retry
            </button>
          )}
        </div>
      ) : transfers.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-tertiary">
          No recent transfers found
        </p>
      ) : (
        <div className={`max-h-[400px] space-y-2 overflow-y-auto ${hasStaleData ? "opacity-60" : ""}`}>
          {transfers.map((tx, i) => (
            <div
              key={`${tx.transactionHash}-${i}`}
              className={`flex items-center justify-between rounded-lg border border-border-default bg-bg-primary px-4 py-3 ${
                isNewTransfer(tx.transactionHash) ? "transfer-new" : ""
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-mono text-text-secondary">
                    {truncateAddress(tx.from)}
                  </span>
                  <span className="text-text-tertiary">&rarr;</span>
                  <span className="font-mono text-text-secondary">
                    {truncateAddress(tx.to)}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-text-tertiary">
                  Block {tx.blockNumber.toLocaleString()} &middot; {timeAgo(tx.timestamp)}
                </p>
              </div>
              <span className="ml-4 whitespace-nowrap font-mono text-sm font-medium text-accent">
                {formatUSDC(tx.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
