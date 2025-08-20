import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

interface HoverCardProps extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root> {}

const HoverCard: React.FC<HoverCardProps> = ({ ...props }) => {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

HoverCard.displayName = "HoverCard"

interface HoverCardTriggerProps extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger> {}

const HoverCardTrigger = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Trigger>,
  HoverCardTriggerProps
>(({ ...props }, ref) => {
  return (<HoverCardPrimitive.Trigger ref={ref} data-slot="hover-card-trigger" {...props} />);
})

HoverCardTrigger.displayName = "HoverCardTrigger"

interface HoverCardContentProps extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  align?: "center" | "start" | "end";
  sideOffset?: number;
}

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        ref={ref}
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props} />
    </HoverCardPrimitive.Portal>
  );
})

HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }
