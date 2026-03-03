"use client";

import { useState, useEffect } from "react";
import TotalSupplyCard from "@/components/TotalSupplyCard";
import StatsBar from "@/components/StatsBar";
import TransferFeed from "@/components/TransferFeed";
import WhaleAlert from "@/components/WhaleAlert";
import { useTransfers } from "@/hooks/useTransfers";

function useSecondsAgo(lastUpdated: number | null) {
  const [secondsAgo, setSecondsAgo] = useState<number | null>(null);

  useEffect(() => {
    if (!lastUpdated) return;

    setSecondsAgo(Math.floor((Date.now() - lastUpdated) / 1000));

    const id = setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - lastUpdated) / 1000));
    }, 1000);

    return () => clearInterval(id);
  }, [lastUpdated]);

  return secondsAgo;
}

export default function Home() {
  const { transfers, loading, error, lastUpdated } = useTransfers();
  const secondsAgo = useSecondsAgo(lastUpdated);

  return (
    <div className="min-h-screen bg-bg-primary">
      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-text-primary sm:text-4xl">
              Starknet USDC Dashboard
            </h1>
            <div className="flex items-center gap-1.5 rounded-full border border-success-muted bg-success-muted/30 px-2.5 py-1">
              <span className="live-dot" />
              <span className="text-xs font-medium text-success">Live</span>
            </div>
          </div>
          <span className="text-xs font-medium text-text-tertiary">
            {secondsAgo !== null
              ? `Last updated: ${secondsAgo}s ago`
              : "Last updated: --"}
          </span>
        </header>

        {/* Hero: Total Supply */}
        <section className="mb-6">
          <TotalSupplyCard />
        </section>

        {/* Stats Bar */}
        <section className="mb-6">
          <StatsBar transfers={transfers} loading={loading} />
        </section>

        {/* Content Grid: Transfer Feed + Whale Alerts */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <TransferFeed transfers={transfers} loading={loading} error={error} />
          <WhaleAlert transfers={transfers} loading={loading} />
        </section>

        <footer className="mt-8 py-4 text-center text-xs text-text-tertiary">
          Powered by Starknet
        </footer>
      </main>
    </div>
  );
}
