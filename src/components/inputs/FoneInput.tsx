import { TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Inputs } from "../register";
import { PatternFormat } from "react-number-format";

interface TextInputs {
  control: Control<Inputs, any>;
  name: keyof Inputs;
  errors: FieldErrors<Inputs>;
  label: string;
}

export default function FoneInput({
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
      rules={{ required: `${label} é obrigatório` }}
      render={({ field }) => (
        <PatternFormat
          fullWidth
          error={errors[name] ? true : false}
          customInput={TextField}
          format={"(##) #####-####"}
          mask={"_"}
          label={label}
          helperText={errors[name]?.message}
          {...field}
        />
      )}
    />
  );
}
