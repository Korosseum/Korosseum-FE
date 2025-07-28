import { getSession } from "next-auth/react";

// NestJS 서버 기본 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// API 클라이언트 클래스
class ApiClient {
  private async getAuthHeaders() {
    const session = await getSession();

    if (!session) {
      throw new Error("인증되지 않은 사용자입니다.");
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.jwtToken}`, // NextAuth JWT 토큰 사용
    };
  }

  // 유저 프로필 조회
  async getUserProfile() {
    try {
      const headers = await this.getAuthHeaders();

      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error("프로필 조회에 실패했습니다.");
      }

      return await response.json();
    } catch (error) {
      console.error("getUserProfile Error:", error);
      throw error;
    }
  }

  // 유저 닉네임 업데이트
  async updateUserNickname(nickname: string) {
    try {
      const headers = await this.getAuthHeaders();

      const response = await fetch(`${API_BASE_URL}/users/nickname`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ nickname }),
      });

      if (!response.ok) {
        throw new Error("닉네임 업데이트에 실패했습니다.");
      }

      return await response.json();
    } catch (error) {
      console.error("updateUserNickname Error:", error);
      throw error;
    }
  }

  // 포스트 생성
  async createPost(postData: {
    title: string;
    content: string;
    sideA: string;
    sideB: string;
    category: string;
  }) {
    try {
      const headers = await this.getAuthHeaders();

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers,
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("포스트 생성에 실패했습니다.");
      }

      return await response.json();
    } catch (error) {
      console.error("createPost Error:", error);
      throw error;
    }
  }

  // 포스트 목록 조회
  async getPosts(params?: {
    page?: number;
    limit?: number;
    category?: string;
  }) {
    try {
      const headers = await this.getAuthHeaders();

      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.limit) queryParams.append("limit", params.limit.toString());
      if (params?.category) queryParams.append("category", params.category);

      const response = await fetch(`${API_BASE_URL}/posts?${queryParams}`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error("포스트 조회에 실패했습니다.");
      }

      return await response.json();
    } catch (error) {
      console.error("getPosts Error:", error);
      throw error;
    }
  }

  // 의견 작성
  async createOpinion(postId: number, content: string) {
    try {
      const headers = await this.getAuthHeaders();

      const response = await fetch(`${API_BASE_URL}/posts/${postId}/opinions`, {
        method: "POST",
        headers,
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("의견 작성에 실패했습니다.");
      }

      return await response.json();
    } catch (error) {
      console.error("createOpinion Error:", error);
      throw error;
    }
  }
}

// 싱글톤 인스턴스 생성
export const apiClient = new ApiClient();
