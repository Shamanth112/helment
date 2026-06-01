"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Camera, User, Mail, Phone, Calendar, Save, Shield, CheckCircle2,
  Bike, Heart, MapPin, AlertCircle, KeyRound, BellRing, Eye
} from "lucide-react"

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    bloodGroup: "O+",
    location: "Bengaluru, Karnataka",
    image: "",
    mfaEnabled: true,
    emailAlerts: true,
    pushAlerts: true,
  })

  const handleSave = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowSuccessToast(true)
      setTimeout(() => setShowSuccessToast(false), 3000)
    }, 1200)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      {/* Toast Alert */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--success)] bg-[var(--card)] shadow-[var(--shadow-xl)]"
          >
            <div className="p-1.5 rounded-lg bg-[var(--success-muted)]">
              <CheckCircle2 className="h-5 w-5 text-[var(--success)]" />
            </div>
            <div>
              <p className="font-semibold text-sm">Profile updated</p>
              <p className="text-xs text-muted-foreground">Your changes were saved successfully.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Account</p>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">User Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your safety account, ride preferences, and basic medical information.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant="success" className="gap-1 px-3 py-1.5 text-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)] animate-pulse-dot" />
            User Level: Pro
          </Badge>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column: Rider Identity */}
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden relative">
              {/* Header Gradient cover */}
              <div className="h-28 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] relative">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-3 right-3">
                  <Badge variant="glass" className="text-white border-white/20">
                    Active Rider
                  </Badge>
                </div>
              </div>

              <CardContent className="pt-0 text-center relative px-6 pb-6">
                {/* Large Avatar container */}
                <div className="relative -mt-14 inline-block">
                  <Avatar className="h-28 w-28 border-4 border-[var(--card)] shadow-lg mx-auto bg-[var(--secondary)]">
                    <AvatarImage src={profile.image} alt={profile.name} />
                    <AvatarFallback className="text-3xl font-heading font-bold bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white">
                      {profile.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="gradient"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                {/* Identity Info */}
                <h2 className="text-xl font-bold font-heading mt-3">{profile.name}</h2>
                <p className="text-xs text-muted-foreground">{profile.email}</p>

                <div className="grid grid-cols-3 gap-2 mt-5 border-y border-[var(--border)] py-4">
                  {[
                    { label: "Rides", value: "48", icon: Bike, color: "text-[var(--primary)]" },
                    { label: "Safety", value: "94%", icon: Shield, color: "text-[var(--success)]" },
                    { label: "Blood", value: profile.bloodGroup, icon: Heart, color: "text-red-500" },
                  ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="text-center">
                      <Icon className={`h-4 w-4 mx-auto mb-1 ${color}`} />
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-bold font-mono mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-3.5 text-left text-xs text-muted-foreground">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="h-4 w-4 text-[var(--primary)] flex-shrink-0" />
                    <span>Member since January 2024</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 text-[var(--accent)] flex-shrink-0" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Info box */}
          <motion.div variants={itemVariants}>
            <div className="p-4 rounded-xl border border-[var(--primary)]/30 bg-[var(--primary-glow)] flex gap-3 items-start">
              <AlertCircle className="h-4 w-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wide">Emergency Protocol</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Rider medical info (Blood Group, Contacts) is securely stored locally and only included in emergency SOS transmissions to alert services.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Columns: Forms & Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Details Card */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[var(--primary-glow)]">
                    <User className="h-4 w-4 text-[var(--primary)]" />
                  </div>
                  Personal Rider Information
                </CardTitle>
                <CardDescription>Update your personal info, contact details and location.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="pl-9"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="pl-9"
                        placeholder="rider@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="pl-9"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="blood">Blood Group (Critical for emergency)</Label>
                    <div className="relative">
                      <Heart className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="blood"
                        value={profile.bloodGroup}
                        onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
                        className="pl-9 font-mono"
                        placeholder="O+, A+, AB-"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="location">Primary Riding Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="pl-9"
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button variant="gradient" onClick={handleSave} loading={loading} className="gap-2 px-5">
                    <Save className="h-4 w-4" />
                    Save Information
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preferences & Security */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[var(--accent-glow)]">
                    <Shield className="h-4 w-4 text-[var(--accent)]" />
                  </div>
                  System Preferences & Security
                </CardTitle>
                <CardDescription>Configure notifications and AI telemetry system security settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Preferences List */}
                <div className="space-y-3">
                  {[
                    {
                      id: "mfaEnabled",
                      title: "Secure Device Key Authentication",
                      description: "Secure login utilizing your hardware key or authentication app",
                      icon: KeyRound,
                      checked: profile.mfaEnabled,
                    },
                    {
                      id: "emailAlerts",
                      title: "Receive Email Reports",
                      description: "Get weekly summary of your ride analytics and safety behavior",
                      icon: BellRing,
                      checked: profile.emailAlerts,
                    },
                    {
                      id: "pushAlerts",
                      title: "Accident Broadcast Notifications",
                      description: "Display emergency status overlay and notification alerts on device",
                      icon: Eye,
                      checked: profile.pushAlerts,
                    },
                  ].map(({ id, title, description, icon: Icon, checked }) => (
                    <div
                      key={id}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-[var(--secondary)] hover:border-[var(--primary)]/30 transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[var(--card)] text-muted-foreground mt-0.5">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={checked}
                        onCheckedChange={(val) => setProfile({ ...profile, [id]: val })}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}