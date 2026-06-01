import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Helmet AI – Smart Motorcycle Safety System",
  description:
    "AI-powered motorcycle safety system that detects accidents in real-time and automatically alerts emergency contacts with live GPS location.",
  keywords: ["motorcycle safety", "helmet AI", "accident detection", "SOS alert", "GPS tracking", "smart helmet"],
  authors: [{ name: "Helmet AI" }],
  creator: "Helmet AI",
  metadataBase: new URL("https://helmetai.app"),
  openGraph: {
    title: "Helmet AI – Smart Motorcycle Safety System",
    description: "AI-powered accident detection and emergency alerts for motorcyclists.",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#060B18" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col theme-transition">
        <ThemeProvider defaultTheme="dark" storageKey="helmet-ai-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}