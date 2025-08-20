import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface MenubarProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> {}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  MenubarProps
>(({ className, ...props }, ref) => {
  return (
    <MenubarPrimitive.Root
      ref={ref}
      data-slot="menubar"
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className
      )}
      {...props} />
  );
})

Menubar.displayName = "Menubar"

interface MenubarMenuProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Menu> {}

const MenubarMenu: React.FC<MenubarMenuProps> = ({ ...props }) => {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

MenubarMenu.displayName = "MenubarMenu"

interface MenubarGroupProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Group> {}

const MenubarGroup = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Group>,
  MenubarGroupProps
>(({ ...props }, ref) => {
  return <MenubarPrimitive.Group ref={ref} data-slot="menubar-group" {...props} />;
})

MenubarGroup.displayName = "MenubarGroup"

interface MenubarPortalProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Portal> {}

const MenubarPortal: React.FC<MenubarPortalProps> = ({ ...props }) => {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

MenubarPortal.displayName = "MenubarPortal"

interface MenubarRadioGroupProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioGroup> {}

const MenubarRadioGroup = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioGroup>,
  MenubarRadioGroupProps
>(({ ...props }, ref) => {
  return (<MenubarPrimitive.RadioGroup ref={ref} data-slot="menubar-radio-group" {...props} />);
})

MenubarRadioGroup.displayName = "MenubarRadioGroup"

interface MenubarTriggerProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> {}

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  MenubarTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      data-slot="menubar-trigger"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
        className
      )}
      {...props} />
  );
})

MenubarTrigger.displayName = "MenubarTrigger"

interface MenubarContentProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> {
  align?: "start" | "center" | "end";
  alignOffset?: number;
  sideOffset?: number;
}

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  MenubarContentProps
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        ref={ref}
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
          className
        )}
        {...props} />
    </MenubarPortal>
  );
})

MenubarContent.displayName = "MenubarContent"

interface MenubarItemProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> {
  inset?: boolean;
  variant?: "default" | "destructive";
}

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  MenubarItemProps
>(({ className, inset, variant = "default", ...props }, ref) => {
  return (
    <MenubarPrimitive.Item
      ref={ref}
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props} />
  );
})

MenubarItem.displayName = "MenubarItem"

interface MenubarCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem> {
  children: React.ReactNode;
  checked?: boolean;
}

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  MenubarCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => {
  return (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      data-slot="menubar-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}>
      <span
        className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
})

MenubarCheckboxItem.displayName = "MenubarCheckboxItem"

interface MenubarRadioItemProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem> {
  children: React.ReactNode;
  value: string;
}

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  MenubarRadioItemProps
>(({ className, children, ...props }, ref) => {
  return (
    <MenubarPrimitive.RadioItem
      ref={ref}
      data-slot="menubar-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}>
      <span
        className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
})

MenubarRadioItem.displayName = "MenubarRadioItem"

interface MenubarLabelProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> {
  inset?: boolean;
}

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  MenubarLabelProps
>(({ className, inset, ...props }, ref) => {
  return (
    <MenubarPrimitive.Label
      ref={ref}
      data-slot="menubar-label"
      data-inset={inset}
      className={cn("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className)}
      {...props} />
  );
})

MenubarLabel.displayName = "MenubarLabel"

interface MenubarSeparatorProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator> {}

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  MenubarSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <MenubarPrimitive.Separator
      ref={ref}
      data-slot="menubar-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props} />
  );
})

MenubarSeparator.displayName = "MenubarSeparator"

interface MenubarShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

const MenubarShortcut = React.forwardRef<HTMLSpanElement, MenubarShortcutProps>(({
  className,
  ...props
}, ref) => {
  return (
    <span
      ref={ref}
      data-slot="menubar-shortcut"
      className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props} />
  );
})

MenubarShortcut.displayName = "MenubarShortcut"

interface MenubarSubProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Sub> {}

const MenubarSub: React.FC<MenubarSubProps> = ({ ...props }) => {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

MenubarSub.displayName = "MenubarSub"

interface MenubarSubTriggerProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> {
  inset?: boolean;
  children: React.ReactNode;
}

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  MenubarSubTriggerProps
>(({ className, inset, children, ...props }, ref) => {
  return (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
        className
      )}
      {...props}>
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  );
})

MenubarSubTrigger.displayName = "MenubarSubTrigger"

interface MenubarSubContentProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent> {}

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  MenubarSubContentProps
>(({ className, ...props }, ref) => {
  return (
    <MenubarPrimitive.SubContent
      ref={ref}
      data-slot="menubar-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props} />
  );
})

MenubarSubContent.displayName = "MenubarSubContent"

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
