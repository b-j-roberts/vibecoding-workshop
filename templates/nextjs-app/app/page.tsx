"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";

interface Stat {
  title: string;
  value: string;
  description: string;
}

export default function Home() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">My MVP</h1>
        <p className="mt-2 text-gray-600">
          A starting point for your project. Edit this page to build your idea.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </section>

      <section className="mt-10 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Getting Started</h2>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>
            1. Edit <code className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-800">app/api/stats/route.ts</code> to change the data source
          </li>
          <li>
            2. Edit <code className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-800">app/page.tsx</code> to change the UI
          </li>
          <li>
            3. Add new components in <code className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-800">components/</code>
          </li>
          <li>
            4. Use Claude Code to help you build features — describe what you want and iterate
          </li>
        </ul>
      </section>
    </div>
  );
}
