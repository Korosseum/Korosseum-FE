import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const email = searchParams.get("email");
  const nickname = searchParams.get("nickname");
  const provider = searchParams.get("provider");
  const photo = searchParams.get("photo");

  const user = {
    id,
    email,
    nickname,
    provider,
    photo,
  };

  console.log("🔥user", user);
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  if (id && provider && email && nickname && photo) {
    session.user = {
      id,
      provider,
      email,
      nickname,
      photo,
    };
  }

  await session.save();
  console.log("🔥session", await session);

  return Response.redirect(new URL("/", req.url));
};
