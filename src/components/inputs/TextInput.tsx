import { TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Inputs } from "../register";

interface TextInputs {
  control: Control<Inputs, any>;
  errors: FieldErrors<Inputs>;
  inputDTO: {
    name: keyof Inputs;
    label: string;
  };
}

export default function TextInput({ control, errors, inputDTO }: TextInputs) {
  return (
    <Controller
      name={inputDTO.name}
      defaultValue=""
      control={control}
      rules={{ required: `${inputDTO.label} é obrigatório` }}
      render={({ field }) => (
        <TextField
          fullWidth
          error={errors[inputDTO.name] ? true : false}
          label={inputDTO.label}
          helperText={errors[inputDTO.name]?.message}
          {...field}
        />
      )}
    />
  );
}
