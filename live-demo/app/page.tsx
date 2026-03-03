import TotalSupplyCard from "@/components/TotalSupplyCard";
import StatsBar from "@/components/StatsBar";
import TransferFeed from "@/components/TransferFeed";
import WhaleAlert from "@/components/WhaleAlert";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text-primary sm:text-4xl">
            Starknet USDC Dashboard
          </h1>
          <span className="text-xs font-medium text-text-tertiary">
            Last updated: --
          </span>
        </header>

        {/* Hero: Total Supply */}
        <section className="mb-6">
          <TotalSupplyCard />
        </section>

        {/* Stats Bar */}
        <section className="mb-6">
          <StatsBar />
        </section>

        {/* Content Grid: Transfer Feed + Whale Alerts */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <TransferFeed />
          <WhaleAlert />
        </section>

        <footer className="mt-8 py-4 text-center text-xs text-text-tertiary">
          Powered by Starknet
        </footer>
      </main>
    </div>
  );
}
