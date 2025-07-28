import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  console.log("🔥POST");

  const cookie = req.headers.get("session");
  console.log("🔥cookie", cookie);

  return Response.json({ message: "Hello, world!" });
};
