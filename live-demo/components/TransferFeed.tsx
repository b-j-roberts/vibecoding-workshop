"use client";

import { useTransfers } from "@/hooks/useTransfers";
import { truncateAddress, formatUSDC } from "@/lib/usdc";

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export default function TransferFeed() {
  const { transfers, loading, error } = useTransfers();

  return (
    <div className="rounded-xl border border-border-default bg-bg-card p-6 lg:col-span-2">
      <h2 className="mb-4 text-lg font-semibold text-text-primary">
        Recent Transfers
      </h2>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-12 w-full" />
          ))}
        </div>
      ) : error ? (
        <p className="py-8 text-center text-sm text-error">{error}</p>
      ) : transfers.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-tertiary">
          No recent transfers found
        </p>
      ) : (
        <div className="max-h-[400px] space-y-2 overflow-y-auto">
          {transfers.map((tx, i) => (
            <div
              key={`${tx.transactionHash}-${i}`}
              className="flex items-center justify-between rounded-lg border border-border-default bg-bg-primary px-4 py-3"
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
