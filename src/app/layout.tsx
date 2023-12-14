import * as React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProviderComponent from "./theme-provider";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/sessionProvider/SessionProvider";
import { UserContextProvider } from "@/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock Genius - SEMED",
  description: "Sistema de Gestão de Materiais",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="pt-br">
      <ThemeProviderComponent>
        <body className={inter.className}>
          <UserContextProvider>
            <SessionProvider session={session}>{children}</SessionProvider>
          </UserContextProvider>
        </body>
      </ThemeProviderComponent>
    </html>
  );
}
