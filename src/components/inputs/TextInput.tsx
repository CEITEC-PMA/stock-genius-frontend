import { TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { CandidatoInputs } from "../register/CandidatoRegister";

interface TextInputs {
  control: Control<CandidatoInputs, any>;
  errors: FieldErrors<CandidatoInputs>;
  inputDTO: {
    name: keyof CandidatoInputs;
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
