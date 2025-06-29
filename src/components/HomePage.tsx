"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { DebateCard } from "./DebateCard";
import { PieChart } from "./PieChart";
import {
  Users,
  MessageCircle,
  Trophy,
  TrendingUp,
  Plus,
  Search,
} from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

interface HomePageProps {
  onJoinDebate?: (debateId: string) => void;
}

// Mock debate data - moved inline to fix import issues
const debateData = {
  "1": {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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

export function HomePage({ onJoinDebate }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debates = Object.values(debateData);

  const filteredDebates = debates.filter(
    (debate) =>
      debate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      debate.sideA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      debate.sideB.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeDebates = filteredDebates.filter((debate) => debate.isActive);
  const endedDebates = filteredDebates.filter((debate) => !debate.isActive);

  const totalParticipants = debates.reduce(
    (sum, debate) => sum + debate.sideACount + debate.sideBCount,
    0
  );
  const totalArguments = debates.reduce(
    (sum, debate) => sum + debate.totalArguments,
    0
  );

  const mostPopularDebate = debates.reduce((prev, current) =>
    prev.sideACount + prev.sideBCount > current.sideACount + current.sideBCount
      ? prev
      : current
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🔥 실시간 토론 현황</h1>
        <p className="text-muted-foreground">
          다양한 주제의 토론에 참여하고 여러분의 의견을 나눠보세요
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">활성 토론</p>
                <p className="text-2xl font-bold">{activeDebates.length}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">총 참여자</p>
                <p className="text-2xl font-bold">
                  {totalParticipants.toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">총 논증</p>
                <p className="text-2xl font-bold">
                  {totalArguments.toLocaleString()}
                </p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">참여율</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>토론 찾기</span>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600"
                >
                  <Plus className="h-4 w-4 mr-1" />새 토론 만들기
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="토론 주제, 키워드로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Debates */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                🟢 실시간 진행중 ({activeDebates.length})
              </h2>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700"
              >
                LIVE
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeDebates.length === 0 ? (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  검색 결과가 없습니다.
                </div>
              ) : (
                activeDebates.map((debate) => (
                  <DebateCard
                    key={debate.id}
                    debateId={debate.id}
                    title={debate.title}
                    sideA={debate.sideA}
                    sideB={debate.sideB}
                    sideACount={debate.sideACount}
                    sideBCount={debate.sideBCount}
                    totalArguments={debate.totalArguments}
                    isActive={debate.isActive}
                    createdAt={debate.createdAt}
                    onJoin={onJoinDebate}
                  />
                ))
              )}
            </div>
          </div>

          {/* Separator */}
          <Separator />

          {/* Ended Debates */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                ⚫ 종료된 토론 ({endedDebates.length})
              </h2>
              <Badge variant="outline">결과 보기</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {endedDebates.length === 0 ? (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  종료된 토론이 없습니다.
                </div>
              ) : (
                endedDebates.map((debate) => (
                  <DebateCard
                    key={debate.id}
                    debateId={debate.id}
                    title={debate.title}
                    sideA={debate.sideA}
                    sideB={debate.sideB}
                    sideACount={debate.sideACount}
                    sideBCount={debate.sideBCount}
                    totalArguments={debate.totalArguments}
                    isActive={debate.isActive}
                    createdAt={debate.createdAt}
                    onJoin={onJoinDebate}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Hot Topic */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                🔥 가장 인기있는 토론
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h3 className="font-medium text-sm leading-tight">
                  {mostPopularDebate.title}
                </h3>
                <PieChart
                  sideACount={mostPopularDebate.sideACount}
                  sideBCount={mostPopularDebate.sideBCount}
                  sideALabel={mostPopularDebate.sideA}
                  sideBLabel={mostPopularDebate.sideB}
                />
                <div className="text-xs text-muted-foreground text-center">
                  총{" "}
                  {mostPopularDebate.sideACount + mostPopularDebate.sideBCount}
                  명 참여
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📊 오늘의 통계</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>새로운 토론</span>
                <span className="font-semibold">12개</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>신규 참여자</span>
                <span className="font-semibold">487명</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>작성된 논증</span>
                <span className="font-semibold">1,234개</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>진행 중인 토론</span>
                <span className="font-semibold">{activeDebates.length}개</span>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💡 토론 가이드</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <p>• 상대방을 존중하며 예의있게 토론하세요</p>
              <p>• 근거있는 논증을 제시해주세요</p>
              <p>• 개인적인 공격은 금지합니다</p>
              <p>• 다양한 관점을 수용하세요</p>
              <p>• 건전한 토론 문화를 만들어가요</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
