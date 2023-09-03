import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

import type { NextRequest } from "next/server";
import type { Session } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession<any, Session>(authOptions);
  const rJson = await request.json();
  const body = {
    ...rJson,
    voter_id: session?.user.id,
    creation_key: process.env.CREATION_KEY,
  };

  const res = await fetch(
    "https://naval-armada-api-bc939f92a102.herokuapp.com/cast_vote",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (res.status !== 200) {
    return new NextResponse(null, {
      status: res.status,
    });
  } else {
    return new NextResponse(null, {
      status: 200,
    });
  }
}
