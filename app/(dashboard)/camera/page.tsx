"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Camera, CameraOff, Shield, AlertTriangle, MapPin, Zap, Navigation, Play, Square, Phone, CheckCircle2, Activity, Clock } from "lucide-react"

export default function CameraPage() {
  const videoRef            = useRef<HTMLVideoElement>(null)
  const [isStreaming, setIsStreaming]     = useState(false)
  const [isRideActive, setIsRideActive]  = useState(false)
  const [showSosModal, setShowSosModal]  = useState(false)
  const [countdown, setCountdown]        = useState(15)
  const [location, setLocation]          = useState<{ lat: number; lng: number } | null>(null)
  const [speed, setSpeed]                = useState(0)
  const [rideSeconds, setRideSeconds]    = useState(0)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false })
      if (videoRef.current) { videoRef.current.srcObject = stream; setIsStreaming(true) }
    } catch { /* camera unavailable in dev */ setIsStreaming(true) }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const s = videoRef.current.srcObject as MediaStream
      s.getTracks().forEach(t => t.stop())
      videoRef.current.srcObject = null
    }
    setIsStreaming(false)
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      const id = navigator.geolocation.watchPosition(
        p => { setLocation({ lat: p.coords.latitude, lng: p.coords.longitude }); setSpeed(p.coords.speed ? p.coords.speed * 3.6 : 0) },
        () => {},
        { enableHighAccuracy: true }
      )
      return () => navigator.geolocation.clearWatch(id)
    }
  }, [])

  useEffect(() => {
    if (showSosModal && countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000)
      return () => clearTimeout(t)
    } else if (showSosModal && countdown === 0) { handleSosTrigger() }
  }, [showSosModal, countdown])

  useEffect(() => {
    if (!isRideActive) { setRideSeconds(0); return }
    const t = setInterval(() => setRideSeconds(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [isRideActive])

  const toggleRide = () => {
    if (isRideActive) { setIsRideActive(false); stopCamera() }
    else { setIsRideActive(true); startCamera() }
  }

  const handleImSafe    = () => { setShowSosModal(false); setCountdown(15) }
  const handleSosTrigger= () => { setShowSosModal(false); setCountdown(15) }

  const fmt = (s: number) => `${String(Math.floor(s / 3600)).padStart(2,"0")}:${String(Math.floor((s % 3600) / 60)).padStart(2,"0")}:${String(s % 60).padStart(2,"0")}`

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Monitoring</p>
        <h1 className="text-2xl md:text-3xl font-bold font-heading">Camera Monitoring</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time AI accident detection and ride tracking.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Camera Feed */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
          <Card className="overflow-hidden">
            {/* Camera viewport */}
            <div className="relative aspect-video bg-[#080808] rounded-t-[var(--radius-lg)] overflow-hidden">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

              {!isStreaming && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-[var(--secondary)] flex items-center justify-center">
                    <CameraOff className="h-9 w-9 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">Camera not started</p>
                  <Button variant="outline" onClick={startCamera} className="gap-2">
                    <Camera className="h-4 w-4" /> Enable Camera
                  </Button>
                </div>
              )}

              {/* Overlay HUD */}
              {isStreaming && (
                <>
                  {/* Top bar */}
                  <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white border border-white/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse-dot" />
                        LIVE
                      </div>
                      {isRideActive && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-[var(--success)] border border-[var(--success)]/30">
                          <Navigation className="h-3 w-3" /> RIDE ACTIVE
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white border border-white/10 font-mono">
                      <MapPin className="h-3 w-3 text-[var(--primary)]" />
                      {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Acquiring GPS…"}
                    </div>
                  </div>

                  {/* Bottom speedometer */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3">
                    <div className="px-3 py-2 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10">
                      <p className="text-[10px] text-white/50 uppercase tracking-wider">Speed</p>
                      <p className="text-2xl font-bold font-mono text-white">{Math.round(speed)}<span className="text-xs text-white/50 ml-1">km/h</span></p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/60 backdrop-blur-sm border border-[var(--success)]/30">
                      <Shield className="h-3.5 w-3.5 text-[var(--success)]" />
                      <span className="text-xs text-[var(--success)] font-medium">AI Active</span>
                    </div>
                  </div>

                  {/* Corner scan lines */}
                  <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-[var(--primary)] rounded-tl opacity-70" />
                  <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-[var(--primary)] rounded-tr opacity-70" />
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-[var(--primary)] rounded-bl opacity-70" />
                  <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-[var(--primary)] rounded-br opacity-70" />
                </>
              )}
            </div>

            {/* Controls */}
            <CardContent className="p-4 flex flex-wrap items-center justify-between gap-3">
              <Button
                onClick={toggleRide}
                variant={isRideActive ? "gradient-warm" : "gradient"}
                size="lg"
                className="gap-2"
              >
                {isRideActive ? <><Square className="h-4 w-4" /> End Ride</> : <><Play className="h-4 w-4" /> Start Ride</>}
              </Button>
              <div className="flex items-center gap-2">
                {isStreaming && !isRideActive && (
                  <Button onClick={stopCamera} variant="outline" size="sm" className="gap-2">
                    <CameraOff className="h-4 w-4" /> Stop Camera
                  </Button>
                )}
                <Button
                  onClick={() => { setShowSosModal(true); setCountdown(15) }}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-[var(--warning)]/40 text-[var(--warning)] hover:bg-[var(--warning-muted)]"
                >
                  <AlertTriangle className="h-4 w-4" /> Test SOS
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Side panel */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">

          {/* Speed */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Zap className="h-4 w-4 text-[var(--warning)]" /> Speed
                </div>
                <Badge variant={speed > 80 ? "destructive" : speed > 60 ? "warning" : "success"} className="text-xs">
                  {speed > 80 ? "Too Fast" : speed > 60 ? "Caution" : "Safe"}
                </Badge>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-bold font-mono">{Math.round(speed)}</span>
                <span className="text-muted-foreground mb-1.5 text-sm">km/h</span>
              </div>
              <div className="progress-bar mt-2">
                <div className="progress-bar-fill" style={{ width: `${Math.min(100, (speed / 120) * 100)}%`, background: speed > 80 ? "var(--destructive)" : speed > 60 ? "var(--warning)" : undefined }} />
              </div>
            </CardContent>
          </Card>

          {/* GPS */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 text-[var(--accent)]" /> GPS Status
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${location ? "bg-[var(--success)] animate-pulse-dot" : "bg-[var(--warning)] animate-pulse-dot"}`} />
                <span className="text-sm font-semibold">{location ? "Connected" : "Acquiring…"}</span>
              </div>
              {location && (
                <p className="text-xs text-muted-foreground font-mono bg-[var(--secondary)] p-2 rounded-lg">
                  {location.lat.toFixed(6)}<br />{location.lng.toFixed(6)}
                </p>
              )}
            </CardContent>
          </Card>

          {/* AI Status */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <Shield className="h-4 w-4 text-[var(--primary)]" /> AI Detection
              </div>
              <div className="space-y-2">
                {[
                  { label: "Vision Model",    status: "Running", ok: true },
                  { label: "Accelerometer",   status: "Active",  ok: true },
                  { label: "Gyroscope",       status: "Active",  ok: true },
                  { label: "Confidence",      status: "78%",     ok: true },
                ].map(({ label, status, ok }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-[var(--success)]" : "bg-[var(--destructive)]"}`} />
                      <span className="text-xs font-medium font-mono">{status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ride timer */}
          {isRideActive && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="border-[var(--success)]/30 bg-[var(--success-muted)]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-[var(--success)] mb-2">
                    <Activity className="h-4 w-4" /> Ride Active
                  </div>
                  <p className="text-3xl font-bold font-mono text-[var(--success)]">{fmt(rideSeconds)}</p>
                  <div className="flex gap-4 mt-2">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Distance</p>
                      <p className="text-sm font-semibold font-mono">0.0 km</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Score</p>
                      <p className="text-sm font-semibold font-mono text-[var(--success)]">100</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* SOS Modal */}
      <AnimatePresence>
        {showSosModal && (
          <Dialog open={showSosModal} onOpenChange={setShowSosModal}>
            <DialogContent className="bg-[var(--card)] border-[var(--border)] max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-[var(--destructive)] text-xl">
                  <div className="p-2 rounded-lg bg-[var(--destructive-muted)]">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  Accident Detected!
                </DialogTitle>
                <DialogDescription className="text-base">
                  AI detected a potential accident. SOS will be sent in{" "}
                  <span className="font-bold text-[var(--destructive)] text-lg">{countdown}s</span> unless you cancel.
                </DialogDescription>
              </DialogHeader>

              <div className="flex justify-center py-6">
                <div className="relative">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" stroke="var(--border)" strokeWidth="8" fill="none" />
                    <circle
                      cx="50" cy="50" r="44" stroke="var(--destructive)" strokeWidth="8" fill="none"
                      strokeDasharray={`${2 * Math.PI * 44}`}
                      strokeDashoffset={`${2 * Math.PI * 44 * (1 - countdown / 15)}`}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 0.9s linear" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold font-mono text-[var(--destructive)]">{countdown}</span>
                    <span className="text-xs text-muted-foreground">seconds</span>
                  </div>
                </div>
              </div>

              {location && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--secondary)] text-sm mb-2">
                  <MapPin className="h-4 w-4 text-[var(--primary)] flex-shrink-0" />
                  <span className="font-mono text-xs">{location.lat.toFixed(6)}, {location.lng.toFixed(6)}</span>
                </div>
              )}

              <DialogFooter className="gap-2 sm:gap-2">
                <Button onClick={handleImSafe} variant="outline" className="flex-1 gap-2">
                  <CheckCircle2 className="h-4 w-4" /> I'm Safe
                </Button>
                <Button onClick={handleSosTrigger} variant="gradient-warm" className="flex-1 gap-2">
                  <Phone className="h-4 w-4" /> Send SOS Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}