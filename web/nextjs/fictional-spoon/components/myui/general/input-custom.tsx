import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

// can't create variants because of 'size' argument
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  sizeCN?: any
  variant?: "default" | "outline" | "ghost" | null | undefined
}

const inputVariants = cva(
  "flex h-10 w-full bg-background px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md border border-input",
        outline: "rounded-md border border-input",
        ghost: "",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const InputCustom = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, sizeCN, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size: sizeCN, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
InputCustom.displayName = "Input"

export { InputCustom }
