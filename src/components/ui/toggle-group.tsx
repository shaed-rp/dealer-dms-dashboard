"use client";
import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

interface ToggleGroupContextValue {
  size: "default" | "sm" | "lg";
  variant: "default" | "outline";
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: "default",
  variant: "default",
})

// Type discrimination for single vs multiple toggle group
interface ToggleGroupSingleProps {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
  type: "single";
  className?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
}

interface ToggleGroupMultipleProps {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
  type: "multiple";
  className?: string;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
}

type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

const ToggleGroup = React.forwardRef<
  HTMLDivElement,
  ToggleGroupProps
>((allProps, ref) => {
  const { className, variant, size, children, type } = allProps;
  
  if (type === "single") {
    const { type: _, ...singleProps } = allProps as ToggleGroupSingleProps;
    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        data-slot="toggle-group"
        data-variant={variant}
        data-size={size}
        className={cn(
          "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
          className
        )}
        type="single"
        {...singleProps}>
        <ToggleGroupContext.Provider value={{ variant: variant || "default", size: size || "default" }}>
          {children}
        </ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    );
  } else {
    const { type: _, ...multipleProps } = allProps as ToggleGroupMultipleProps;
    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        data-slot="toggle-group"
        data-variant={variant}
        data-size={size}
        className={cn(
          "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
          className
        )}
        type="multiple"
        {...multipleProps}>
        <ToggleGroupContext.Provider value={{ variant: variant || "default", size: size || "default" }}>
          {children}
        </ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    );
  }
})

ToggleGroup.displayName = "ToggleGroup"

interface ToggleGroupItemProps extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {
  children: React.ReactNode;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  value: string;
}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({
  className,
  children,
  variant,
  size,
  ...props
}, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(toggleVariants({
        variant: context.variant || variant,
        size: context.size || size,
      }), "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l", className)}
      {...props}>
      {children}
    </ToggleGroupPrimitive.Item>
  );
})

ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup, ToggleGroupItem }
