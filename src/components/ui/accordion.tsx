import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// Type discrimination for single vs multiple accordion
interface AccordionSingleProps {
  type: "single";
  collapsible?: boolean;
  className?: string;
  children?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  orientation?: "horizontal" | "vertical";
}

interface AccordionMultipleProps {
  type: "multiple";
  collapsible?: boolean;
  className?: string;
  children?: React.ReactNode;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  orientation?: "horizontal" | "vertical";
}

type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

const Accordion: React.FC<AccordionProps> = (props) => {
  if (props.type === "single") {
    const { type: _, ...singleProps } = props as AccordionSingleProps;
    return <AccordionPrimitive.Root data-slot="accordion" type="single" {...singleProps} />;
  } else {
    const { type: _, ...multipleProps } = props as AccordionMultipleProps;
    return <AccordionPrimitive.Root data-slot="accordion" type="multiple" {...multipleProps} />;
  }
}

Accordion.displayName = "Accordion"

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  value: string;
}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props} />
  );
})

AccordionItem.displayName = "AccordionItem"

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  children: React.ReactNode;
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}>
        {children}
        <ChevronDownIcon
          className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
})

AccordionTrigger.displayName = "AccordionTrigger"

interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  children: React.ReactNode;
}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}>
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
})

AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
