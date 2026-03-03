import { NextResponse } from "next/server";

export async function GET() {
  // Hard-coded data — replace with a real data source later
  const stats = [
    { title: "Users", value: "128", description: "Total sign-ups" },
    { title: "Active", value: "42", description: "Last 7 days" },
    { title: "Requests", value: "1,024", description: "This month" },
  ];

  return NextResponse.json(stats);
}
