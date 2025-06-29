"use client";

import { MyPage } from "@/components/MyPage";
import { Navigation } from "@/components/Navigation";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="profile" />
      <main className="debate-transition">
        <MyPage />
      </main>
    </div>
  );
}
