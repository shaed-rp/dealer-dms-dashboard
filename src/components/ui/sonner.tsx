import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner";

interface ToasterComponentProps extends ToasterProps {}

const Toaster: React.FC<ToasterComponentProps> = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)"
        } as React.CSSProperties
      }
      {...props} />
  );
}

Toaster.displayName = "Toaster"

export { Toaster }
