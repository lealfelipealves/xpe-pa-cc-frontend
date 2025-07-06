/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";
import { FormField } from "./form-field";

export const InputTextField = ({
  name,
  control,
  label,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  control: Control<any>;
  label?: string;
}) => {
  const { field, fieldState } = useController({ name, control });

  return (
    <FormField name={name} error={fieldState.error?.message} label={label}>
      <input
        {...field}
        {...rest}
        id={name}
        className="w-full peer bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-700 text-sm autofill:bg-transparent"
      />
    </FormField>
  );
};

InputTextField.displayName = "InputTextField";