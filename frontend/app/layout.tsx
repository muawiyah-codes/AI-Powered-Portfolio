import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Muawiyah | AI / ML Engineer & Data Scientist | Production AI Systems",
  description: "Portfolio of Muawiyah — Data Science, Deep Learning, Generative AI (Multi-Agents & RAG), Computer Vision (EfficientNetV2 90%+ acc), and Python developer.",
  keywords: [
    "Muawiyah",
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Generative AI",
    "Multi-Agent Systems",
    "RAG",
    "Deep Learning",
    "Computer Vision",
    "EfficientNetV2",
    "LangChain",
    "Groq",
    "FastAPI",
    "Streamlit"
  ],
  authors: [{ name: "Muawiyah", url: "https://github.com/muawiyah-codes" }],
  creator: "Muawiyah",
  openGraph: {
    title: "Muawiyah | AI / ML Engineer & Data Scientist",
    description: "Interactive portfolio featuring verified computer vision models, autonomous agent research loops, and RAG architectures.",
    type: "website",
    locale: "en_US",
    siteName: "Muawiyah AI Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Muawiyah | AI / ML Engineer",
    description: "Production AI systems, Deep Learning with explainable Grad-CAM, and autonomous multi-agent pipelines."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
