import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Kakao from "next-auth/providers/kakao";
import Google from "next-auth/providers/google";

// console.log("process.env.AUTH_SECRET", process.env.AUTH_SECRET);
// console.log("process.env.AUTH_GOOGLE_ID", process.env.AUTH_GOOGLE_ID);
// console.log("process.env.AUTH_GOOGLE_SECRET", process.env.AUTH_GOOGLE_SECRET);
// console.log("process.env.AUTH_KAKAO_ID", process.env.AUTH_KAKAO_ID);
// console.log("process.env.AUTH_KAKAO_SECRET", process.env.AUTH_KAKAO_SECRET);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  debug: true,
  secret: process.env.AUTH_SECRET,
  providers: [Google, Kakao],
  callbacks: {
    async jwt({ token, user }) {
      console.log("token", token);
      console.log("user", user);

      return token;
    },
    async session({ session, user }) {
      console.log("session", session);
      console.log("user", user);

      return session;
    },
  },
});
export const runtime = "nodejs";
