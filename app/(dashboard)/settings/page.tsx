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
import { Shield, Bell, MapPin, Camera, Smartphone, Key, Save } from "lucide-react"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      sms: true,
      email: false,
      sosAlerts: true,
    },
    detection: {
      cameraEnabled: true,
      accelerometerEnabled: true,
      gyroscopeEnabled: true,
      confidenceThreshold: 70,
    },
    location: {
      shareWithContacts: true,
      storeHistory: true,
    },
  })

  const handleSave = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold font-heading">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and app preferences
        </p>
      </motion.div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="detection">
            <Camera className="h-4 w-4 mr-2" />
            Detection
          </TabsTrigger>
          <TabsTrigger value="location">
            <MapPin className="h-4 w-4 mr-2" />
            Location
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to receive alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications on your device
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, push: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive SMS for important alerts
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.sms}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, sms: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates and reports
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          email: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>SOS Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically send SOS when accident is detected
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.sosAlerts}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          sosAlerts: checked,
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Detection Tab */}
        <TabsContent value="detection">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>AI Detection Settings</CardTitle>
                <CardDescription>
                  Configure how accident detection works
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Camera Analysis</Label>
                    <p className="text-sm text-muted-foreground">
                      Use camera for visual collision detection
                    </p>
                  </div>
                  <Switch
                    checked={settings.detection.cameraEnabled}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        detection: {
                          ...settings.detection,
                          cameraEnabled: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Accelerometer</Label>
                    <p className="text-sm text-muted-foreground">
                      Detect sudden deceleration impacts
                    </p>
                  </div>
                  <Switch
                    checked={settings.detection.accelerometerEnabled}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        detection: {
                          ...settings.detection,
                          accelerometerEnabled: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Gyroscope</Label>
                    <p className="text-sm text-muted-foreground">
                      Detect rotation anomalies and falls
                    </p>
                  </div>
                  <Switch
                    checked={settings.detection.gyroscopeEnabled}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        detection: {
                          ...settings.detection,
                          gyroscopeEnabled: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-3">
                  <Label>Confidence Threshold</Label>
                  <p className="text-sm text-muted-foreground">
                    Minimum confidence required to trigger SOS (70-90%)
                  </p>
                  <div className="flex items-center gap-4">
                    <Input
                      type="range"
                      min={70}
                      max={90}
                      value={settings.detection.confidenceThreshold}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          detection: {
                            ...settings.detection,
                            confidenceThreshold: parseInt(e.target.value),
                          },
                        })
                      }
                      className="flex-1"
                    />
                    <Badge variant="secondary">
                      {settings.detection.confidenceThreshold}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Location Tab */}
        <TabsContent value="location">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Location Settings</CardTitle>
                <CardDescription>
                  Control how your location data is used
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Share with Emergency Contacts</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically share location during SOS alerts
                    </p>
                  </div>
                  <Switch
                    checked={settings.location.shareWithContacts}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        location: {
                          ...settings.location,
                          shareWithContacts: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Store Location History</Label>
                    <p className="text-sm text-muted-foreground">
                      Save route history for ride analytics
                    </p>
                  </div>
                  <Switch
                    checked={settings.location.storeHistory}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        location: {
                          ...settings.location,
                          storeHistory: checked,
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Change Password</Label>
                  <div className="grid gap-3">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Enable 2FA
                  </Button>
                </div>
                <div className="space-y-3">
                  <Label>API Keys</Label>
                  <p className="text-sm text-muted-foreground">
                    Manage API keys for external integrations
                  </p>
                  <Button variant="outline">
                    <Key className="mr-2 h-4 w-4" />
                    Manage Keys
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}