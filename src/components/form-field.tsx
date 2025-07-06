import { cn } from "@/utils";
import { useId } from "react";
import { tv } from "tailwind-variants";
import { FeedbackMessageField } from "./feedback-message-field";

export const formField = tv({
  base: "w-full rounded-xl px-3 pt-5 pb-2 shadow-[0px_1px_2px_0px_rgba(128,128,128,0.08)] inline-flex justify-start items-center gap-2 overflow-hidden outline outline-offset-[-1px] focus-within:ring-1 focus-within:ring-indigo-50",
  variants: {
    error: {
      true: "border border-red-600 outline-red-600 ring-1 ring-red-600",
      false: "border border-indigo-50 outline-indigo-50",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed bg-gray-100",
    },
  },
  defaultVariants: {
    error: false,
    disabled: false,
  },
});

export const formLabel = tv({
  base: "absolute left-3 top-2 text-[10px] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-[10px]",
  variants: {
    error: {
      true: "text-[#F04438]",
      false: "text-gray-500",
    },
    disabled: {
      true: "text-gray-300",
    },
  },
  defaultVariants: {
    error: false,
    disabled: false,
  },
});

interface FormFieldProps {
  id?: string;
  label?: string;
  name: string;
  children: React.ReactNode;
  error?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const FormField = ({
  id,
  label,
  className,
  children,
  error,
  description,
  disabled,
}: FormFieldProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="relative w-full">
      <div className={cn(formField({ error: !!error, disabled }), className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={formLabel({ error: !!error, disabled })}
          >
            {label}
          </label>
        )}
        <div className={cn('w-full', disabled ? "opacity-50" : "")}>{children}</div>
      </div>
      {description && (
        <p className="text-sm text-gray-700 mt-1">{description}</p>
      )}
      {error && <FeedbackMessageField className="mt-1">{error}</FeedbackMessageField>}
    </div>
  );
};
