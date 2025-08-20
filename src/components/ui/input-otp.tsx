"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface InputOTPProps {
  maxLength: number;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  value?: string;
  onChange?: (newValue: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  pushPasswordManagerStrategy?: "increase-width" | "none";

}

const InputOTP: React.FC<InputOTPProps> = ({
  className,
  containerClassName,
  maxLength,
  children,
  ...props
}) => {
  return (
    <OTPInput
      data-slot="input-otp"
      maxLength={maxLength}
      containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}>
      {children}
    </OTPInput>
  );
}

InputOTP.displayName = "InputOTP"

interface InputOTPGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputOTPGroup: React.FC<InputOTPGroupProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props} />
  );
}

InputOTPGroup.displayName = "InputOTPGroup"

interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const InputOTPSlot: React.FC<InputOTPSlotProps> = ({
  index,
  className,
  ...props
}) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      )}
      {...props}>
      {char}
      {hasFakeCaret && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

InputOTPSlot.displayName = "InputOTPSlot"

interface InputOTPSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputOTPSeparator: React.FC<InputOTPSeparatorProps> = ({
  ...props
}) => {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
