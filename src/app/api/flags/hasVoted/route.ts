import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

import type { NextRequest } from "next/server";
import type { Session } from "next-auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession<any, Session>(authOptions);

  if (!session) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  const flagsRes = await fetch(
    "https://naval-armada-api-bc939f92a102.herokuapp.com/flags"
  );

  const flags = await flagsRes.json();

  const res = await fetch(
    `https://naval-armada-api-bc939f92a102.herokuapp.com/has_voted?slack_id=${session.user.id}&flag_id=${flags[0].id}`
  );

  const json = await res.json();

  if (json.voter === session.user.id) {
    return NextResponse.json({ hasVoted: true });
  } else {
    return NextResponse.json({ hasVoted: false });
  }
}
