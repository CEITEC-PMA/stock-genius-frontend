import { TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Inputs } from "../register";

interface TextInputs {
  control: Control<Inputs, any>;
  name: keyof Inputs;
  errors: FieldErrors<Inputs>;
  label: string;
}

export default function EmailInput({
  control,
  name,
  errors,
  label,
}: TextInputs) {
  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      rules={{
        required: `${label} é obrigatório`,
        pattern: {
          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          message: "E-mail invalido",
        },
      }}
      render={({ field }) => (
        <TextField
          fullWidth
          error={errors[name] ? true : false}
          label={label}
          helperText={errors[name]?.message}
          {...field}
        />
      )}
    />
  );
}
