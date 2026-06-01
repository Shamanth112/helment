"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { Shield, Bell, MapPin, Camera, Smartphone, Key, Save, Sun, Moon, Monitor, User, Lock, CheckCircle2 } from "lucide-react"

type SettingsState = {
  notifications: { push: boolean; sms: boolean; email: boolean; sosAlerts: boolean }
  detection: { camera: boolean; accelerometer: boolean; gyroscope: boolean; threshold: number }
  location: { shareWithContacts: boolean; storeHistory: boolean; highAccuracy: boolean }
}

function SettingRow({ label, description, checked, onChange, badge }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void; badge?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[var(--secondary)] hover:bg-[var(--muted)] transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium cursor-pointer">{label}</Label>
          {badge && <Badge variant="info" className="text-[10px]">{badge}</Badge>}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} className="flex-shrink-0 mt-0.5" />
    </div>
  )
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const { theme, setTheme } = useTheme()

  const [settings, setSettings] = useState<SettingsState>({
    notifications: { push: true, sms: true, email: false, sosAlerts: true },
    detection:     { camera: true, accelerometer: true, gyroscope: true, threshold: 75 },
    location:      { shareWithContacts: true, storeHistory: true, highAccuracy: true },
  })

  const patch = <K extends keyof SettingsState>(section: K, key: keyof SettingsState[K], val: any) =>
    setSettings(s => ({ ...s, [section]: { ...s[section], [key]: val } }))

  const handleSave = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const tabClass = "rounded-md data-[state=active]:bg-[var(--card)] data-[state=active]:shadow-sm text-sm gap-2"

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Preferences</p>
        <h1 className="text-2xl md:text-3xl font-bold font-heading">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Customize your Helmet AI experience.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Tabs defaultValue="notifications" className="space-y-5">
          <TabsList className="bg-[var(--secondary)] p-1 rounded-[var(--radius)] flex-wrap h-auto gap-1">
            <TabsTrigger value="notifications" className={tabClass}><Bell className="h-3.5 w-3.5" />Notifications</TabsTrigger>
            <TabsTrigger value="detection"     className={tabClass}><Camera className="h-3.5 w-3.5" />Detection</TabsTrigger>
            <TabsTrigger value="location"      className={tabClass}><MapPin className="h-3.5 w-3.5" />Location</TabsTrigger>
            <TabsTrigger value="appearance"    className={tabClass}><Sun className="h-3.5 w-3.5" />Appearance</TabsTrigger>
            <TabsTrigger value="security"      className={tabClass}><Shield className="h-3.5 w-3.5" />Security</TabsTrigger>
          </TabsList>

          {/* ── Notifications ───────────────────────── */}
          <TabsContent value="notifications" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className="p-1.5 rounded-lg bg-[var(--primary-glow)]"><Bell className="h-4 w-4 text-[var(--primary)]" /></div>
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose how you receive alerts and updates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <SettingRow label="Push Notifications" description="Receive notifications directly on your device." checked={settings.notifications.push} onChange={v => patch("notifications","push",v)} />
                  <SettingRow label="SMS Alerts" description="Get text messages for critical alerts and SOS events." checked={settings.notifications.sms} onChange={v => patch("notifications","sms",v)} />
                  <SettingRow label="Email Reports" description="Receive weekly ride summaries and safety reports." checked={settings.notifications.email} onChange={v => patch("notifications","email",v)} />
                  <SettingRow label="Auto SOS Alerts" description="Automatically send SOS when an accident is detected." checked={settings.notifications.sosAlerts} onChange={v => patch("notifications","sosAlerts",v)} badge="Critical" />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ── Detection ───────────────────────────── */}
          <TabsContent value="detection" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className="p-1.5 rounded-lg bg-[var(--accent-glow)]"><Camera className="h-4 w-4 text-[var(--accent)]" /></div>
                    AI Detection Settings
                  </CardTitle>
                  <CardDescription>Configure how accident detection works.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <SettingRow label="Camera Vision" description="Use camera for visual collision detection." checked={settings.detection.camera} onChange={v => patch("detection","camera",v)} />
                  <SettingRow label="Accelerometer" description="Detect sudden impacts and rapid deceleration." checked={settings.detection.accelerometer} onChange={v => patch("detection","accelerometer",v)} />
                  <SettingRow label="Gyroscope" description="Detect rotation anomalies and falls." checked={settings.detection.gyroscope} onChange={v => patch("detection","gyroscope",v)} />

                  <div className="p-4 rounded-xl bg-[var(--secondary)] space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label className="text-sm font-medium">Confidence Threshold</Label>
                        <Badge variant="info" className="font-mono">{settings.detection.threshold}%</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">Minimum AI confidence to trigger SOS. Higher = fewer false alarms but may miss incidents.</p>
                    </div>
                    <input
                      type="range" min={60} max={95} step={5}
                      value={settings.detection.threshold}
                      onChange={e => patch("detection","threshold",parseInt(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none bg-[var(--border)] accent-[var(--primary)] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>60% (Sensitive)</span><span>95% (Strict)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ── Location ────────────────────────────── */}
          <TabsContent value="location" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className="p-1.5 rounded-lg bg-[var(--success-muted)]"><MapPin className="h-4 w-4 text-[var(--success)]" /></div>
                    Location & Privacy
                  </CardTitle>
                  <CardDescription>Control how your location data is used and stored.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <SettingRow label="Share with Emergency Contacts" description="Automatically share live location during SOS alerts." checked={settings.location.shareWithContacts} onChange={v => patch("location","shareWithContacts",v)} badge="Recommended" />
                  <SettingRow label="Store Route History" description="Save ride routes for analytics and playback." checked={settings.location.storeHistory} onChange={v => patch("location","storeHistory",v)} />
                  <SettingRow label="High Accuracy Mode" description="Use GPS + network for maximum precision (uses more battery)." checked={settings.location.highAccuracy} onChange={v => patch("location","highAccuracy",v)} />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ── Appearance ──────────────────────────── */}
          <TabsContent value="appearance" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className="p-1.5 rounded-lg bg-[var(--warning-muted)]"><Sun className="h-4 w-4 text-[var(--warning)]" /></div>
                    Appearance
                  </CardTitle>
                  <CardDescription>Choose your preferred theme and display settings.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "light" as const, icon: Sun, label: "Light", desc: "Clean and bright" },
                      { value: "dark"  as const, icon: Moon, label: "Dark", desc: "Easy on the eyes" },
                      { value: "system" as const, icon: Monitor, label: "System", desc: "Match your OS" },
                    ].map(({ value, icon: Icon, label, desc }) => (
                      <button
                        key={value}
                        onClick={() => setTheme(value)}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          theme === value
                            ? "border-[var(--primary)] bg-[var(--primary-glow)]"
                            : "border-[var(--border)] bg-[var(--secondary)] hover:border-[var(--primary)]/40"
                        }`}
                      >
                        <Icon className={`h-5 w-5 mb-2 ${theme === value ? "text-[var(--primary)]" : "text-muted-foreground"}`} />
                        <p className={`text-sm font-semibold ${theme === value ? "text-[var(--primary)]" : ""}`}>{label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                        {theme === value && <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary)] mt-1.5" />}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ── Security ────────────────────────────── */}
          <TabsContent value="security" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className="p-1.5 rounded-lg bg-[var(--primary-glow)]"><Lock className="h-4 w-4 text-[var(--primary)]" /></div>
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Current Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">New Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Confirm New Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Lock className="h-4 w-4" /> Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className="p-1.5 rounded-lg bg-[var(--success-muted)]"><Smartphone className="h-4 w-4 text-[var(--success)]" /></div>
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Authenticator App</p>
                    <p className="text-xs text-muted-foreground">Use Google Authenticator or Authy</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Smartphone className="h-4 w-4" /> Enable 2FA
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className="p-1.5 rounded-lg bg-[var(--warning-muted)]"><Key className="h-4 w-4 text-[var(--warning)]" /></div>
                    API Keys
                  </CardTitle>
                  <CardDescription>Manage keys for Google Maps and other integrations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Google Maps API Key</Label>
                    <div className="flex gap-2">
                      <Input type="password" placeholder="AIza•••••••••••••••••••••••••••" className="font-mono text-xs" />
                      <Button variant="outline" size="default">Save</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Save button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {saved && (
            <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 text-sm text-[var(--success)]">
              <CheckCircle2 className="h-4 w-4" /> Settings saved!
            </motion.div>
          )}
          <Button onClick={handleSave} variant="gradient" loading={loading} className="gap-2">
            {!loading && <Save className="h-4 w-4" />}
            {loading ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}