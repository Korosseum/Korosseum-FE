"use client";

import { Card } from "./ui/card";
import { getBgColor, getTimeAgo } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import apiCall from "@/lib/apiCall";
import Feed from "./Feed";

interface HomePageProps {
  onJoinDebate?: (debateId: string) => void;
}

// Mock debate data - moved inline to fix import issues

export function HomePage({ onJoinDebate }: HomePageProps) {
  const [feeds, setFeeds] = useState<any[]>([]);
  useEffect(() => {
    const getFeeds = async () => {
      const response = await apiCall.get("/feed");

      if (response.ok) {
        setFeeds(response.data);
      }
    };
    getFeeds();
  }, []);

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
