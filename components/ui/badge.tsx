import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors border",
  {
    variants: {
      variant: {
        default:   "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-[var(--destructive-muted)] text-destructive border-destructive/20",
        outline:   "border-border text-foreground bg-transparent",
        success:   "border-transparent bg-[var(--success-muted)] text-success border-[var(--success)]/20",
        warning:   "border-transparent bg-[var(--warning-muted)] text-warning border-[var(--warning)]/20",
        info:      "border-transparent bg-[var(--primary-glow)] text-primary border-primary/20",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }