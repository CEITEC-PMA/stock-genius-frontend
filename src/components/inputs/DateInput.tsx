import { TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { CandidatoInputs } from "../register/CandidatoRegister";
import { PatternFormat } from "react-number-format";
import { RegisterDTO } from "@/utils/dtos/registerDTOs";

interface DateInputProps {
  control: Control<CandidatoInputs, any>;
  errors: FieldErrors<CandidatoInputs>;
  inputDTO: RegisterDTO;
}

export default function DateInput({
  control,
  errors,
  inputDTO,
}: DateInputProps) {
  return (
    <Controller
      name={inputDTO.name}
      defaultValue=""
      control={control}
      rules={{ required: `${inputDTO.label} é obrigatório` }}
      render={({ field }) => (
        <PatternFormat
          fullWidth
          error={errors[inputDTO.name] ? true : false}
          customInput={TextField}
          format={"##/##/####"}
          mask={"_"}
          label={inputDTO.label}
          helperText={errors[inputDTO.name]?.message}
          {...field}
        />
      )}
    />
  );
}
