"use client";

import { Button } from "./ui/button";
import { User, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface NavigationProps {
  currentPage: string;
  showBackToLanding?: boolean;
}

export function Navigation({
  currentPage,
  showBackToLanding = true,
}: NavigationProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VS</span>
              </div>
              <h1 className="text-xl font-bold">사이버 토론 플랫폼</h1>
            </div>

            {/* Back to Landing link */}
            {showBackToLanding && (
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  랜딩페이지
                </Button>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/home">
              <Button
                variant={currentPage === "home" ? "default" : "ghost"}
                size="sm"
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />홈
              </Button>
            </Link>
            <Link href="/profile">
              <Button
                variant={currentPage === "profile" ? "default" : "ghost"}
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
