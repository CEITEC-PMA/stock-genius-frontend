"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import FormBuilder from "../form/FormBuilder";
import { registerDTOs } from "@/utils/dtos/registerDTOs";
import Header from "../header";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

export type CandidatoInputs = {
  cpf: string;
  nome: string;
  matricula: string;
  data: string;
  telefone: string;
  email: string;
  funcao: string;
  cargo: string;
  curso_gestor: string;
  data_entrada_inst: string;
  data_entrada_docencia: string;
  obs_curso_gestor: string;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CandidatoRegister() {
  const onSubmit: SubmitHandler<CandidatoInputs> = async (data) => {
    console.log(data);
    const response = await fetch(
      "http://192.168.1.124:3002/api/v1/candidato/",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    console.log(response);
  };

  return (
    <>
      <Header />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        bgcolor="#f4f4f4"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item container>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={12}
          >
            <Typography variant="h4">Cadastro de candidato</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={12}
          >
            <Avatar
              alt="User"
              src={"/user-15.png"}
              sx={{
                width: 230,
                height: 230,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10px",
              }}
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Foto do candidato
              <VisuallyHiddenInput type="file" />
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormBuilder onSubmit={onSubmit} formDTOs={registerDTOs} />
        </Grid>
      </Grid>
    </>
  );
}
