"use client";

import { Button } from "@/components/ui/button";
import { MailCheck, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VerifyRequestPage() {
  const [resent, setResent] = useState(false);

  // 실제 구현에서는 이메일 재전송 API 호출 필요!
  const handleResend = () => {
    setResent(true);
    // TODO: 이메일 재전송 API 호출
    setTimeout(() => setResent(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <MailCheck className="h-12 w-12 text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">이메일을 확인해주세요</h1>
        <p className="text-gray-600 mb-6">
          인증을 위해 입력하신 이메일로
          <span className="font-semibold text-blue-600">로그인 링크</span>를
          전송했어요.
          <br />
          메일함(스팸함 포함)을 확인하고, 링크를 클릭해 로그인 절차를
          완료해주세요.
        </p>
        {/* <Button
          onClick={handleResend}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 mb-3"
          disabled={resent}
        >
          <RefreshCw className="h-4 w-4" />
          {resent ? "재전송 완료!" : "이메일 다시 받기"}
        </Button> */}
        <Link href="/">
          <Button variant="secondary" className="w-full">
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-sm text-side-a">
        인증 메일이 오지 않았다면, 스팸함도 꼭 확인해주세요!
      </p>
    </div>
  );
}
