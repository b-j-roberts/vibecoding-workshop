"use client";

export default function WhaleAlert() {
  return (
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
  );
}
