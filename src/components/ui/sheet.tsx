import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface SheetProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Root> {}

const Sheet: React.FC<SheetProps> = ({ ...props }) => {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

Sheet.displayName = "Sheet"

interface SheetTriggerProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Trigger> {}

const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Trigger>,
  SheetTriggerProps
>(({ ...props }, ref) => {
  return <SheetPrimitive.Trigger ref={ref} data-slot="sheet-trigger" {...props} />;
})

SheetTrigger.displayName = "SheetTrigger"

interface SheetCloseProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Close> {}

const SheetClose = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Close>,
  SheetCloseProps
>(({ ...props }, ref) => {
  return <SheetPrimitive.Close ref={ref} data-slot="sheet-close" {...props} />;
})

SheetClose.displayName = "SheetClose"

interface SheetPortalProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Portal> {}

const SheetPortal: React.FC<SheetPortalProps> = ({ ...props }) => {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

SheetPortal.displayName = "SheetPortal"

interface SheetOverlayProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> {}

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  SheetOverlayProps
>(({ className, ...props }, ref) => {
  return (
    <SheetPrimitive.Overlay
      ref={ref}
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props} />
  );
})

SheetOverlay.displayName = "SheetOverlay"

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ className, children, side = "right", ...props }, ref) => {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}>
        {children}
        <SheetPrimitive.Close
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
})

SheetContent.displayName = "SheetContent"

interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props} />
  );
})

SheetHeader.displayName = "SheetHeader"

interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SheetFooter = React.forwardRef<HTMLDivElement, SheetFooterProps>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props} />
  );
})

SheetFooter.displayName = "SheetFooter"

interface SheetTitleProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title> {}

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  SheetTitleProps
>(({ className, ...props }, ref) => {
  return (
    <SheetPrimitive.Title
      ref={ref}
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props} />
  );
})

SheetTitle.displayName = "SheetTitle"

interface SheetDescriptionProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description> {}

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  SheetDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <SheetPrimitive.Description
      ref={ref}
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props} />
  );
})

SheetDescription.displayName = "SheetDescription"

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
