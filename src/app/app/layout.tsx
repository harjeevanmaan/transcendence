import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Transcendence - Meeting Recorder",
  description: "Record and transcribe your meetings with AI",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      {children}
      <TempoInit />
    </>
  );
}
