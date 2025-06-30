"use client";

import { HomePage } from "@/components/HomePage";

export default function HomePageRoute() {
  return (
    <div className="min-h-screen bg-background">
      <main className="debate-transition">
        <HomePage />
      </main>
      <footer className="border-t bg-muted/50 mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center space-y-2">
            <h3 className="font-medium">🔥 사이버 VS 토론 플랫폼</h3>
            <p className="text-sm text-muted-foreground">
              다양한 주제로 토론하고, 서로의 의견을 나눠보세요!
            </p>
            <p className="text-xs text-muted-foreground">
              Built with Next.js, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
