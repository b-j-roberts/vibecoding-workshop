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
          <div className="rounded-2xl border border-accent-muted bg-gradient-to-br from-bg-card to-[#1a1b2e] p-8">
            <p className="mb-2 text-sm font-medium text-text-secondary">
              Total USDC Supply
            </p>
            <div className="skeleton h-10 w-64" />
          </div>
        </section>

        {/* Stats Bar */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {["Transfers (24h)", "Largest Transfer", "Unique Addresses"].map(
            (label) => (
              <div
                key={label}
                className="rounded-xl border border-border-default bg-bg-card p-6"
              >
                <p className="mb-2 text-xs font-medium text-text-secondary">
                  {label}
                </p>
                <div className="skeleton h-7 w-24" />
              </div>
            )
          )}
        </section>

        {/* Content Grid: Transfer Feed + Whale Alerts */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-border-default bg-bg-card p-6 lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold text-text-primary">
              Recent Transfers
            </h2>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="skeleton h-12 w-full" />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border-default bg-bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-text-primary">
              Whale Alerts
            </h2>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton h-16 w-full" />
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-8 py-4 text-center text-xs text-text-tertiary">
          Powered by Starknet
        </footer>
      </main>
    </div>
  );
}
