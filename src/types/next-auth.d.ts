import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User {
    nickname?: string;
    role?: string;
    sub?: string;
  }

  interface Account {
    provider?: string;
  }

  interface Session {
    error?: string;
    jwtToken?: string; // JWT 토큰 자체를 세션에 추가
    user: {
      role?: string;
      nickname?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    nickname?: string;
    access_token: string;
    expires_at: number;
    refresh_token?: string;
  }
}
