"use client";

export default function TotalSupplyCard() {
  return (
    <div className="rounded-2xl border border-accent-muted bg-gradient-to-br from-bg-card to-[#1a1b2e] p-8">
      <p className="mb-2 text-sm font-medium text-text-secondary">
        Total USDC Supply
      </p>
      <p className="font-mono text-4xl font-bold text-text-primary">
        $---,---,---.--
      </p>
    </div>
  );
}
