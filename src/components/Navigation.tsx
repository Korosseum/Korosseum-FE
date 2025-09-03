"use client";

import { Button } from "./ui/button";
import { User, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignIn from "@/components/SignIn";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

export function Navigation() {
  const pathname = usePathname().split("/")[1];

  const { user, loading, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-base font-bold flex items-center gap-2"
          >
            <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VS</span>
            </div>
            Korosseum
          </Link>
        </div>

        <div className="flex h-7 items-center gap-2">
          {loading ? (
            ""
          ) : user ? (
            <>
              <Button
                asChild
                className="flex h-7 items-center gap-1"
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
                  {user?.nickname}
                </Link>
              </Button>

              <Button
                onClick={() => logOut()}
                size="sm"
                className="flex h-7 items-center gap-2"
              >
                로그아웃
              </Button>
            </>
          ) : (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <Button
                onClick={() => setIsOpen(true)}
                variant="default"
                className="flex h-7 items-center gap-2 bg-gradient-to-r from-side-a to-side-b hover:brightness-110"
              >
                <LogIn className="h-3 w-3" />
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
  );
}
