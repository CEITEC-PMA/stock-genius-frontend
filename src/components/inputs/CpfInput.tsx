import { TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Inputs } from "../register";
import { PatternFormat } from "react-number-format";
import { cpf } from "cpf-cnpj-validator";

interface CpfInputs {
  control: Control<Inputs, any>;
  errors: FieldErrors<Inputs>;
}

export default function CpfInput({ control, errors }: CpfInputs) {
  return (
    <Controller
      name={"cpf"}
      defaultValue=""
      control={control}
      rules={{
        required: "Cpf é obrigatório",
        validate: (value) => cpf.isValid(value) || "CPF invalido",
      }}
      render={({ field }) => (
        <PatternFormat
          fullWidth
          error={errors.cpf ? true : false}
          customInput={TextField}
          format={"###.###.###-##"}
          mask={"_"}
          label={"CPF"}
          helperText={errors.cpf?.message}
          {...field}
        />
      )}
    />
  );
}
