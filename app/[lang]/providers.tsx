"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/app/dbcontext/UserDbContext";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <>
      <UserProvider>
        <NextThemesProvider {...themeProps}>
          <SessionProvider>
            <NextUIProvider>{children}</NextUIProvider>
          </SessionProvider>
        </NextThemesProvider>
      </UserProvider>
    </>
  );
}
