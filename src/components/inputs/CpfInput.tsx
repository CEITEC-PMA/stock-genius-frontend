import { TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { CandidatoInputs } from "../register/CandidatoRegister";
import { PatternFormat } from "react-number-format";
import { cpf } from "cpf-cnpj-validator";
import { RegisterDTO } from "@/utils/dtos/registerDTOs";

interface CpfInputProps {
  control: Control<CandidatoInputs, any>;
  errors: FieldErrors<CandidatoInputs>;
  inputDTO: RegisterDTO;
}

export default function CpfInput({ control, errors, inputDTO }: CpfInputProps) {
  return (
    <Controller
      name={inputDTO.name}
      defaultValue=""
      control={control}
      rules={{
        required: `${inputDTO.label} é obrigatório`,
        //@ts-ignore
        validate: (value) => cpf.isValid(value) || "CPF invalido",
      }}
      render={({ field }) => (
        <PatternFormat
          fullWidth
          error={errors[inputDTO.name] ? true : false}
          customInput={TextField}
          format={"###.###.###-##"}
          mask={"_"}
          label={inputDTO.label}
          helperText={errors[inputDTO.name]?.message}
          {...field}
        />
      )}
    />
  );
}
