import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Gokul Naveen | Software Engineer",
  description:
    "Software Engineer specializing in distributed systems, ML infrastructure, and cloud-native engineering. Building scalable, production-ready systems.",
  keywords: [
    "Software Engineer",
    "Distributed Systems",
    "ML Infrastructure",
    "Cloud Engineering",
    "AWS",
    "GCP",
    "Python",
    "Kafka",
    "Reliable Software",
    "RIT",
  ],
  authors: [{ name: "Gokul Naveen" }],
  openGraph: {
    title: "Gokul Naveen | Software Engineer",
    description:
      "Software Engineer specializing in distributed systems, ML infrastructure, and cloud-native engineering.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="bg-[#F1EFE6] text-[#53443D] antialiased font-[family-name:var(--font-nunito)] overflow-x-hidden">
        <SmoothScroll>
          <div className="relative min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-grow">
              {children}
            </main>
            <SiteFooter />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
