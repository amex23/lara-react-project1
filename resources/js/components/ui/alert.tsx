// resources/js/components/ui/alert.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Terminal as TerminalIcon } from "lucide-react"

/* -------------------------------------------------------------------------- */
/*  Base Alert (shadcn)                                                       */
/* -------------------------------------------------------------------------- */
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        terminal: "bg-black text-green-400 border-green-600 [&>svg]:text-green-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

/* -------------------------------------------------------------------------- */
/*  AlertTitle (fixed typo)                                                    */
/* -------------------------------------------------------------------------- */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

/* -------------------------------------------------------------------------- */
/*  AlertDescription                                                          */
/* -------------------------------------------------------------------------- */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

/* -------------------------------------------------------------------------- */
/*  Terminal – a new “terminal-style” alert                                   */
/* -------------------------------------------------------------------------- */
const Terminal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { icon?: React.ReactNode }
>(({ className, icon, children, ...props }, ref) => (
  <Alert
    ref={ref}
    variant="terminal"
    className={cn("font-mono text-xs", className)}
    {...props}
  >
    {icon ?? <TerminalIcon className="h-5 w-5" />}
    <div className="ml-8">{children}</div>
  </Alert>
))
Terminal.displayName = "Terminal"

/* -------------------------------------------------------------------------- */
/*  AlerTitle – intentional duplicate (keeps your old spelling)               */
/* -------------------------------------------------------------------------- */
const AlerTitle = AlertTitle
AlerTitle.displayName = "AlerTitle"

/* -------------------------------------------------------------------------- */
/*  Export everything you need                                                */
/* -------------------------------------------------------------------------- */
export { Alert, Terminal, AlerTitle, AlertTitle, AlertDescription }