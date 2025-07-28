import callbacks from "./auth.callbacks";

import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../lib/prisma";

import { v4 } from "uuid";

export default {
  adapter: {
    ...PrismaAdapter(prisma),
    createUser: async (user) => {
      console.log("🔥createUser");
      if (!user.email) {
        user.email = v4() + "@korosseum.com";
      }
      const newUser = await prisma.user.create({ data: user });
      return newUser as any;
    },
  },

  session: {
    strategy: "jwt",
  },

  debug: false,
  secret: process.env.AUTH_SECRET,
  callbacks,
  pages: {
    verifyRequest: "/auth/verify-request",
  },
} satisfies Omit<NextAuthConfig, "providers">;
