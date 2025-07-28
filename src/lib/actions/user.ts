"use server";

import { auth } from "@/auth/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 유저 프로필 조회
export async function getUserProfile() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("인증되지 않은 사용자입니다.");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        post: true, // 유저가 작성한 포스트
        post_user: true, // 유저가 참여한 포스트
        opinion: true, // 유저가 작성한 의견
      },
    });

    return { success: true, user };
  } catch (error) {
    console.error("getUserProfile Error:", error);
    return { success: false, error: "프로필 조회에 실패했습니다." };
  }
}

// 유저 닉네임 업데이트
export async function updateUserNickname(newNickname: string) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("인증되지 않은 사용자입니다.");
    }

    // 닉네임 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: {
        nickname: newNickname,
      },
    });

    if (existingUser && existingUser.email !== session.user.email) {
      throw new Error("이미 사용 중인 닉네임입니다.");
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        nickname: newNickname,
      },
    });

    // 캐시 무효화 (프로필 페이지 재검증)
    revalidatePath("/profile");

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("updateUserNickname Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "닉네임 업데이트에 실패했습니다.",
    };
  }
}

// 유저가 작성한 포스트 조회
export async function getUserPosts() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("인증되지 않은 사용자입니다.");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        post: {
          include: {
            opinions: true,
            post_user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return { success: true, posts: user?.post || [] };
  } catch (error) {
    console.error("getUserPosts Error:", error);
    return { success: false, error: "포스트 조회에 실패했습니다." };
  }
}
