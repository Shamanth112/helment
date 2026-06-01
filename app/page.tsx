"use client"

import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import {
  Shield, Camera, MapPin, Bell, Zap, Activity,
  ArrowRight, CheckCircle2, Sun, Moon, ChevronDown,
  Star, Navigation, Users, TrendingUp, Menu, X,
} from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: Camera,
    title: "AI Collision Detection",
    description: "Advanced computer vision detects accidents in real-time using your camera and motion sensors.",
    color: "text-[var(--primary)]",
    bg: "bg-[var(--primary-glow)]",
    border: "border-[var(--primary)]/20",
  },
  {
    icon: MapPin,
    title: "Live GPS Tracking",
    description: "Precise GPS tracking shares your real-time location with loved ones on every ride.",
    color: "text-[var(--accent)]",
    bg: "bg-[var(--accent-glow)]",
    border: "border-[var(--accent)]/20",
  },
  {
    icon: Bell,
    title: "Instant SOS Alerts",
    description: "When accidents happen, emergency contacts are notified immediately with your live location.",
    color: "text-[var(--destructive)]",
    bg: "bg-[var(--destructive-muted)]",
    border: "border-[var(--destructive)]/20",
  },
  {
    icon: Zap,
    title: "Speed Monitoring",
    description: "Real-time speed alerts help you stay within safe limits and avoid dangerous situations.",
    color: "text-[var(--warning)]",
    bg: "bg-[var(--warning-muted)]",
    border: "border-[var(--warning)]/20",
  },
  {
    icon: Activity,
    title: "Safety Analytics",
    description: "Track your riding patterns and improve your safety score with detailed analytics.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: Shield,
    title: "24/7 Protection",
    description: "Your safety system works around the clock, even when you're not actively using the app.",
    color: "text-[var(--success)]",
    bg: "bg-[var(--success-muted)]",
    border: "border-[var(--success)]/20",
  },
]

const stats = [
  { value: "50K+",  label: "Active Riders",     icon: Users      },
  { value: "99.9%", label: "Detection Accuracy", icon: Shield     },
  { value: "<2s",   label: "SOS Response Time",  icon: Bell       },
  { value: "4.9★",  label: "App Rating",         icon: Star       },
]

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Daily Commuter · Mumbai",
    text: "Helmet AI saved my life. When I had an accident, it alerted my family instantly. Couldn't ask for more.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Weekend Rider · Bangalore",
    text: "The safety score feature keeps me accountable. My riding has improved dramatically in just a month.",
    rating: 5,
  },
  {
    name: "Ravi Kumar",
    role: "Delivery Partner · Delhi",
    text: "As someone who rides 8 hours a day, this app gives my family peace of mind. Absolutely essential.",
    rating: 5,
  },
]

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="icon-btn"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] shadow-[var(--shadow-primary)]">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold font-heading">Helmet AI</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {["Features", "Stats", "Testimonials"].map((s) => (
                <a
                  key={s}
                  href={`#${s.toLowerCase()}`}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-[var(--secondary)] transition-all duration-200"
                >
                  {s}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link href="/register">
                  <Button variant="gradient" size="sm" className="gap-1">
                    Get Started <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
              <button
                className="icon-btn md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-[var(--border)] px-4 py-4 space-y-1"
          >
            {["Features", "Stats", "Testimonials"].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-3 py-2.5 text-sm rounded-lg hover:bg-[var(--secondary)] transition-colors"
              >
                {s}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full">Log In</Button>
              </Link>
              <Link href="/register" className="flex-1">
                <Button variant="gradient" className="w-full">Sign Up</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative pt-28 pb-24 px-4 overflow-hidden hero-grid-bg">
        {/* Floating orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-[var(--primary)] opacity-10 blur-[80px] animate-glow-pulse pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-64 h-64 rounded-full bg-[var(--accent)] opacity-10 blur-[80px] animate-glow-pulse pointer-events-none" style={{ animationDelay: "1s" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-glow)] border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-semibold mb-8 uppercase tracking-widest"
            >
              <Zap className="h-3.5 w-3.5" />
              AI-Powered Motorcycle Safety
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6">
              Ride Smart.{" "}
              <span className="relative">
                <span className="gradient-text">Stay Safe.</span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] origin-left"
                />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              The most advanced AI-powered motorcycle safety system that detects accidents
              in real-time and automatically alerts your emergency contacts with live GPS location.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register">
                <Button size="xl" variant="gradient" className="w-full sm:w-auto gap-2 shadow-[var(--shadow-primary)]">
                  Start for Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2">
                  Log In
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
              {["No credit card required", "Free forever plan", "Setup in 2 minutes"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />
                  {t}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-xl)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent z-10 pointer-events-none" />
              {/* Mock dashboard header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--secondary)]">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[var(--destructive)] opacity-80" />
                  <div className="h-3 w-3 rounded-full bg-[var(--warning)] opacity-80" />
                  <div className="h-3 w-3 rounded-full bg-[var(--success)] opacity-80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-[var(--card)] border border-[var(--border)] text-xs text-muted-foreground w-48 text-center">
                    helmetai.app/dashboard
                  </div>
                </div>
              </div>
              {/* Mock content */}
              <div className="aspect-[16/7] bg-[var(--background-subtle)] flex items-center justify-center p-8">
                <div className="grid grid-cols-4 gap-4 w-full max-w-2xl">
                  {[
                    { label: "Safety Score", val: "94", icon: Shield, color: "text-[var(--success)]" },
                    { label: "Camera", val: "Active", icon: Camera, color: "text-[var(--primary)]" },
                    { label: "GPS", val: "Strong", icon: Navigation, color: "text-[var(--accent)]" },
                    { label: "Speed", val: "0 km/h", icon: Zap, color: "text-[var(--warning)]" },
                  ].map(({ label, val, icon: Icon, color }) => (
                    <div key={label} className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 text-center">
                      <Icon className={`h-6 w-6 ${color} mx-auto mb-2`} />
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="font-bold text-sm mt-0.5">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ── Stats ───────────────────────────────────────── */}
      <section id="stats" className="py-16 px-4 border-y border-[var(--border)] bg-[var(--background-subtle)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map(({ value, label, icon: Icon }) => (
              <motion.div key={label} variants={item} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--primary-glow)] mb-3">
                  <Icon className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <p className="text-3xl md:text-4xl font-bold font-heading gradient-text">{value}</p>
                <p className="text-sm text-muted-foreground mt-1">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────── */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-3">Features</p>
            <h2 className="text-3xl md:text-5xl font-bold font-heading">
              Everything You Need to{" "}
              <span className="gradient-text">Stay Safe</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              A comprehensive suite of safety tools built for every ride.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={item}>
                <div className={`group p-6 rounded-2xl border ${f.border} bg-[var(--card)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 h-full`}>
                  <div className={`inline-flex p-3 rounded-xl ${f.bg} mb-4`}>
                    <f.icon className={`h-6 w-6 ${f.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold font-heading mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────── */}
      <section id="testimonials" className="py-24 px-4 bg-[var(--background-subtle)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Trusted by Riders Everywhere</h2>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={item}>
                <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] h-full flex flex-col gap-4 hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[var(--warning)] text-[var(--warning)]" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{t.text}"</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden border border-[var(--primary)]/20 p-10 md:p-16 text-center bg-[var(--card)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-glow)] via-transparent to-[var(--accent-glow)] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] shadow-[var(--shadow-primary)] mb-6 animate-float">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
                Ready to Ride <span className="gradient-text">Safer?</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">
                Join 50,000+ riders already using Helmet AI for real-time accident detection and emergency alerts.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/register">
                  <Button size="xl" variant="gradient" className="gap-2 shadow-[var(--shadow-primary)]">
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="xl" variant="outline" className="gap-2">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold font-heading">Helmet AI</span>
              <span className="text-muted-foreground text-sm">· Smart Safety System</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Helmet AI. All rights reserved.</p>
            <div className="flex items-center gap-5">
              {["Privacy", "Terms", "Contact"].map((l) => (
                <Link key={l} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}