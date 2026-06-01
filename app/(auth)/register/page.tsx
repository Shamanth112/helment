"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTheme } from "@/components/theme-provider"
import {
  Shield, Eye, EyeOff, ArrowRight, CheckCircle2, Circle,
  Sun, Moon, User, Mail, Lock,
} from "lucide-react"

const passwordChecks = [
  { label: "At least 8 characters",   regex: /.{8,}/     },
  { label: "Uppercase letter",         regex: /[A-Z]/     },
  { label: "Lowercase letter",         regex: /[a-z]/     },
  { label: "Number or symbol",         regex: /[\d\W]/    },
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  const strength = passwordChecks.filter((c) => c.regex.test(password)).length
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength]
  const strengthColor = ["", "bg-[var(--destructive)]", "bg-[var(--warning)]", "bg-[var(--accent)]", "bg-[var(--success)]"][strength]

  return (
    <div className="min-h-screen flex bg-[var(--background)]">

      {/* ── Left: Visual Panel ──────────────────────────── */}
      <div className="hidden lg:flex w-[480px] xl:w-[560px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--success)] via-emerald-600 to-[var(--primary)]" />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3) 0%, transparent 50%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 40px 40px, 40px 40px",
          }}
        />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-8 animate-float">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-heading mb-3">
              Join the Safety Revolution
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-10">
              Create your free account and start protecting yourself on every ride.
            </p>

            {/* Steps */}
            <div className="space-y-5">
              {[
                { step: "1", title: "Create your account",     desc: "Takes less than 2 minutes" },
                { step: "2", title: "Add emergency contacts",  desc: "Family & friends who should be notified" },
                { step: "3", title: "Start riding protected",  desc: "AI monitors every journey automatically" },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {step}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{title}</p>
                    <p className="text-xs text-white/60 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
              <p className="text-sm font-medium mb-1">Free forever plan includes:</p>
              {["AI accident detection", "Emergency SOS alerts", "GPS tracking", "Safety analytics"].map((f) => (
                <div key={f} className="flex items-center gap-2 mt-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white/80" />
                  <span className="text-xs text-white/80">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Right: Form ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between p-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] shadow-[var(--shadow-primary)]">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-base font-bold font-heading">Helmet AI</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="icon-btn"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <span className="text-sm text-muted-foreground hidden sm:block">
              Have an account?{" "}
              <Link href="/login" className="text-[var(--primary)] hover:underline font-medium">
                Sign in
              </Link>
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="mb-7">
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">Create account</h1>
              <p className="text-muted-foreground">Start your safety journey today — it's free.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Alex Kumar"
                  required
                  className="h-11"
                  icon={<User className="h-4 w-4" />}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="rider@example.com"
                  required
                  className="h-11"
                  icon={<Mail className="h-4 w-4" />}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  required
                  className="h-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="h-4 w-4" />}
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />
                {/* Strength meter */}
                {password.length > 0 && (
                  <div>
                    <div className="flex gap-1 mt-1.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i <= strength ? strengthColor : "bg-[var(--border)]"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {passwordChecks.map((check) => {
                          const met = check.regex.test(password)
                          return (
                            <div key={check.label} className={`flex items-center gap-1 text-xs ${met ? "text-[var(--success)]" : "text-muted-foreground"}`}>
                              {met ? <CheckCircle2 className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                              {check.label}
                            </div>
                          )
                        })}
                      </div>
                      {strengthLabel && (
                        <span className={`text-xs font-semibold ${
                          strength >= 4 ? "text-[var(--success)]" :
                          strength >= 3 ? "text-[var(--accent)]" :
                          strength >= 2 ? "text-[var(--warning)]" : "text-[var(--destructive)]"
                        }`}>{strengthLabel}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  required
                  className="h-11"
                  icon={<Lock className="h-4 w-4" />}
                />
              </div>

              <p className="text-xs text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Link href="#" className="text-[var(--primary)] hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="#" className="text-[var(--primary)] hover:underline">Privacy Policy</Link>.
              </p>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full gap-2"
                loading={loading}
              >
                {!loading && (
                  <>
                    Create Account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
                {loading && "Creating account..."}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6 sm:hidden">
              Have an account?{" "}
              <Link href="/login" className="text-[var(--primary)] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}