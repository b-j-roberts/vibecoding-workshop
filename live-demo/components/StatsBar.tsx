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

  const stats = [
    { label: "Transfers", value: loading ? "---" : transferCount.toLocaleString() },
    { label: "Largest Transfer", value: loading ? "$---,---.--" : largestTransfer ? formatUSDC(largestTransfer) : "$0.00" },
    { label: "Unique Addresses", value: loading ? "---" : uniqueAddresses.toLocaleString() },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
      {stats.map(({ label, value }) => (
        <div
          key={label}
          className="rounded-xl border border-border-default bg-bg-card p-6"
        >
          <p className="mb-2 text-xs font-medium text-text-secondary">
            {label}
          </p>
          <p className="font-mono text-xl font-medium text-text-primary">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
