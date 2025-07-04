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
