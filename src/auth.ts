import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  debug: true,

  ...authConfig,

  callbacks: {
    async session({ session, user }) {
      console.log(user);
      return session;
    },
  },
});
export const runtime = "nodejs";
