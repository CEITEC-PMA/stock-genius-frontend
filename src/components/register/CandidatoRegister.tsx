"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import FormBuilder from "../form/FormBuilder";
import { registerDTOs } from "@/utils/dtos/registerDTOs";
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useEffect, useState } from "react";
import { apiUrl } from "@/utils/api";
import { useRouter } from "next/navigation";

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

export default function CandidatoRegister({ id }: { id: string }) {
  const [candidato, setCandidato] = useState({ foto: [], cpf: "" });
  const router = useRouter();

  const token = localStorage.getItem("token");

  const onSubmit: SubmitHandler<CandidatoInputs> = async (data) => {
    data.zona = "651c2130669db209a4d7833a";
    const response = await fetch(`${apiUrl}/api/v1/candidato/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const getUserId = async () => {
      const response = await fetch(
        `${apiUrl}/api/v1/candidato/candidatoId/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseJson = await response.json();
      setCandidato(responseJson.candidato);
    };
    getUserId();
  }, [id, token]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileLoaded = e.target.files[0];
      const formData = new FormData();
      formData.append("file", fileLoaded);

      //fetch
      fetch(
        `${apiUrl}/api/v1/candidato/images/651c7593e04b20642c3e07fb?cpf=700.193.291-48`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          method: "PUT",
          body: formData,
        }
      ).then(() => {
        router.refresh();
      });
    }
  };

  console.log(candidato);
  let cpfSemTraco = candidato.cpf;
  if (cpfSemTraco) {
    cpfSemTraco = cpfSemTraco.replace(".", "");
    cpfSemTraco = cpfSemTraco.replace(".", "");
    cpfSemTraco = cpfSemTraco.replace("-", "");
  }

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
              src={`${apiUrl}/fotosCandidato/${cpfSemTraco}/${candidato.foto[0]}`}
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
              <VisuallyHiddenInput
                onChange={(e) => handleOnChange(e)}
                type="file"
              />
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
