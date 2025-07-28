import type { NextAuthConfig } from "next-auth";
import { cookies } from "next/headers";

export default {
  // JWT 콜백: access_token/refresh_token 관리, 닉네임 처리, provider별 토큰 갱신 등 핵심 인증 로직
  async jwt({ token, user, account, profile }) {
    // 1. user 객체가 있으면(첫 로그인 또는 재로그인)
    if (user) {
      if (user.role) token.role = user.role;
      if (user.nickname) {
        // 1-1. DB에 닉네임이 있으면 토큰에 닉네임 저장(재로그인)
        token.nickname = user.nickname;
      } else {
        // 1-2. DB에 닉네임이 없으면(첫 로그인) 닉네임 생성 API 호출
        // 랜덤 닉네임 생성 요청 (형용사+명사+숫자)
        const url = `${process.env.API_URL}/user/${token.sub}/generateNickname`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();

        // 닉네임 생성 성공 시 토큰에 저장, 실패 시 에러 발생
        if (result.status == "success") {
          token.nickname = result.data.nickname;
        } else {
          throw new Error("닉네임 생성 요청 실패");
        }
      }
    }

    // 디버깅용 로그(토큰/계정 정보)
    (await cookies()).set("user_session", token.sub as string);
    // console.log("🔥account", account);

    // 2. account 객체가 있으면(로그인 직후, provider 인증 성공)
    if (account) {
      // accessToken, refreshToken, expiresAt, provider 정보 토큰에 저장
      return {
        ...token,
        accessToken: account.access_token, // access_token(외부 API 호출용)
        refreshToken: account.refresh_token, // refresh_token(토큰 갱신용)
        expiresAt: account.expires_at, // access_token 만료 시각(초 단위)
        provider: account.provider, // 어떤 provider(google, kakao 등)로 로그인했는지
      };
    } else if (Date.now() < (token.expires_at as number) * 1000) {
      // 3. access_token이 아직 유효하면 기존 토큰 그대로 반환(세션 유지)
      return token;
    } else {
      // 4. access_token이 만료된 경우(refresh_token rotation 시도)
      if (!token.refreshToken) throw new TypeError("Missing refresh_token");

      try {
        let tokenUrl: string | undefined;
        // 기본 파라미터
        let body: Record<string, string> = {
          grant_type: "refresh_token",
          refresh_token: token.refreshToken as string,
        };

        // provider별로 토큰 갱신 endpoint/body 분기
        if (token.provider == "kakao") {
          // 카카오 토큰 갱신 endpoint 및 파라미터
          tokenUrl = "https://kauth.kakao.com/oauth/token";
          body = { ...body, client_id: process.env.AUTH_KAKAO_ID! };
        }
        if (token.provider == "google") {
          // 구글 토큰 갱신 endpoint 및 파라미터
          tokenUrl = "https://oauth2.googleapis.com/token";
          body = {
            ...body,
            client_id: process.env.AUTH_GOOGLE_ID!,
            client_secret: process.env.AUTH_GOOGLE_SECRET!,
          };
        }
        // todo: 네이버 토큰 갱신 추가

        // provider별로 세팅된 endpoint/body로 토큰 갱신 요청
        if (tokenUrl && body) {
          const response = await fetch(tokenUrl, {
            method: "POST",
            body: new URLSearchParams(body),
          });

          const tokensOrError = await response.json();

          // console.log("🔥tokensOrError", tokensOrError);

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          // 새 access_token, expires_at, refresh_token(있으면) 갱신해서 반환
          return {
            ...token,
            access_token: newTokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
            refresh_token: newTokens.refresh_token
              ? newTokens.refresh_token
              : token.refresh_token, // 새 refresh_token 없으면 기존 값 유지
          };
        }
      } catch (error) {
        console.log("🔥error");
        // 토큰 갱신 실패 시 에러 로그 및 세션에 에러 플래그 저장
        console.error("Error refreshing access_token", error);
        token.error = "RefreshTokenError";
        return token;
      }
    }

    // 기본적으로 기존 토큰 반환(예외 상황)
    return token;
  },
  // 세션 콜백: 클라이언트에서 사용할 세션 객체 커스텀(닉네임 등 추가)
  async session({ session, user, token }) {
    // 토큰에 닉네임이 있으면 세션에 복사(클라이언트에서 사용 가능)
    if (token.role) session.user.role = token.role as string;
    if (token.nickname) session.user.nickname = token.nickname as string;

    // JWT 토큰을 세션에 추가 (NestJS 서버 통신용)
    if (token.access_token) {
      session.jwtToken = token.access_token as string;
    }

    // 토큰에 에러 플래그가 있으면 세션에도 복사(에러 핸들링용)
    session.error = token.error as string;

    return session;
  },
} satisfies NextAuthConfig["callbacks"];
