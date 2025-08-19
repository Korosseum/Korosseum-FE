"use client";

import { HomePage } from "@/components/HomePage";
import useAuth from "@/hooks/useAuth";
export default function HomePageRoute() {
  const { loading } = useAuth();

  return <main className="debate-transition">{!loading && <HomePage />}</main>;
}
