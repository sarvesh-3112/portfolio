import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sri Sarvesh R | Software Engineer & Full Stack Developer",
  description:
    "CS undergraduate from Tamil Nadu specialising in Java, Python, Next.js and FastAPI. Building scalable full-stack applications and AI-powered platforms.",
  keywords: [
    "Sri Sarvesh",
    "Software Engineer",
    "Full Stack Developer",
    "Java Developer",
    "Next.js",
    "FastAPI",
    "Tamil Nadu",
    "Portfolio",
  ],
  authors: [{ name: "Sri Sarvesh R" }],
  creator: "Sri Sarvesh R",
  openGraph: {
    title: "Sri Sarvesh R | Software Engineer",
    description: "Full Stack Developer & Java Engineer from Tamil Nadu, India.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Sarvesh R | Software Engineer",
    description: "Full Stack Developer & Java Engineer from Tamil Nadu, India.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050816",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050816] text-white antialiased overflow-x-hidden font-sora noise">
        {children}
      </body>
    </html>
  );
}
