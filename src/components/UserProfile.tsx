"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { apiClient } from "@/lib/api-client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface UserProfile {
  id: string;
  email: string;
  nickname: string;
  role: string;
  createdAt: string;
}

export function UserProfile() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [error, setError] = useState<string | null>(null);

  // 프로필 조회
  const fetchProfile = async () => {
    if (!session) return;

    try {
      setLoading(true);
      setError(null);

      const result = await apiClient.getUserProfile();
      setProfile(result.user);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "프로필 조회에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  // 닉네임 업데이트
  const updateNickname = async () => {
    if (!newNickname.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const result = await apiClient.updateUserNickname(newNickname);
      setProfile(result.user);
      setNewNickname("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "닉네임 업데이트에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchProfile();
    }
  }, [session]);

  if (status === "loading") {
    return <div>로딩 중...</div>;
  }

  if (!session) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>사용자 프로필</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}

        {loading ? (
          <div>처리 중...</div>
        ) : profile ? (
          <div className="space-y-2">
            <div>
              <strong>이메일:</strong> {profile.email}
            </div>
            <div>
              <strong>닉네임:</strong> {profile.nickname}
            </div>
            <div>
              <strong>역할:</strong> {profile.role}
            </div>
            <div>
              <strong>가입일:</strong>{" "}
              {new Date(profile.createdAt).toLocaleDateString()}
            </div>
          </div>
        ) : (
          <div>프로필 정보를 불러올 수 없습니다.</div>
        )}

        <div className="space-y-2">
          <Input
            type="text"
            placeholder="새 닉네임"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            disabled={loading}
          />
          <Button
            onClick={updateNickname}
            disabled={loading || !newNickname.trim()}
            className="w-full"
          >
            닉네임 변경
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
