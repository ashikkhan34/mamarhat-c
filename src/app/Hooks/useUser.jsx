"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function useUser() {
  const { data: session } = useSession(); // NextAuth session
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // First check localStorage (normal login)
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed._id) {
          setUserData({ id: parsed._id });
          return;
        }
      }
    }

    // Then check NextAuth session (social login)
    if (session?.user?.email) {
      setUserData({ email: session.user.email });
    }
  }, [session]);

  return userData; // { id } or { email } or null
}
