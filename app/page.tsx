"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, Camera, MapPin, Bell, Zap, Activity, ArrowRight, CheckCircle2 } from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "AI Collision Detection",
    description:
      "Advanced computer vision detects accidents in real-time using your camera and motion sensors.",
  },
  {
    icon: MapPin,
    title: "Live GPS Tracking",
    description:
      "Always know your location with precise GPS tracking and share it with your loved ones.",
  },
  {
    icon: Bell,
    title: "Instant SOS Alerts",
    description:
      "When accidents happen, emergency contacts are notified immediately with your live location.",
  },
  {
    icon: Zap,
    title: "Speed Monitoring",
    description:
      "Real-time speed alerts help you stay within safe limits and avoid dangerous situations.",
  },
  {
    icon: Activity,
    title: "Safety Analytics",
    description:
      "Track your riding patterns and improve your safety score with detailed analytics.",
  },
  {
    icon: Shield,
    title: "24/7 Protection",
    description:
      "Your safety system works around the clock, even when you're not actively using the app.",
  },
]

const stats = [
  { value: "10K+", label: "Active Riders" },
  { value: "99.9%", label: "Detection Accuracy" },
  { value: "50ms", label: "Alert Response" },
  { value: "24/7", label: "System Monitoring" },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold font-heading">Helmet AI</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button variant="gradient">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              AI-Powered Safety for Every Ride
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight">
              Ride Smart. Ride{" "}
              <span className="gradient-text">Safe.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
              The most advanced AI-powered motorcycle safety system that detects
              accidents in real-time and automatically alerts your emergency
              contacts with your live location.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link href="/register">
                <Button size="xl" variant="gradient" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="xl" variant="outline" className="w-full sm:w-auto">
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
                <div className="aspect-video bg-secondary flex items-center justify-center">
                  <div className="text-center">
                    <Shield className="h-24 w-24 text-primary mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold font-heading gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              Everything You Need to Stay Safe
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our comprehensive safety system keeps you protected on every ride
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
              >
                <div className="p-6 rounded-xl border border-border bg-card h-full card-hover">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold font-heading mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl bg-gradient-to-br from-primary/20 via-card to-success/20 p-8 md:p-16 text-center overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Ready to Ride Safer?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Join thousands of riders who trust Helmet AI to keep them safe on
                every journey. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="xl" variant="gradient">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="xl" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-success/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <span className="font-bold font-heading">Helmet AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Helmet AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}