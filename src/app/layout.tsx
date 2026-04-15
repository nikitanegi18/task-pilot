import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CopilotPanel } from "@/components/features/CopilotPanel";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskPilot - AI-Augmented Workspace",
  description: "An AI-powered task management workspace built for productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 overflow-hidden selection:bg-indigo-500/30">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Sidebar />
            <div className="flex h-screen flex-1 flex-col md:pl-64 relative">
              <Header />
              <main className="flex-1 overflow-auto bg-transparent">{children}</main>
            </div>
            <CopilotPanel />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
