import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");
  const nickname = searchParams.get("nickname");
  const provider = searchParams.get("provider");
  const photo = searchParams.get("photo");

  const user = {
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
  if (provider && email && nickname && photo) {
    session.user = {
      provider: provider,
      email: email,
      nickname: nickname,
      photo: photo,
    };
  }

  await session.save();
  console.log("🔥session", await session);

  return Response.redirect(new URL("/", req.url));
};
