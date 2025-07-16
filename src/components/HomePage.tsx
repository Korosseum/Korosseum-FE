"use client";

import { Users2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { getBgColor } from "@/lib/utils";
import { motion } from "framer-motion";

interface HomePageProps {
  onJoinDebate?: (debateId: string) => void;
}

// Mock debate data - moved inline to fix import issues
const debateData = {
  "1": {
    id: "1",
    title: "근본 중국집 음식은?",
    sideA: "짜장면",
    sideB: "짬뽕",
    totalCounts: 250,
    totalArguments: 89,
    isActive: true,
    createdAt: "2시간 전",
    category: "Food",
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
  return (
    <div>
      <div>
        <div className="grid grid-cols-3 p-4 will-change-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              boxShadow: "0 3px 10px 3px hsl(255, 0%, 100%)",
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            whileHover={{
              boxShadow: "0 3px 10px 3px hsl(255, 0%, 93%)",

              scale: 1.01,
              transition: {
                duration: 0.2,
              },
            }}
            transition={{
              scale: { duration: 0.2 },
              boxShadow: { duration: 0.2 },
            }}
            className="rounded-xl will-change-auto"
          >
            <Card className="h-48 p-3 gap-3 font-openSans ">
              <div className="flex justify-between">
                <Badge variant="destructive" className="category text-2xs">
                  {debateData["1"].category}
                </Badge>
                <div className="popular text-destructive font-semibold flex items-center gap-1">
                  <Users2 className="w-3 h-3" />
                  <span className="text-2xs">
                    {debateData["1"].totalCounts}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between px-3 h-full">
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold">{debateData["1"].title}</h2>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-col gap-2 bg-muted p-0.5 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    >
                      <div className="flex h-1.5 rounded-full overflow-hidden ">
                        {debateData["1"].opinions.map((opinion, index) => (
                          <div
                            key={opinion.id}
                            className={`${getBgColor(index)} h-full`}
                            style={{
                              width: `${
                                (opinion.count / debateData["1"].totalCounts) *
                                100
                              }%`,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  <div className="flex justify-end my-2">
                    <button className="text-xs py-1 bg-primary text-white font-semibold rounded-md px-3">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
