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
        const newProfile = {
          role: profile.role ?? "user",
          id: profile.id || profile.sub, // provider별 고유 id (sub를 id로 db에 맞게 변경),

          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };
        console.log("🔥newProfile", newProfile);
        return newProfile;
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
