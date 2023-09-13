import * as React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProviderComponent from "./theme-provider";
import { Providers } from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SED",
  description: "Sistema de Eleição de Diretores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="pt-br">
        <ThemeProviderComponent>
          <body className={inter.className}>{children}</body>
        </ThemeProviderComponent>
      </html>
    </Providers>
  );
}
