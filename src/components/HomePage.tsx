"use client";

import { Card } from "./ui/card";
import { getBgColor, getTimeAgo } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import apiCall from "@/lib/apiCall";
import Feed from "./Feed";
import { useQuery } from "@tanstack/react-query";

interface HomePageProps {
  onJoinDebate?: (debateId: string) => void;
}

const getFeeds = async () => {
  const response = await apiCall.get("/feed");

  if (response.ok) {
    return response.data;
  } else {
    throw new Error("Failed to fetch feeds");
  }
};

// Mock debate data - moved inline to fix import issues

export function HomePage({ onJoinDebate }: HomePageProps) {
  const { data: feeds, isLoading } = useQuery<any[]>({
    queryKey: ["feeds"],
    queryFn: getFeeds,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!feeds) {
    return <div>No feeds</div>;
  }

  // console.log(feeds);
  return (
    <div>
      <div className="max-w-3xl mt-3">
        {feeds.map((feed) => (
          <Feed key={feed.id} feed={feed} />
        ))}
      </div>
    </div>
  );
}
