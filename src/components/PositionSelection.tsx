import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PieChart } from "./PieChart";
import {
  ArrowLeft,
  Users,
  MessageCircle,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface PositionSelectionProps {
  debateId: string;
  title: string;
  sideA: string;
  sideB: string;
  sideACount: number;
  sideBCount: number;
  totalArguments: number;
  createdAt: string;
  onSelectSide?: (side: "A" | "B") => void;
  onBack?: () => void;
}

export function PositionSelection({
  debateId,
  title,
  sideA,
  sideB,
  sideACount,
  sideBCount,
  totalArguments,
  createdAt,
  onSelectSide,
  onBack,
}: PositionSelectionProps) {
  const [selectedSide, setSelectedSide] = useState<"A" | "B" | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const totalParticipants = sideACount + sideBCount;
  const sideAPercentage =
    totalParticipants > 0
      ? Math.round((sideACount / totalParticipants) * 100)
      : 50;
  const sideBPercentage = 100 - sideAPercentage;

  const handleSideSelection = (side: "A" | "B") => {
    setSelectedSide(side);
    setIsConfirming(true);
  };

  const handleConfirm = () => {
    if (selectedSide) {
      if (onSelectSide) {
        onSelectSide(selectedSide);
      } else {
        // Default behavior: navigate to room
        window.location.href = `/debate/${debateId}/room?side=${selectedSide}`;
      }
    }
  };

  const handleCancel = () => {
    setSelectedSide(null);
    setIsConfirming(false);
  };

  if (isConfirming && selectedSide) {
    const chosenSide = selectedSide === "A" ? sideA : sideB;
    const chosenColor = selectedSide === "A" ? "side-a" : "side-b";
    const chosenLightColor =
      selectedSide === "A" ? "side-a-light" : "side-b-light";

    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Button variant="ghost" onClick={handleCancel} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          다시 선택하기
        </Button>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>선택 확인</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-xl mb-2">{title}</h2>
              <p className="text-muted-foreground">아래 팀을 선택하셨습니다:</p>
            </div>

            <div
              className={`p-6 rounded-lg ${chosenLightColor} border-2 border-dashed`}
            >
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${chosenColor} text-white`}
              >
                <span className="text-lg font-bold">{chosenSide}</span>
                <Badge variant="secondary" className="bg-white text-black">
                  {selectedSide === "A" ? `${sideACount}명` : `${sideBCount}명`}{" "}
                  참여중
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                팀을 선택하면 해당 팀의 채팅방에 참여하고, 논증을 제출할 수
                있습니다.
              </p>
              <p className="text-sm text-muted-foreground">
                한 번 선택한 팀은 변경할 수 없으니 신중히 선택해주세요.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                다시 선택
              </Button>
              <Link
                href={`/debate/${debateId}/room?side=${selectedSide}`}
                className="flex-1"
              >
                <Button className={`w-full ${chosenColor} hover:opacity-90`}>
                  {chosenSide} 팀 참여하기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Link href="/home">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          토론 목록으로
        </Button>
      </Link>

      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground">
            어느 쪽을 지지하시나요? 팀을 선택해서 토론에 참여하세요!
          </p>

          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{totalParticipants}명 참여</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{totalArguments}개 논증</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{createdAt}</span>
            </div>
          </div>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4 text-center">
              현재 참여 현황
            </h3>
            <PieChart
              sideACount={sideACount}
              sideBCount={sideBCount}
              sideALabel={sideA}
              sideBLabel={sideB}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center">팀을 선택하세요</h3>

            {/* Side A */}
            <Card
              className="cursor-pointer debate-transition hover:shadow-lg hover:scale-105 side-a-light border-2 hover:border-red-300"
              onClick={() => handleSideSelection("A")}
            >
              <CardContent className="p-6 text-center">
                <div className="side-a text-white rounded-lg p-4 mb-4">
                  <h4 className="text-xl font-bold">{sideA}</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {sideACount}명 ({sideAPercentage}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>
                        {sideAPercentage > sideBPercentage ? "우세" : "열세"}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full side-a hover:opacity-90"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSideSelection("A");
                    }}
                  >
                    {sideA} 팀 선택
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center py-2">
              <span className="text-xl font-bold text-muted-foreground">
                VS
              </span>
            </div>

            {/* Side B */}
            <Card
              className="cursor-pointer debate-transition hover:shadow-lg hover:scale-105 side-b-light border-2 hover:border-blue-300"
              onClick={() => handleSideSelection("B")}
            >
              <CardContent className="p-6 text-center">
                <div className="side-b text-white rounded-lg p-4 mb-4">
                  <h4 className="text-xl font-bold">{sideB}</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {sideBCount}명 ({sideBPercentage}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>
                        {sideBPercentage > sideAPercentage ? "우세" : "열세"}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full side-b hover:opacity-90"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSideSelection("B");
                    }}
                  >
                    {sideB} 팀 선택
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tips */}
        <Card className="bg-gradient-to-r from-red-50 to-blue-50">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">💡 토론 참여 안내</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                • 팀을 선택하면 해당 팀의 전용 채팅방에 참여할 수 있습니다
              </li>
              <li>• 논증을 작성하여 다른 참가자들의 투표를 받을 수 있습니다</li>
              <li>• 다른 팀의 논증에 좋아요/싫어요로 평가할 수 있습니다</li>
              <li>• 한 번 선택한 팀은 변경할 수 없으니 신중히 선택하세요</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
