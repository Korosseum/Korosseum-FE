import apiCall from "@/lib/apiCall";
import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const data = await apiCall.get("/auth/verifyRefreshToken", {
    headers: req.headers,
  });

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
      id: data.user.id,
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
