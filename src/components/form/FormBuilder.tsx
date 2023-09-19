import { Button, Grid } from "@mui/material";
import React from "react";
import ComponenteTeste from "./ComponenteTeste";
import CpfInput from "../inputs/CpfInput";
import { registerDTOs } from "@/utils/dtos/registerDTOs";
import TextInput from "../inputs/TextInput";
import DateInput from "../inputs/DateInput";

export default function FormBuilder({ control, errors }) {
  return (
    <form>
      <Grid container>
        {registerDTOs.map((dto, i) => (
          <TextInput key={i} control={control} errors={errors} inputDTO={dto} />
        ))}
      </Grid>
      <Button>enviar</Button>
    </form>
  );
}
