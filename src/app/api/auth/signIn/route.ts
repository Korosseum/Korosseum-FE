import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  console.log(req.headers);
  const response = await fetch(
    `http://localhost:4000/auth/verifyRefreshToken`,
    {
      headers: req.headers,
    }
  );
  console.log("✨session", headers);
  const data = await response.json();
  console.log("data", data);

  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (data.user && data.accessToken) {
    session.user = data.user;
    (await cookies()).set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1일
      sameSite: "strict",
    });

    session.user = {
      provider: data.user.provider,
      email: data.user.email,
      nickname: data.user.nickname,
      photo: data.user.photo,
    };
    await session.save();
    return Response.json(session.user);
  } else {
    session.destroy();
    await session.save();
    return Response.json(null);
  }
};
