import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Controller, FormProvider, useFormContext, useFormState, ControllerRenderProps, ControllerFieldState, UseFormStateReturn, FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface FormFieldContextValue {
  name: string;
}

const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(undefined)

interface FormItemContextValue {
  id: string;
}

const FormItemContext = React.createContext<FormItemContextValue | undefined>(undefined)

const Form = FormProvider

interface FormFieldProps {
  name: string;
  render: ({ field, fieldState, formState }: {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
  }) => React.ReactElement;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  render,
  ...props
}) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller 
        name={name}
        render={render}
        {...props} 
      />
    </FormFieldContext.Provider>
  );
}

FormField.displayName = "FormField"

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext || { id: "" }

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(({
  className,
  ...props
}, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} data-slot="form-item" className={cn("grid gap-2", className)} {...props} />
    </FormItemContext.Provider>
  );
})

FormItem.displayName = "FormItem"

interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {}

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  FormLabelProps
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props} />
  );
})

FormLabel.displayName = "FormLabel"

interface FormControlProps extends React.ComponentPropsWithoutRef<typeof Slot> {}

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  FormControlProps
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props} />
  );
})

FormControl.displayName = "FormControl"

interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(({
  className,
  ...props
}, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props} />
  );
})

FormDescription.displayName = "FormDescription"

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(({
  className,
  children,
  ...props
}, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}>
      {body}
    </p>
  );
})

FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
