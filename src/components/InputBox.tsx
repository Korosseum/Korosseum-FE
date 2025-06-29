import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Send, MessageSquare, FileText } from "lucide-react";

interface InputBoxProps {
  type: 'argument' | 'chat';
  side?: 'A' | 'B';
  sideLabel?: string;
  placeholder?: string;
  onSubmit?: (content: string) => void;
  maxLength?: number;
  buttonText?: string;
  title?: string;
}

export function InputBox({
  type,
  side,
  sideLabel,
  placeholder,
  onSubmit,
  maxLength = type === 'argument' ? 1000 : 500,
  buttonText,
  title
}: InputBoxProps) {
  const [content, setContent] = useState('');
  
  const sideColor = side === 'A' ? 'side-a' : 'side-b';
  const sideLightColor = side === 'A' ? 'side-a-light' : 'side-b-light';
  
  const defaultPlaceholder = type === 'argument' 
    ? '당신의 논증을 입력하세요. 상대방을 설득할 수 있는 근거와 논리를 제시해주세요.'
    : '팀원들과 대화하세요...';
    
  const defaultButtonText = type === 'argument' ? '논증 제출' : '전송';
  const defaultTitle = type === 'argument' ? '논증 작성' : '채팅';
  
  const icon = type === 'argument' ? <FileText className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />;

  const handleSubmit = () => {
    if (content.trim() && onSubmit) {
      onSubmit(content.trim());
      setContent('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey && type === 'argument') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Enter' && !e.shiftKey && type === 'chat') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            {icon}
            {title || defaultTitle}
          </CardTitle>
          {side && sideLabel && (
            <Badge className={sideLightColor}>
              {sideLabel} 팀
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder || defaultPlaceholder}
          className={`min-h-[100px] resize-none ${type === 'argument' ? 'min-h-[120px]' : ''}`}
          maxLength={maxLength}
        />
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {content.length}/{maxLength}
            {type === 'argument' && (
              <span className="ml-2">Ctrl+Enter로 제출</span>
            )}
          </div>
          
          <Button 
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="debate-transition hover:scale-105"
          >
            <Send className="h-4 w-4 mr-2" />
            {buttonText || defaultButtonText}
          </Button>
        </div>
        
        {type === 'argument' && (
          <p className="text-xs text-muted-foreground">
            논리적이고 설득력 있는 근거를 제시하여 상대방을 설득해보세요.
          </p>
        )}
      </CardContent>
    </Card>
  );
}