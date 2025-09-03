class ApiCall {
  apiUrl = "/back-end";

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async get(url: string, options?: RequestInit) {
    const defaultOptions: RequestInit = {
      credentials: "include" as const,
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
    };
    let response = await fetch(this.apiUrl + url, mergedOptions);

    const isValid = await this.authCheck(response);
    if (!isValid) {
      await fetch("/api/auth/signIn");
      response = await fetch(this.apiUrl + url, options);
    }
    return await this.responseHandler(response);
  }

  async post(
    url: string,
    { body, headers }: { body?: Record<string, any>; headers?: any }
  ) {
    let defaultOptions: RequestInit = {
      credentials: "include" as const,
      body: JSON.stringify(body),
    };
    if (headers) {
      defaultOptions.headers = headers;
    }

    // JSON 체크 후 헤더에 content-type 추가
    const isFormData = body instanceof FormData;
    const isBlob = body instanceof Blob;
    const isFile = body instanceof File;
    const isSearchParams = body instanceof URLSearchParams;
    const isJson = !(isFormData || isBlob || isFile || isSearchParams);
    if (isJson) {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        "Content-Type": "application/json",
      };
    }

    // 사용자 옵션과 기본 옵션 병합
    const mergedOptions = {
      ...defaultOptions,
    };

    let response = await fetch(this.apiUrl + url, {
      ...mergedOptions,
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
    });

    console.log("✨response", response);

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
      console.log("✨response error");
      return {};
      //   todo: 에러 팝업
    }

    return response.json();
  }
}

const apiCall = new ApiCall(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
);

export default apiCall;
