"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface AlertDialogProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root> {}

const AlertDialog: React.FC<AlertDialogProps> = ({ ...props }) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

AlertDialog.displayName = "AlertDialog"

interface AlertDialogTriggerProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger> {}

const AlertDialogTrigger = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Trigger>,
  AlertDialogTriggerProps
>(({ ...props }, ref) => {
  return (<AlertDialogPrimitive.Trigger ref={ref} data-slot="alert-dialog-trigger" {...props} />);
})

AlertDialogTrigger.displayName = "AlertDialogTrigger"

interface AlertDialogPortalProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Portal> {}

const AlertDialogPortal: React.FC<AlertDialogPortalProps> = ({ ...props }) => {
  return (<AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />);
}

AlertDialogPortal.displayName = "AlertDialogPortal"

interface AlertDialogOverlayProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> {}

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  AlertDialogOverlayProps
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props} />
  );
})

AlertDialogOverlay.displayName = "AlertDialogOverlay"

interface AlertDialogContentProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {}

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props} />
    </AlertDialogPortal>
  );
})

AlertDialogContent.displayName = "AlertDialogContent"

interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const AlertDialogHeader = React.forwardRef<HTMLDivElement, AlertDialogHeaderProps>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props} />
  );
})

AlertDialogHeader.displayName = "AlertDialogHeader"

interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const AlertDialogFooter = React.forwardRef<HTMLDivElement, AlertDialogFooterProps>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      data-slot="alert-dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props} />
  );
})

AlertDialogFooter.displayName = "AlertDialogFooter"

interface AlertDialogTitleProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {}

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  AlertDialogTitleProps
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props} />
  );
})

AlertDialogTitle.displayName = "AlertDialogTitle"

interface AlertDialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> {}

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props} />
  );
})

AlertDialogDescription.displayName = "AlertDialogDescription"

interface AlertDialogActionProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {}

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, ...props }, ref) => {
  return (<AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />);
})

AlertDialogAction.displayName = "AlertDialogAction"

interface AlertDialogCancelProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {}

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props} />
  );
})

AlertDialogCancel.displayName = "AlertDialogCancel"

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
