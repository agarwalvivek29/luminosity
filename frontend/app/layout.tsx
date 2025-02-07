import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react";
import type { Metadata } from "next";
import MouseMoveEffect from "@/components/mouse-move-effect";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Script from "next/script";
// import Script from "next/script";
// import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devrel",
  description: "Ai powered learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" className="dark">
      <Script src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js" />
        <body
          className={`${inter.className} bg-background text-foreground antialiased`}
        >
          <MouseMoveEffect />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
