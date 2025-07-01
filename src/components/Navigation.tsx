"use client";

import { Button } from "@/components/ui/button";
import { User, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignIn from "@/components/SignIn";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";

export function Navigation() {
  const pathname = usePathname().split("/")[1];

  const { data: session } = useSession();
  console.log(session);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b bg-white sticky  z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VS</span>
              </div>
              <h1 className="text-xl font-bold">Korosseum</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
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

            <Link href="/profile">
              <Button
                disabled={pathname === "profile"}
                size="sm"
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                마이페이지
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
