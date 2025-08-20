import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

interface TooltipProviderProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider> {
  delayDuration?: number;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({
  delayDuration = 0,
  children,
  ...props
}) => {
  return (<TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props}>{children}</TooltipPrimitive.Provider>);
}

TooltipProvider.displayName = "TooltipProvider"

interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {}

const Tooltip: React.FC<TooltipProps> = ({ ...props }) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

Tooltip.displayName = "Tooltip"

interface TooltipTriggerProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> {}

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  TooltipTriggerProps
>(({ ...props }, ref) => {
  return <TooltipPrimitive.Trigger ref={ref} data-slot="tooltip-trigger" {...props} />;
})

TooltipTrigger.displayName = "TooltipTrigger"

interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  sideOffset?: number;
  children: React.ReactNode;
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({
  className,
  sideOffset = 0,
  children,
  ...props
}, ref) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}>
        {children}
        <TooltipPrimitive.Arrow
          className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
})

TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
