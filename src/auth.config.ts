import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const Credential = Credentials({
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials) => {
    console.log(credentials);
    if (credentials.password !== "password") return null;

    const user = {
      id: "1",
      name: "John Doe",
      email: "john@doe.com",
    };

    return user;
  },
});

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID,
      clientSecret: process.env.AUTH_KAKAO_SECRET,
    }),
    Credential,
  ],
} satisfies NextAuthConfig;
