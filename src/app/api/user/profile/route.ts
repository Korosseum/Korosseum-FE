import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import { prisma } from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  try {
    // 1. 세션에서 유저 정보 가져오기
    const session = await auth();

    // 2. 인증되지 않은 경우 에러 반환
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    // 3. DB에서 유저 정보 조회
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
        createdAt: true,
        // 필요한 필드만 선택
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};

// 유저 정보 업데이트 예시
export const PUT = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { nickname } = body;

    // 유저 정보 업데이트
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        nickname,
      },
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};
