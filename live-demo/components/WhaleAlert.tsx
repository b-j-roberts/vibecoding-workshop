"use client";

import { AlertTriangle } from "lucide-react";
import { Transfer } from "@/lib/types";
import { truncateAddress, formatUSDC } from "@/lib/usdc";

const WHALE_THRESHOLD = BigInt(3_000 * 10 ** 6); // 3,000 USDC

interface WhaleAlertProps {
  transfers: Transfer[];
  loading: boolean;
}

export default function WhaleAlert({ transfers, loading }: WhaleAlertProps) {
  const whales = transfers.filter((tx) => tx.amount >= WHALE_THRESHOLD);

  return (
    <div className="rounded-xl border border-border-default bg-bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-text-primary">
        Whale Alerts
      </h2>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-16 w-full" />
          ))}
        </div>
      ) : whales.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-tertiary">
          No whale transfers detected
        </p>
      ) : (
        <div className="max-h-[400px] space-y-2 overflow-y-auto">
          {whales.map((tx, i) => (
            <div
              key={`${tx.transactionHash}-${i}`}
              className="rounded-lg border border-border-default border-l-warning bg-bg-primary px-4 py-3 border-l-2"
            >
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                <span className="font-mono text-sm font-medium text-warning">
                  {formatUSDC(tx.amount)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="font-mono">{truncateAddress(tx.from)}</span>
                <span className="text-text-tertiary">&rarr;</span>
                <span className="font-mono">{truncateAddress(tx.to)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
