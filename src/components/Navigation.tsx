"use client";

import { Button } from "./ui/button";
import { User, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignIn from "@/components/SignIn";
import { signOut, useSession } from "next-auth/react";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import { useEffect, useState } from "react";

export function Navigation() {
  const pathname = usePathname().split("/")[1];

  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  console.log("session", session);

  return (
    <header className="border-b bg-white sticky  z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="text-xl font-bold flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VS</span>
              </div>
              Korosseum
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {status === "loading" ? (
              ""
            ) : session ? (
              <>
                <Button
                  asChild
                  size="sm"
                  className="flex items-center gap-1"
                  style={
                    pathname === "profile"
                      ? {
                          opacity: 0.6,
                          pointerEvents: "none",
                        }
                      : {}
                  }
                >
                  <Link href="/profile">
                    <User className="h-4 w-4 " />
                    {session.user?.nickname}
                  </Link>
                </Button>

                <Button
                  onClick={() => signOut()}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <Button
                  onClick={() => setIsOpen(true)}
                  variant="default"
                  size="sm"
                  className="flex items-center gap-2 bg-gradient-to-r from-side-a to-side-b hover:brightness-110"
                >
                  <LogIn className="h-4 w-4" />
                  로그인
                </Button>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <SignIn />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
