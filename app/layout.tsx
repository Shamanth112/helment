import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Helmet AI - Smart Motorcycle Safety System",
  description:
    "AI-powered motorcycle safety system that detects accidents in real-time and automatically alerts emergency contacts with live GPS location.",
  keywords: [
    "motorcycle safety",
    "helmet",
    "AI safety",
    "accident detection",
    "SOS alert",
    "GPS tracking",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}