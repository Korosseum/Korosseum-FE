import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ArrowLeft,
  Trophy,
  MessageSquare,
  ThumbsUp,
  TrendingUp,
  Calendar,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface MyPageProps {
  onBack?: () => void;
}

interface UserStats {
  totalDebates: number;
  totalArguments: number;
  totalUpvotes: number;
  totalAccepted: number;
  joinDate: string;
  favoritePosition: "A" | "B" | null;
  winRate: number;
}

interface ParticipationHistory {
  id: string;
  title: string;
  side: "A" | "B";
  sideLabel: string;
  result: "win" | "lose" | "ongoing";
  argumentsSubmitted: number;
  upvotesReceived: number;
  acceptedArguments: number;
  participatedAt: string;
}

interface SubmittedArgument {
  id: string;
  debateTitle: string;
  content: string;
  side: "A" | "B";
  sideLabel: string;
  upvotes: number;
  downvotes: number;
  isAccepted: boolean;
  createdAt: string;
}

export function MyPage({ onBack }: MyPageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: session } = useSession();

  const userStats: UserStats = {
    totalDebates: 12,
    totalArguments: 28,
    totalUpvotes: 156,
    totalAccepted: 7,
    joinDate: "2024년 6월",
    favoritePosition: "A",
    winRate: 67,
  };

  const participationHistory: ParticipationHistory[] = [
    {
      id: "1",
      title: "짜장면 vs 짬뽕 - 중국집에서 뭘 시켜먹을까?",
      side: "A",
      sideLabel: "짜장면",
      result: "ongoing",
      argumentsSubmitted: 3,
      upvotesReceived: 24,
      acceptedArguments: 1,
      participatedAt: "2시간 전",
    },
    {
      id: "2",
      title: "치킨 vs 피자 - 야식의 왕은?",
      side: "A",
      sideLabel: "치킨",
      result: "win",
      argumentsSubmitted: 2,
      upvotesReceived: 31,
      acceptedArguments: 2,
      participatedAt: "3일 전",
    },
    {
      id: "3",
      title: "여름휴가 바다 vs 산 - 어디로 갈까?",
      side: "B",
      sideLabel: "산",
      result: "lose",
      argumentsSubmitted: 4,
      upvotesReceived: 18,
      acceptedArguments: 0,
      participatedAt: "1주일 전",
    },
  ];

  const submittedArguments: SubmittedArgument[] = [
    {
      id: "1",
      debateTitle: "짜장면 vs 짬뽕",
      content:
        "짜장면은 달콤한 맛으로 스트레스 해소에 좋고, 면발이 부드러워 소화가 잘 됩니다. 또한 가격대비 양이 많아 가성비가 뛰어납니다.",
      side: "A",
      sideLabel: "짜장면",
      upvotes: 12,
      downvotes: 3,
      isAccepted: true,
      createdAt: "30분 전",
    },
    {
      id: "2",
      debateTitle: "치킨 vs 피자",
      content:
        "치킨은 한국인의 야식 문화에 깊이 뿌리내린 음식으로, 다양한 맛과 부위로 선택의 폭이 넓습니다. 또한 배달이 빠르고 여러 명이 함께 즐기기 좋습니다.",
      side: "A",
      sideLabel: "치킨",
      upvotes: 18,
      downvotes: 2,
      isAccepted: true,
      createdAt: "3일 전",
    },
  ];

  const getResultBadge = (result: string) => {
    switch (result) {
      case "win":
        return <Badge className="bg-green-100 text-green-800">승리</Badge>;
      case "lose":
        return <Badge className="bg-red-100 text-red-800">패배</Badge>;
      case "ongoing":
        return <Badge className="bg-blue-100 text-blue-800">진행중</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          메인으로
        </Button>
      </Link>

      <div className="space-y-6">
        {/* User Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={session?.user.image} />
                <AvatarFallback className="text-lg bg-gradient-to-r from-red-500 to-blue-500 text-white"></AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{session?.user.nickname}</h1>
                <p className="text-muted-foreground">
                  {userStats.joinDate} 가입
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="secondary">
                    {userStats.favoritePosition === "A"
                      ? "A팀 선호"
                      : userStats.favoritePosition === "B"
                      ? "B팀 선호"
                      : "중립적"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    승률 {userStats.winRate}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold">{userStats.totalDebates}</div>
              <div className="text-sm text-muted-foreground">참여한 토론</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">
                {userStats.totalArguments}
              </div>
              <div className="text-sm text-muted-foreground">작성한 논증</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <ThumbsUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{userStats.totalUpvotes}</div>
              <div className="text-sm text-muted-foreground">받은 좋아요</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">
                {userStats.totalAccepted}
              </div>
              <div className="text-sm text-muted-foreground">채택된 논증</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              참여 내역
            </TabsTrigger>
            <TabsTrigger value="arguments" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />내 논증
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>토론 참여 내역</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participationHistory.map((history) => (
                    <div key={history.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium pr-4">{history.title}</h4>
                        {getResultBadge(history.result)}
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Badge
                          className={
                            history.side === "A"
                              ? "side-a-light"
                              : "side-b-light"
                          }
                        >
                          {history.sideLabel} 팀
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {history.participatedAt}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">논증: </span>
                          <span className="font-medium">
                            {history.argumentsSubmitted}개
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            좋아요:{" "}
                          </span>
                          <span className="font-medium">
                            {history.upvotesReceived}개
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">채택: </span>
                          <span className="font-medium">
                            {history.acceptedArguments}개
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="arguments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>내가 작성한 논증</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submittedArguments.map((argument) => (
                    <div key={argument.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">
                              {argument.debateTitle}
                            </span>
                            <Badge
                              className={
                                argument.side === "A"
                                  ? "side-a-light"
                                  : "side-b-light"
                              }
                            >
                              {argument.sideLabel}
                            </Badge>
                            {argument.isAccepted && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Award className="h-3 w-3 mr-1" />
                                채택됨
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {argument.createdAt}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm mb-3 leading-relaxed">
                        {argument.content}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3 text-green-600" />
                          <span>{argument.upvotes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>👎</span>
                          <span>{argument.downvotes}</span>
                        </div>
                        <div className="ml-auto">
                          평점:{" "}
                          {argument.upvotes - argument.downvotes > 0 ? "+" : ""}
                          {argument.upvotes - argument.downvotes}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
