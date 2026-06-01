import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  suffix?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, suffix, ...props }, ref) => {
    if (icon || suffix) {
      return (
        <div className="relative flex items-center">
          {icon && (
            <span className="absolute left-3 text-muted-foreground pointer-events-none">
              {icon}
            </span>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-[var(--radius)] border border-[var(--input)] bg-[var(--secondary)] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary focus:bg-background",
              "disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
              icon && "pl-9",
              suffix && "pr-9",
              className
            )}
            ref={ref}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-[var(--radius)] border border-[var(--input)] bg-[var(--secondary)] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary focus:bg-background",
          "disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }