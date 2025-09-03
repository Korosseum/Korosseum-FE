import { SessionData } from "@/lib/session";
import { useEffect, useState } from "react";
import userStore from "@/stores/auth";

export default function useAuth() {
  // const [user, setUser] = useState<SessionData["user"] | null>(null);
  // const [loading, setLoading] = useState(true);

  const { user, setUser, loading, setLoading, logOut } = userStore();

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const response = await fetch("/api/auth/signIn?name=user");

      console.log("response", response);
      const userData = await response.json();
      console.log("userData", userData);

      if (userData) {
        setUser(userData);
      } else {
        logOut();
      }

      console.log("userData", userData);
      setLoading(false);

      console.log(user);
    };

    getSession();
  }, []);

  const handleLogOut = async () => {
    const response = await fetch("/api/auth/signOut");

    if (response.ok) {
      logOut();

      // 로그아웃 후 페이지 새로고침
    }
  };

  return { user, loading, logOut: handleLogOut };
}
