import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Inputs } from "../register";

interface TextInputs {
  control: Control<Inputs, any>;
  name: keyof Inputs;
  errors: FieldErrors<Inputs>;
  label: string;
}

export default function SelectInput({
  control,
  name,
  errors,
  label,
}: TextInputs) {
  return (
    <FormControl fullWidth>
      <InputLabel id={`label-${name}`}>{label}</InputLabel>
      <Controller
        name={name}
        defaultValue=""
        control={control}
        rules={{ required: `${label} é obrigatório` }}
        render={({ field }) => (
          <Select {...field} label={label} labelId={`label-${name}`}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        )}
      />
    </FormControl>
  );
}
