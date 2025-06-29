import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { ArgumentCard } from "./ArgumentCard";
import { ChatPanel } from "./ChatPanel";
import { InputBox } from "./InputBox";
import { PieChart } from "./PieChart";
import {
  ArrowLeft,
  Users,
  MessageCircle,
  Trophy,
  Clock,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

interface DebateRoomProps {
  debateId: string;
  title: string;
  sideA: string;
  sideB: string;
  userSide: "A" | "B";
  onBack?: () => void;
}

interface Argument {
  id: string;
  author: string;
  content: string;
  side: "A" | "B";
  upvotes: number;
  downvotes: number;
  isAccepted: boolean;
  createdAt: string;
  userVote?: "up" | "down" | null;
}

interface ChatMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export function DebateRoom({
  debateId,
  title,
  sideA,
  sideB,
  userSide,
  onBack,
}: DebateRoomProps) {
  const [activeTab, setActiveTab] = useState("arguments");
  const [debateArguments, setDebateArguments] = useState<Argument[]>([
    {
      id: "1",
      author: "김토론",
      content:
        "짜장면은 달콤한 맛으로 스트레스 해소에 좋고, 면발이 부드러워 소화가 잘 됩니다. 또한 가격대비 양이 많아 가성비가 뛰어납니다.",
      side: "A",
      upvotes: 12,
      downvotes: 3,
      isAccepted: true,
      createdAt: "30분 전",
      userVote: null,
    },
    {
      id: "2",
      author: "박논증",
      content:
        "짬뽕은 해산물과 야채가 풍부해 영양가가 높고, 매운맛이 입맛을 돋궈줍니다. 국물이 시원해서 해장용으로도 최고입니다.",
      side: "B",
      upvotes: 15,
      downvotes: 2,
      isAccepted: false,
      createdAt: "25분 전",
      userVote: "up",
    },
    {
      id: "3",
      author: "이주장",
      content:
        "짜장면은 한국인의 소울푸드로, 어린 시절 추억과 연결되어 있어 정서적 만족감이 큽니다. 블랙데이의 상징이기도 하죠.",
      side: "A",
      upvotes: 8,
      downvotes: 5,
      isAccepted: false,
      createdAt: "20분 전",
      userVote: null,
    },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      author: "김토론",
      content:
        "안녕하세요! 짜장면 팀입니다. 다들 어떤 논증을 준비하고 계신가요?",
      timestamp: "14:30",
    },
    {
      id: "2",
      author: "이주장",
      content:
        "저는 감정적 측면에서 접근해보려고 합니다. 추억과 연관성 위주로!",
      timestamp: "14:32",
    },
    {
      id: "3",
      author: "현재유저",
      content: "좋은 아이디어네요! 저는 경제적 측면을 다뤄볼게요.",
      timestamp: "14:35",
    },
  ]);

  const [sideACount, setSideACount] = useState(147);
  const [sideBCount, setSideBCount] = useState(103);

  // Sort arguments by vote score (upvotes - downvotes)
  const sortedArguments = [...debateArguments].sort((a, b) => {
    if (a.isAccepted && !b.isAccepted) return -1;
    if (!a.isAccepted && b.isAccepted) return 1;
    return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
  });

  const teamArguments = sortedArguments.filter((arg) => arg.side === userSide);
  const opponentArguments = sortedArguments.filter(
    (arg) => arg.side !== userSide
  );

  const handleSubmitArgument = (content: string) => {
    const newArgument: Argument = {
      id: Date.now().toString(),
      author: "현재유저",
      content,
      side: userSide,
      upvotes: 0,
      downvotes: 0,
      isAccepted: false,
      createdAt: "방금 전",
      userVote: null,
    };

    setDebateArguments((prev) => [newArgument, ...prev]);
  };

  const handleSendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      author: "현재유저",
      content: message,
      timestamp: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages((prev) => [...prev, newMessage]);
  };

  const handleVote = (argumentId: string, voteType: "up" | "down") => {
    setDebateArguments((prev) =>
      prev.map((arg) => {
        if (arg.id !== argumentId) return arg;

        const currentVote = arg.userVote;
        let newUpvotes = arg.upvotes;
        let newDownvotes = arg.downvotes;
        let newUserVote = currentVote;

        // Remove previous vote
        if (currentVote === "up") newUpvotes--;
        else if (currentVote === "down") newDownvotes--;

        // Add new vote if different
        if (currentVote !== voteType) {
          if (voteType === "up") newUpvotes++;
          else newDownvotes++;
          newUserVote = voteType;
        } else {
          newUserVote = null;
        }

        return {
          ...arg,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote,
        };
      })
    );
  };

  const handleAcceptArgument = (argumentId: string) => {
    setDebateArguments((prev) =>
      prev.map((arg) =>
        arg.id === argumentId ? { ...arg, isAccepted: true } : arg
      )
    );
  };

  const userSideLabel = userSide === "A" ? sideA : sideB;
  const userSideCount = userSide === "A" ? sideACount : sideBCount;
  const sideColor = userSide === "A" ? "side-a" : "side-b";

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/home">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            나가기
          </Button>
        </Link>
        <Badge className={`${sideColor} text-white`}>
          {userSideLabel} 팀 참여중
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Title and Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{title}</CardTitle>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{sideACount + sideBCount}명 참여</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{debateArguments.length}개 논증</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>실시간 진행중</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="arguments"
                className="flex items-center gap-2"
              >
                <Trophy className="h-4 w-4" />
                논증 ({debateArguments.length})
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />팀 채팅 (
                {chatMessages.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="arguments" className="space-y-6">
              {/* Argument Input */}
              <InputBox
                type="argument"
                side={userSide}
                sideLabel={userSideLabel}
                onSubmit={handleSubmitArgument}
              />

              {/* Team Arguments */}
              <div>
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${sideColor}`} />
                  우리 팀 논증 ({teamArguments.length})
                </h3>
                <div className="space-y-4">
                  {teamArguments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      아직 팀 논증이 없습니다. 첫 번째 논증을 작성해보세요!
                    </p>
                  ) : (
                    teamArguments.map((argument) => (
                      <ArgumentCard
                        key={argument.id}
                        {...argument}
                        onVote={handleVote}
                        onAccept={handleAcceptArgument}
                        canAccept={
                          argument.side === userSide && !argument.isAccepted
                        }
                      />
                    ))
                  )}
                </div>
              </div>

              <Separator />

              {/* Opponent Arguments */}
              <div>
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      userSide === "A" ? "side-b" : "side-a"
                    }`}
                  />
                  상대 팀 논증 ({opponentArguments.length})
                </h3>
                <div className="space-y-4">
                  {opponentArguments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      상대 팀의 논증을 기다리고 있습니다...
                    </p>
                  ) : (
                    opponentArguments.map((argument) => (
                      <ArgumentCard
                        key={argument.id}
                        {...argument}
                        onVote={handleVote}
                        canAccept={false}
                      />
                    ))
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              <div className="h-[600px]">
                <ChatPanel
                  side={userSide}
                  sideLabel={userSideLabel}
                  messages={chatMessages}
                  onSendMessage={handleSendMessage}
                  participantCount={userSideCount}
                  currentUser="현재유저"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Live Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4" />
                실시간 현황
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart
                sideACount={sideACount}
                sideBCount={sideBCount}
                sideALabel={sideA}
                sideBLabel={sideB}
              />
            </CardContent>
          </Card>

          {/* Team Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">내 팀 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div
                className={`p-3 rounded-lg ${
                  userSide === "A" ? "side-a-light" : "side-b-light"
                } text-center`}
              >
                <div className="font-medium">{userSideLabel}</div>
                <div className="text-sm mt-1">{userSideCount}명 참여중</div>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• 팀원들과 채팅으로 소통하세요</p>
                <p>• 설득력 있는 논증을 작성하세요</p>
                <p>• 팀 논증에 '채택' 표시를 해주세요</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">토론 통계</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>총 참여자</span>
                <span className="font-medium">{sideACount + sideBCount}명</span>
              </div>
              <div className="flex justify-between">
                <span>총 논증</span>
                <span className="font-medium">{debateArguments.length}개</span>
              </div>
              <div className="flex justify-between">
                <span>채택된 논증</span>
                <span className="font-medium">
                  {debateArguments.filter((a) => a.isAccepted).length}개
                </span>
              </div>
              <div className="flex justify-between">
                <span>내 팀 논증</span>
                <span className="font-medium">{teamArguments.length}개</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
