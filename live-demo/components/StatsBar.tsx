"use client";

const stats = [
  { label: "Transfers (24h)", value: "---" },
  { label: "Largest Transfer", value: "$---,---.--" },
  { label: "Unique Addresses", value: "---" },
];

export default function StatsBar() {
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
