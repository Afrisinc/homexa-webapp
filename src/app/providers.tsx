"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

interface ProvidersProps {
  children: React.ReactNode;
}

function AuthInitializer({ children }: ProvidersProps) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    // Initialize auth store from localStorage on app load
    initialize();
  }, [initialize]);

  return <>{children}</>;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      defaultTheme="system"
      disableTransitionOnChange
    >
      <AuthInitializer>{children}</AuthInitializer>
    </ThemeProvider>
  );
}
