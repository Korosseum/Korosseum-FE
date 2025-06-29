import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Users, MessageCircle } from "lucide-react";
import Link from "next/link";

interface DebateCardProps {
  debateId: string;
  title: string;
  sideA: string;
  sideB: string;
  sideACount: number;
  sideBCount: number;
  totalArguments: number;
  isActive: boolean;
  createdAt: string;
  onJoin?: (debateId: string) => void;
}

export function DebateCard({
  debateId,
  title,
  sideA,
  sideB,
  sideACount,
  sideBCount,
  totalArguments,
  isActive,
  createdAt,
  onJoin,
}: DebateCardProps) {
  const totalParticipants = sideACount + sideBCount;
  const sideAPercentage =
    totalParticipants > 0
      ? Math.round((sideACount / totalParticipants) * 100)
      : 50;
  const sideBPercentage = 100 - sideAPercentage;

  const handleJoin = () => {
    if (onJoin) {
      onJoin(debateId);
    }
  };

  return (
    <Card className="debate-transition hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {isActive && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              진행중
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* VS Section */}
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <div className="py-3 px-4 rounded-lg side-a-light debate-transition hover:scale-105">
              <div className="font-medium">{sideA}</div>
              <div className="text-sm mt-1">
                {sideACount}명 ({sideAPercentage}%)
              </div>
            </div>
          </div>

          <div className="px-4">
            <span className="text-2xl font-bold text-muted-foreground">VS</span>
          </div>

          <div className="flex-1 text-center">
            <div className="py-3 px-4 rounded-lg side-b-light debate-transition hover:scale-105">
              <div className="font-medium">{sideB}</div>
              <div className="text-sm mt-1">
                {sideBCount}명 ({sideBPercentage}%)
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral/20 rounded-full h-2 overflow-hidden">
          <div className="h-full flex">
            <div
              className="side-a debate-transition"
              style={{ width: `${sideAPercentage}%` }}
            />
            <div
              className="side-b debate-transition"
              style={{ width: `${sideBPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{totalParticipants}명 참여</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{totalArguments}개 논증</span>
            </div>
          </div>
          <span>{createdAt}</span>
        </div>

        {/* Join Button */}
        <Link href={`/debate/${debateId}/position`}>
          <Button
            className="w-full debate-transition hover:scale-105"
            variant={isActive ? "default" : "outline"}
            onClick={handleJoin}
          >
            {isActive ? "토론 참여하기" : "토론 보기"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
