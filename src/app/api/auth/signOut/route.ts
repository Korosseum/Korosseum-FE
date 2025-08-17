import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  console.log("signOut", session);
  (await cookies()).delete("accessToken");
  session.destroy();

  return Response.json({ ok: true });
};
