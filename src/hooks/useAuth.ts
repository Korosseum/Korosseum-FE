import { SessionData } from "@/lib/session";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState<SessionData["user"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const response = await fetch("/api/auth/signIn?name=user");
      const userData = await response.json();

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

  const logOut = async () => {
    const response = await fetch("/api/auth/signOut");

    console.log("response", response);

    if (response.ok) {
      setUser(null);
    }
  };

  return { user, loading, logOut };
}
