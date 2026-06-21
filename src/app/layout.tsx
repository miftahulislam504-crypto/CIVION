import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import IntroLoader from "@/components/IntroLoader";
import IntroProvider from "@/components/IntroProvider";
import CustomCursor from "@/components/CustomCursor";
import AudioProvider from "@/components/AudioProvider";
import AudioToggle from "@/components/AudioToggle";
import SectionPulseTrigger from "@/components/SectionPulseTrigger";
import WorldScene from "@/scenes/WorldScene";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "CIVION — Engineering The Future",
  description:
    "A cinematic civil-engineering experience. Architecture, structures, and intelligent infrastructure.",
  keywords: [
    "civil engineering",
    "structural engineering",
    "portfolio",
    "BNBC 2020",
    "Bangladesh",
  ],
  openGraph: {
    title: "CIVION — Engineering The Future",
    description:
      "A cinematic civil-engineering experience. Architecture, structures, and intelligent infrastructure.",
    type: "website",
    // NOTE: no og-image yet — add /public/og-image.png (1200x630) and an
    // `images: ["/og-image.png"]` entry here, or link previews will show
    // no thumbnail when shared.
  },
  twitter: {
    card: "summary_large_image",
    title: "CIVION — Engineering The Future",
    description:
      "A cinematic civil-engineering experience. Architecture, structures, and intelligent infrastructure.",
  },
};

export const viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-graphite text-soft-white">
        <CustomCursor />
        <AudioProvider>
          <IntroProvider>
            <SmoothScroll>
              <WorldScene />
              <AudioToggle />
              <SectionPulseTrigger />
              <IntroLoader />
              <div className="relative z-10">{children}</div>
            </SmoothScroll>
          </IntroProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
