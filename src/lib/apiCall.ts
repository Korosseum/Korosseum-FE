import { RequestOptions } from "http";

class ApiCall {
  apiUrl = "http://localhost:4000";

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async get(url: string, options: RequestInit) {
    let response = await fetch(this.apiUrl + url, options);

    const isValid = await this.authCheck(response);
    if (!isValid) {
      await fetch("/api/auth/signIn");
      response = await fetch(this.apiUrl + url, options);
    }
    return this.responseHandler(response);
  }

  async post(
    url: string,
    { body, headers }: { body?: Record<string, any>; headers?: any }
  ) {
    const defaultOptions = {
      credentials: "include" as const,
      body: JSON.stringify(body),
    };

    // 사용자 옵션과 기본 옵션 병합
    const mergedOptions = {
      ...defaultOptions,
    };

    // 폼데이터 체크 폼 데이터일 경우 stringify 하지 않음
    const isFormData = body instanceof FormData;

    let response = await fetch(this.apiUrl + url, {
      ...mergedOptions,
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
    });

    const isValid = await this.authCheck(response);
    if (!isValid) {
      await fetch("/api/auth/signIn");
      response = await fetch(this.apiUrl + url, {
        ...mergedOptions,
        method: "POST",
        body: JSON.stringify(body),
      });
    }
    return this.responseHandler(response);
  }

  // access token 만료 체크
  authCheck(response: Response) {
    if (response.status === 401) {
      return false;
    }
    return true;
  }

  async responseHandler(response: Response) {
    if (!response.ok) {
      return {};
      //   todo: 에러 팝업
    }
    return response.json();
  }
}

const apiCall = new ApiCall(process.env.API_URL || "http://localhost:4000");

export default apiCall;
