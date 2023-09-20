import { TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Inputs } from "../register";
import { RegisterDTO } from "@/utils/dtos/registerDTOs";

interface EmailInputProps {
  control: Control<Inputs, any>;
  errors: FieldErrors<Inputs>;
  inputDTO: RegisterDTO;
}

export default function EmailInput({
  control,
  errors,
  inputDTO,
}: EmailInputProps) {
  return (
    <Controller
      name={inputDTO.name}
      defaultValue=""
      control={control}
      rules={{
        required: `${inputDTO.label} é obrigatório`,
        pattern: {
          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          message: "E-mail invalido",
        },
      }}
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
