import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

interface DrawerProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  direction?: "top" | "bottom" | "left" | "right";
  dismissible?: boolean;
  onDrag?: (event: React.PointerEvent, percentageDragged: number) => void;
  onRelease?: (event: React.PointerEvent, open: boolean) => void;
}

const Drawer: React.FC<DrawerProps> = ({ ...props }) => {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

Drawer.displayName = "Drawer"

interface DrawerTriggerProps extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger> {}

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Trigger>,
  DrawerTriggerProps
>(({ ...props }, ref) => {
  return <DrawerPrimitive.Trigger ref={ref} data-slot="drawer-trigger" {...props} />;
})

DrawerTrigger.displayName = "DrawerTrigger"

interface DrawerPortalProps extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Portal> {}

const DrawerPortal: React.FC<DrawerPortalProps> = ({ ...props }) => {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

DrawerPortal.displayName = "DrawerPortal"

interface DrawerCloseProps extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close> {}

const DrawerClose = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Close>,
  DrawerCloseProps
>(({ ...props }, ref) => {
  return <DrawerPrimitive.Close ref={ref} data-slot="drawer-close" {...props} />;
})

DrawerClose.displayName = "DrawerClose"

interface DrawerOverlayProps extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> {}

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  DrawerOverlayProps
>(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitive.Overlay
      ref={ref}
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props} />
  );
})

DrawerOverlay.displayName = "DrawerOverlay"

interface DrawerContentProps extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
  children: React.ReactNode;
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}>
        <div
          className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
})

DrawerContent.displayName = "DrawerContent"

interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props} />
  );
})

DrawerHeader.displayName = "DrawerHeader"

interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props} />
  );
})

DrawerFooter.displayName = "DrawerFooter"

interface DrawerTitleProps extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> {}

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  DrawerTitleProps
>(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitive.Title
      ref={ref}
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props} />
  );
})

DrawerTitle.displayName = "DrawerTitle"

interface DrawerDescriptionProps extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> {}

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitive.Description
      ref={ref}
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props} />
  );
})

DrawerDescription.displayName = "DrawerDescription"

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
