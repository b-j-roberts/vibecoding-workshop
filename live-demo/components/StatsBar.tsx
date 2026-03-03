"use client";

import { Transfer } from "@/lib/types";
import { formatUSDC } from "@/lib/usdc";

interface StatsBarProps {
  transfers: Transfer[];
  loading: boolean;
}

export default function StatsBar({ transfers, loading }: StatsBarProps) {
  const transferCount = transfers.length;
  const largestTransfer =
    transfers.length > 0
      ? transfers.reduce((max, tx) => (tx.amount > max.amount ? tx : max)).amount
      : null;
  const uniqueAddresses = new Set(
    transfers.flatMap((tx) => [tx.from, tx.to])
  ).size;

  const showSkeleton = loading && transfers.length === 0;

  const stats = [
    { label: "Transfers", value: transferCount.toLocaleString(), skeleton: "w-12" },
    { label: "Largest Transfer", value: largestTransfer ? formatUSDC(largestTransfer) : "$0.00", skeleton: "w-28" },
    { label: "Unique Addresses", value: uniqueAddresses.toLocaleString(), skeleton: "w-12" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
      {stats.map(({ label, value, skeleton }) => (
        <div
          key={label}
          className="rounded-xl border border-border-default bg-bg-card p-4 sm:p-6"
        >
          <p className="mb-2 text-xs font-medium text-text-secondary">
            {label}
          </p>
          {showSkeleton ? (
            <div className={`skeleton h-7 ${skeleton} rounded`} />
          ) : (
            <p className="font-mono text-xl font-medium text-text-primary">
              {value}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
