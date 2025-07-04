import NextAuth from "next-auth";
import authConfigs from "./auth.configs";
import Nodemailer from "next-auth/providers/nodemailer";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfigs,

  providers: [
    Google({
      profile(profile) {
        console.log("🔥profile", profile);
        return {
          role: profile.role ?? "user",
          id: profile.id || profile.sub, // provider별 고유 id 이거 없으면 id 인식 못함
          ...profile,
        };
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
    Kakao,
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
});
export const runtime = "nodejs";
