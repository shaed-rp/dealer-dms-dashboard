import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(({
  ...props
}, ref) => {
  return <nav ref={ref} aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
})

Breadcrumb.displayName = "Breadcrumb"

interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<"ol"> {}

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(({
  className,
  ...props
}, ref) => {
  return (
    <ol
      ref={ref}
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props} />
  );
})

BreadcrumbList.displayName = "BreadcrumbList"

interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(({
  className,
  ...props
}, ref) => {
  return (
    <li
      ref={ref}
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props} />
  );
})

BreadcrumbItem.displayName = "BreadcrumbItem"

interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(({
  asChild,
  className,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props} />
  );
})

BreadcrumbLink.displayName = "BreadcrumbLink"

interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<"span"> {}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(({
  className,
  ...props
}, ref) => {
  return (
    <span
      ref={ref}
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props} />
  );
})

BreadcrumbPage.displayName = "BreadcrumbPage"

interface BreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<"li"> {
  children?: React.ReactNode;
}

const BreadcrumbSeparator = React.forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <li
      ref={ref}
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
})

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

interface BreadcrumbEllipsisProps extends React.ComponentPropsWithoutRef<"span"> {}

const BreadcrumbEllipsis = React.forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(({
  className,
  ...props
}, ref) => {
  return (
    <span
      ref={ref}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}>
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
})

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
