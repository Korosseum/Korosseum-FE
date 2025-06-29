import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ThumbsUp, ThumbsDown, Crown, Clock } from "lucide-react";
import { useState } from "react";

interface ArgumentCardProps {
  id: string;
  author: string;
  content: string;
  side: 'A' | 'B';
  upvotes: number;
  downvotes: number;
  isAccepted?: boolean;
  createdAt: string;
  userVote?: 'up' | 'down' | null;
  onVote?: (id: string, voteType: 'up' | 'down') => void;
  onAccept?: (id: string) => void;
  canAccept?: boolean;
}

export function ArgumentCard({
  id,
  author,
  content,
  side,
  upvotes,
  downvotes,
  isAccepted = false,
  createdAt,
  userVote = null,
  onVote,
  onAccept,
  canAccept = false
}: ArgumentCardProps) {
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [currentDownvotes, setCurrentDownvotes] = useState(downvotes);
  const [currentUserVote, setCurrentUserVote] = useState(userVote);

  const handleVote = (voteType: 'up' | 'down') => {
    if (!onVote) return;

    let newUpvotes = currentUpvotes;
    let newDownvotes = currentDownvotes;
    let newUserVote = currentUserVote;

    // Remove previous vote if exists
    if (currentUserVote === 'up') {
      newUpvotes--;
    } else if (currentUserVote === 'down') {
      newDownvotes--;
    }

    // Add new vote if different from current
    if (currentUserVote !== voteType) {
      if (voteType === 'up') {
        newUpvotes++;
      } else {
        newDownvotes++;
      }
      newUserVote = voteType;
    } else {
      newUserVote = null;
    }

    setCurrentUpvotes(newUpvotes);
    setCurrentDownvotes(newDownvotes);
    setCurrentUserVote(newUserVote);
    onVote(id, voteType);
  };

  const sideColor = side === 'A' ? 'side-a' : 'side-b';
  const sideLightColor = side === 'A' ? 'side-a-light' : 'side-b-light';

  return (
    <Card className={`debate-transition ${isAccepted ? 'ring-2 ring-yellow-400' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className={sideLightColor}>
              {author.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{author}</span>
              <Badge 
                variant="secondary" 
                className={`${sideLightColor} text-xs`}
              >
                {side === 'A' ? '팀 A' : '팀 B'}
              </Badge>
              {isAccepted && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Crown className="h-3 w-3 mr-1" />
                  채택됨
                </Badge>
              )}
              <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                <Clock className="h-3 w-3" />
                {createdAt}
              </div>
            </div>
            
            <p className="text-sm leading-relaxed">{content}</p>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant={currentUserVote === 'up' ? 'default' : 'ghost'}
                  className={`h-7 px-2 ${currentUserVote === 'up' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  onClick={() => handleVote('up')}
                >
                  <ThumbsUp className="h-3 w-3" />
                  <span className="ml-1 text-xs">{currentUpvotes}</span>
                </Button>
                
                <Button
                  size="sm"
                  variant={currentUserVote === 'down' ? 'default' : 'ghost'}
                  className={`h-7 px-2 ${currentUserVote === 'down' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                  onClick={() => handleVote('down')}
                >
                  <ThumbsDown className="h-3 w-3" />
                  <span className="ml-1 text-xs">{currentDownvotes}</span>
                </Button>
              </div>
              
              {canAccept && !isAccepted && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 ml-auto"
                  onClick={() => onAccept?.(id)}
                >
                  <Crown className="h-3 w-3 mr-1" />
                  채택
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}