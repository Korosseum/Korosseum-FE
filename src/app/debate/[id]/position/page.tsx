"use client";

import { PositionSelection } from "@/components/PositionSelection";
import { Navigation } from "@/components/Navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Mock debate data - moved inline to fix import issues
const debateData = {
  "1": {
    title: "짜장면 vs 짬뽕 - 중국집에서 뭘 시켜먹을까?",
    sideA: "짜장면",
    sideB: "짬뽕",
    sideACount: 147,
    sideBCount: 103,
    totalArguments: 89,
    isActive: true,
    createdAt: "2시간 전",
  },
  "2": {
    title: "치킨 vs 피자 - 야식의 왕은?",
    sideA: "치킨",
    sideB: "피자",
    sideACount: 203,
    sideBCount: 178,
    totalArguments: 124,
    isActive: true,
    createdAt: "5시간 전",
  },
  "3": {
    title: "여름휴가 바다 vs 산 - 어디로 갈까?",
    sideA: "바다",
    sideB: "산",
    sideACount: 89,
    sideBCount: 76,
    totalArguments: 45,
    isActive: true,
    createdAt: "1일 전",
  },
  "4": {
    title: "재택근무 vs 출근 - 더 효율적인 근무 방식은?",
    sideA: "재택근무",
    sideB: "출근",
    sideACount: 312,
    sideBCount: 189,
    totalArguments: 203,
    isActive: false,
    createdAt: "3일 전",
  },
};

interface DebateData {
  title: string;
  sideA: string;
  sideB: string;
  sideACount: number;
  sideBCount: number;
  totalArguments: number;
  isActive: boolean;
  createdAt: string;
}

export default function PositionPage() {
  const params = useParams();
  const [debate, setDebate] = useState<DebateData | null>(null);
  const debateId = params.id as string;

  useEffect(() => {
    const debateInfo = debateData[debateId as keyof typeof debateData];
    setDebate(debateInfo || null);
  }, [debateId]);

  if (!debate) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation currentPage="debate" />
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-muted-foreground">
            토론을 찾을 수 없습니다
          </h1>
          <p className="mt-4 text-muted-foreground">
            존재하지 않는 토론입니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="debate" />
      <main className="debate-transition">
        <PositionSelection
          debateId={debateId}
          title={debate.title}
          sideA={debate.sideA}
          sideB={debate.sideB}
          sideACount={debate.sideACount}
          sideBCount={debate.sideBCount}
          totalArguments={debate.totalArguments}
          createdAt={debate.createdAt}
        />
      </main>
    </div>
  );
}
