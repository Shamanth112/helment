"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Camera,
  CameraOff,
  Shield,
  AlertTriangle,
  MapPin,
  Zap,
  Navigation,
  Play,
  Square,
  Phone,
  CheckCircle2,
} from "lucide-react"

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isRideActive, setIsRideActive] = useState(false)
  const [showSosModal, setShowSosModal] = useState(false)
  const [countdown, setCountdown] = useState(15)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [speed, setSpeed] = useState(0)

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreaming(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsStreaming(false)
  }

  // Get location
  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setSpeed(position.coords.speed ? position.coords.speed * 3.6 : 0)
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      )
      return () => navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    if (showSosModal && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (showSosModal && countdown === 0) {
      // Auto trigger SOS
      handleSosTrigger()
    }
  }, [showSosModal, countdown])

  // Simulate accident detection
  const simulateAccidentDetection = () => {
    setShowSosModal(true)
    setCountdown(15)
  }

  const handleImSafe = () => {
    setShowSosModal(false)
    setCountdown(15)
  }

  const handleSosTrigger = () => {
    setShowSosModal(false)
    setCountdown(15)
    // Would trigger actual SOS here
    alert("SOS Alert Sent to Emergency Contacts!")
  }

  const toggleRide = () => {
    if (isRideActive) {
      setIsRideActive(false)
      stopCamera()
    } else {
      setIsRideActive(true)
      startCamera()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold font-heading">Camera Monitoring</h1>
        <p className="text-muted-foreground mt-1">
          Real-time accident detection and ride monitoring
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Camera View */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-black rounded-t-xl overflow-hidden">
                {isStreaming ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <CameraOff className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Camera is not active
                      </p>
                      <Button
                        onClick={startCamera}
                        className="mt-4"
                        variant="secondary"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Start Camera
                      </Button>
                    </div>
                  </div>
                )}

                {/* Overlay Stats */}
                {isStreaming && (
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div className="flex gap-2">
                      <Badge
                        variant={isStreaming ? "success" : "destructive"}
                        className="flex items-center gap-1"
                      >
                        <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
                        Live
                      </Badge>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                        <div className="flex items-center gap-1.5 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-mono">
                            {location
                              ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
                              : "Acquiring..."}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={toggleRide}
                    variant={isRideActive ? "destructive" : "gradient"}
                    size="lg"
                  >
                    {isRideActive ? (
                      <>
                        <Square className="mr-2 h-4 w-4" />
                        End Ride
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start Ride
                      </>
                    )}
                  </Button>
                  {isStreaming && (
                    <Button onClick={stopCamera} variant="outline">
                      <CameraOff className="mr-2 h-4 w-4" />
                      Stop Camera
                    </Button>
                  )}
                </div>

                {/* Test SOS Button */}
                <Button
                  onClick={simulateAccidentDetection}
                  variant="outline"
                  className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Test SOS
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Stats */}
        <div className="space-y-4">
          {/* Current Speed */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                Current Speed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold font-mono">
                {Math.round(speed)}
                <span className="text-lg text-muted-foreground ml-1">
                  km/h
                </span>
              </div>
            </CardContent>
          </Card>

          {/* GPS Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                GPS Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    location ? "bg-emerald-500" : "bg-amber-500"
                  } animate-pulse`}
                />
                <span>{location ? "Connected" : "Acquiring..."}</span>
              </div>
              {location && (
                <p className="text-xs text-muted-foreground mt-2 font-mono">
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              )}
            </CardContent>
          </Card>

          {/* AI Detection Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                AI Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Monitoring for collision patterns
              </p>
            </CardContent>
          </Card>

          {/* Ride Info */}
          {isRideActive && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-success" />
                  Ride Active
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-mono">00:00:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Distance</span>
                    <span className="font-mono">0.0 km</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Safety Score</span>
                    <span className="font-mono text-success">100</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* SOS Modal */}
      <AnimatePresence>
        {showSosModal && (
          <Dialog open={showSosModal} onOpenChange={setShowSosModal}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Possible Accident Detected
                </DialogTitle>
                <DialogDescription>
                  Our AI system has detected a potential accident. An SOS alert
                  will be sent to your emergency contacts in{" "}
                  <span className="font-bold text-destructive">
                    {countdown} seconds
                  </span>
                  .
                </DialogDescription>
              </DialogHeader>

              <div className="flex justify-center py-4">
                <div className="text-center">
                  <div className="text-6xl font-bold font-mono text-destructive mb-2">
                    {countdown}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Press "I'm Safe" if you're okay
                  </p>
                </div>
              </div>

              {location && (
                <div className="bg-secondary rounded-lg p-3 text-sm">
                  <p className="text-muted-foreground mb-1">Your Location:</p>
                  <p className="font-mono">
                    {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </p>
                </div>
              )}

              <DialogFooter className="sm:justify-between gap-2">
                <Button
                  onClick={handleImSafe}
                  variant="outline"
                  className="flex-1"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  I'm Safe
                </Button>
                <Button
                  onClick={handleSosTrigger}
                  variant="destructive"
                  className="flex-1"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Send SOS Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}