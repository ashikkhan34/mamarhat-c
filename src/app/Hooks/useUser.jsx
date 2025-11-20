"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function useUser() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed._id) {
          setUserData(parsed._id); // return as string
          return;
        }
      }
    }

    if (session?.user?.email) {
      setUserData(session.user.email);
    }
  }, [session]);

  return userData; // string return hobe
}
