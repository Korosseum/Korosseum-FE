import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  cookieName: "korosseum_session",
  password: process.env.SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // HTTPS에서만 쿠키 전송 (production일 때만 true)
    httpOnly: true, // 클라이언트 JavaScript에서 쿠키 접근 차단
    sameSite: "lax", // 사용자가 외부 사이트의 링크를 클릭해 사이트에 들어올 때 쿠키가 전송됨
    maxAge: 60 * 60 * 24, // 최대 유효기간(1일)
    path: "/", // 쿠키가 유효한 경로 (기본값: 사이트 전체에 대해 유효)
  },
};

export interface SessionData {
  user: {
    provider: string;
    email: string;
    nickname: string;
    photo: string;
  };
}

export const defaultSession: SessionData = {
  user: {
    provider: "",
    email: "",
    nickname: "",
    photo: "",
  },
};
