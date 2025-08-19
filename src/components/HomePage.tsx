"use client";

import { Card } from "./ui/card";
import { getBgColor, getTimeAgo } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import apiCall from "@/lib/apiCall";

interface HomePageProps {
  onJoinDebate?: (debateId: string) => void;
}

// Mock debate data - moved inline to fix import issues
const debateData = {
  "1": {
    id: "1",
    author: "gptjd1997",
    title: "근본 중국집 음식은?",
    content: `근데 솔직히 짜장면은 잼민이들이 먹는거 아님? 근데 솔직히 짜장면은 잼민이들이 먹는거 아님?
근데 솔직히 짜장면은 잼민이들이 먹는거 아님?
근데 솔직히 짜장면은 잼민이들이 먹는거 아님?
근데 솔직히 짜장면은 잼민이들이 먹는거 아님?
근데 솔직히 짜장면은 잼민이들이 먹는거 아님?
근데 솔직히 짜장면은 잼민이들이 먹는거 아님?
근데 솔직히 짜장면은 잼민이들이 먹는거 아님?
`,
    sideA: "짜장면",
    sideB: "짬뽕",
    totalCounts: 250,
    totalArguments: 89,
    isActive: true,
    createdAt: "2시간 전",
    category: "Food",
    thumbnail: "https://picsum.photos/seed/1752939703290/450/450",
    opinions: [
      {
        id: "1",
        content: "짜장면",
        count: 100,
      },
      {
        id: "2",
        content: "짬뽕",
        count: 150,
      },
      {
        id: "3",
        content: "탕수육",
        count: 150,
      },
      {
        id: "4",
        content: "유산슬",
        count: 150,
      },
    ],
  },
};

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
          <Card
            key={feed.id}
            className="gap-1 font-openSans duration-100 bg-background border-none hover:bg-muted/20"
          >
            <div className="flex justify-between px-1.5 py-1">
              <div className="flex items-center gap-2">
                <Image
                  src={feed.user.photo}
                  alt="user photo"
                  width={24}
                  height={24}
                  className="text-sm font-semibold rounded-full bg-accent w-6 h-6 flex items-center justify-center text-background"
                />

                <h2 className="flex items-center gap-2 text-xs font-semibold text-foreground/70">
                  {feed.user.nickname}
                </h2>
                <span className="text-2xs text-foreground/70">
                  @Food · {getTimeAgo(feed.createdAt)}
                </span>
              </div>
              {/* <div className="popular font-semibold flex  items-center gap-1">
              <Users2 color="grey" className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span className="text-xs text-gray-500">
                {debateData["1"].totalCounts}
              </span>
            </div> */}
            </div>

            <div className="flex flex-col min-h-36 h-full ">
              <div className="flex h-80 w-full bg-muted/50 gap-2 rounded-xl border border-foreground/10 overflow-x-scroll">
                {feed.files &&
                  feed.files.map((file: any) => {
                    return (
                      <Image
                        src={`http://localhost:4000/uploads/images/${file.filename}`}
                        alt={file.filename}
                        width={500}
                        height={500}
                        className="object-cover h-full w-auto rounded-xl"
                      />
                    );
                  })}
              </div>
              <div className="text-xs p-2">{feed.content}</div>
            </div>
            <div className="flex flex-col justify-between px-3 ">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2 w-1/2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  >
                    <div className="flex overflow-hidden gap-1">
                      {debateData["1"].opinions.map((opinion, index) => (
                        <div
                          key={opinion.id}
                          className={`opacity-50 hover:opacity-100 ${getBgColor(
                            index
                          )} transition-opacity duration-150 w-6 h-6 rounded-full`}
                          // style={{
                          //   width: `${
                          //     (opinion.count / debateData["1"].totalCounts) *
                          //     100
                          //   }%`,
                          // }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
                <div className="flex justify-end my-2">
                  <button className="text-sm py-1 bg-primary text-white font-bold rounded-md px-3">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
        <Card className="gap-1 font-openSans duration-100 bg-background border-none hover:bg-muted/20">
          <div className="flex justify-between px-1.5 py-1">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold rounded-full bg-accent w-6 h-6 flex items-center justify-center text-background">
                {debateData["1"].category.toUpperCase()[0]}
              </h2>

              <h2 className="flex items-center gap-2 text-xs font-semibold text-foreground/70">
                {debateData["1"].author}
              </h2>
              <span className="text-2xs text-foreground/70">
                @Food · {debateData["1"].createdAt}
              </span>
            </div>
            {/* <div className="popular font-semibold flex  items-center gap-1">
              <Users2 color="grey" className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span className="text-xs text-gray-500">
                {debateData["1"].totalCounts}
              </span>
            </div> */}
          </div>

          <div className="flex flex-col min-h-36 h-full ">
            <div className="flex justify-center bg-muted/50 rounded-xl border border-foreground/10">
              <Image
                src="/feedSampleImage.jpg"
                alt={debateData["1"].title}
                width={550}
                height={550}
                className="object-cover"
              />
            </div>
            <div className="text-xs p-2">{debateData["1"].content}</div>
          </div>
          <div className="flex flex-col justify-between px-3 ">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2 w-1/2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <div className="flex overflow-hidden gap-1">
                    {debateData["1"].opinions.map((opinion, index) => (
                      <div
                        key={opinion.id}
                        className={`opacity-50 hover:opacity-100 ${getBgColor(
                          index
                        )} transition-opacity duration-150 w-6 h-6 rounded-full`}
                        // style={{
                        //   width: `${
                        //     (opinion.count / debateData["1"].totalCounts) *
                        //     100
                        //   }%`,
                        // }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
              <div className="flex justify-end my-2">
                <button className="text-sm py-1 bg-primary text-white font-bold rounded-md px-3">
                  Join
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
