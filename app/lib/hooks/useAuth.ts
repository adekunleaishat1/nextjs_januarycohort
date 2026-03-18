"use client";

import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("isSignedIn");
    if (!stored) {
      setIsSignedIn(false);
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setIsSignedIn(!!parsed?.isSignedIn);
    } catch {
      localStorage.removeItem("isSignedIn");
      setIsSignedIn(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("isSignedIn");
    setIsSignedIn(false);
  };

  return { isSignedIn, logout };
};
