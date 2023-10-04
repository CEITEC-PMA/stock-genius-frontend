"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import FormBuilder from "../form/FormBuilder";
import { registerDTOs } from "@/utils/dtos/registerDTOs";
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
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
  zona?: string;
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
    data.zona = "651c2130669db209a4d7833a";
    const response = await fetch(
      "http://192.168.0.100:3002/api/v1/candidato/",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  };

  return (
    <Paper elevation={2}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        bgcolor="#fff"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item container>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "16px",
              marginBottom: "8px",
            }}
            xs={12}
          >
            <Typography variant="h4" textAlign="center">
              Cadastro de candidato
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "8px",
            }}
            xs={12}
          >
            <Avatar
              alt="User"
              src={"/user-15.png"}
              sx={{
                width: { xs: 85, sm: 130, md: 150, lg: 175 },
                height: { xs: 85, sm: 130, md: 150, lg: 175 },
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
    </Paper>
  );
}
