import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 select-none active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[var(--primary-hover)] shadow-[var(--shadow-primary)] rounded-[var(--radius)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90 shadow-[var(--shadow-md)] rounded-[var(--radius)]",
        outline:
          "border border-border bg-transparent hover:bg-secondary hover:text-foreground rounded-[var(--radius)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[var(--muted)] rounded-[var(--radius)]",
        ghost:
          "hover:bg-secondary hover:text-foreground rounded-[var(--radius)]",
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto",
        gradient:
          "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white hover:opacity-90 shadow-[var(--shadow-primary)] rounded-[var(--radius)] font-semibold",
        "gradient-warm":
          "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90 shadow-lg shadow-orange-500/30 rounded-[var(--radius)] font-semibold",
        success:
          "bg-[var(--success)] text-[var(--success-foreground)] hover:opacity-90 shadow-lg shadow-[var(--success)]/30 rounded-[var(--radius)]",
        glass:
          "glass text-foreground hover:bg-[var(--secondary)] rounded-[var(--radius)]",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-md",
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4 py-2 text-sm",
        lg: "h-11 px-6 text-base",
        xl: "h-13 px-8 text-base font-semibold",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {children}
          </span>
        ) : children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }