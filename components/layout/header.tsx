"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "@/components/theme-provider"
import {
  Bell, Shield, Sun, Moon, Monitor, LogOut,
  LayoutDashboard, Camera, Users, BarChart2,
  Navigation, Settings, ChevronLeft, Menu, X,
  Bike,
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  user?: { name: string; email: string; image?: string } | null
  notificationCount?: number
}

const navLinks = [
  { href: "/dashboard",  label: "Dashboard",  icon: LayoutDashboard },
  { href: "/camera",     label: "Camera",      icon: Camera          },
  { href: "/contacts",   label: "Contacts",    icon: Users           },
  { href: "/rides",      label: "Rides",       icon: Navigation      },
  { href: "/analytics",  label: "Analytics",   icon: BarChart2       },
  { href: "/settings",   label: "Settings",    icon: Settings        },
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const options: { value: "light" | "dark" | "system"; icon: React.FC<{ className?: string }> }[] = [
    { value: "light",  icon: Sun     },
    { value: "dark",   icon: Moon    },
    { value: "system", icon: Monitor },
  ]
  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-[var(--radius)] bg-[var(--secondary)] border border-[var(--border)]">
      {options.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "w-8 h-7 flex items-center justify-center rounded-md transition-all duration-200",
            theme === value
              ? "bg-[var(--primary)] text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={`${value} theme`}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  )
}

export function Sidebar({ user, notificationCount = 0 }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 border-b border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-md lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] shadow-[var(--shadow-primary)]">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold font-heading">Helmet AI</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="icon-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "app-sidebar theme-transition",
          collapsed ? "w-[68px]" : "w-[var(--sidebar-width)]",
          mobileOpen ? "open" : ""
        )}
        style={{ width: collapsed ? 68 : undefined }}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center h-16 px-4 border-b border-[var(--sidebar-border)]",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] shadow-[var(--shadow-primary)] flex-shrink-0">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold font-heading leading-none">Helmet AI</p>
                <p className="text-[10px] text-muted-foreground leading-none mt-0.5">Safety System</p>
              </div>
            </Link>
          )}
          {collapsed && (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] shadow-[var(--shadow-primary)]">
              <Shield className="h-5 w-5 text-white" />
            </div>
          )}
          <button
            className="icon-btn ml-auto hidden lg:flex"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-0.5">
          {!collapsed && (
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Navigation
            </p>
          )}
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] text-sm font-medium transition-all duration-200 group",
                  collapsed && "justify-center px-2",
                  active
                    ? "bg-[var(--primary-glow)] text-[var(--primary)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-[var(--secondary)]"
                )}
                title={collapsed ? label : undefined}
              >
                <Icon className={cn("h-4 w-4 flex-shrink-0 transition-colors", active ? "text-[var(--primary)]" : "group-hover:text-foreground")} />
                {!collapsed && <span>{label}</span>}
                {!collapsed && active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="px-2 pb-4 space-y-2 border-t border-[var(--sidebar-border)] pt-3">
          {!collapsed && <ThemeToggle />}

          {user ? (
            <div className={cn("flex items-center gap-2.5 p-2 rounded-[var(--radius)] hover:bg-[var(--secondary)] transition-colors cursor-pointer group", collapsed && "justify-center")}>
              <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-[var(--border)]">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <button className="icon-btn opacity-0 group-hover:opacity-100 transition-opacity">
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </>
              )}
            </div>
          ) : (
            <Link href="/login" className={cn(collapsed && "flex justify-center")}>
              <Button variant="gradient" size={collapsed ? "icon" : "default"} className="w-full">
                {collapsed ? <LogOut className="h-4 w-4" /> : "Sign In"}
              </Button>
            </Link>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-nav justify-around">
        {navLinks.slice(0, 5).map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 rounded-[var(--radius)] transition-all duration-200",
                active ? "text-[var(--primary)]" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", active && "drop-shadow-[0_0_6px_var(--primary)]")} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

// Keep Header export for backwards compat
export { Sidebar as Header }