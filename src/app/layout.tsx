import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@fontsource-variable/manrope";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/600.css";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SIHDemoController } from "@/components/sih-demo";

export const metadata: Metadata = {
  title: {
    default: "ScholarSync | Unified Scholarship Services for Tribal Students",
    template: "%s | ScholarSync",
  },
  description:
    "Discover, apply, verify and track MoTA scholarship services in one place. ScholarSync — One Scholarship. One Sync. Smart India Hackathon 2026 prototype for Problem Statement 26238.",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const language =
    (await cookies()).get("scholarsync-language")?.value === "hi" ? "hi" : "en";
  return (
    <html
      lang={language}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <Providers initialLanguage={language}>
          {children}
          <SIHDemoController />
        </Providers>
      </body>
    </html>
  );
}
