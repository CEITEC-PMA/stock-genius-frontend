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
import { RegisterDTO } from "@/utils/dtos/registerDTOs";

interface SelectInputProps {
  control: Control<Inputs, any>;
  errors: FieldErrors<Inputs>;
  inputDTO: RegisterDTO;
}

export default function SelectInput({
  control,
  errors,
  inputDTO,
}: SelectInputProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id={`label-${inputDTO.name}`}>{inputDTO.label}</InputLabel>
      <Controller
        name={inputDTO.name}
        defaultValue=""
        control={control}
        rules={{ required: `${inputDTO.label} é obrigatório` }}
        render={({ field }) => (
          <Select
            {...field}
            label={inputDTO.label}
            labelId={`label-${inputDTO.name}`}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        )}
      />
    </FormControl>
  );
}
