"use client";

export default function TransferFeed() {
  return (
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
  );
}
