import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://naval-armada-api-bc939f92a102.herokuapp.com/flags"
  );

  const flags = await res.json();

  return NextResponse.json(flags);
}
