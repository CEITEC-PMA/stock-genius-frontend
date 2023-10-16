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
import { useUserContext } from "@/userContext";

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

export default function CandidatoRegisterSemFoto() {
  const [candidato, setCandidato] = useState({ foto: [], cpf: "" });
  const { user, setUser } = useUserContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CandidatoInputs>({ mode: "onBlur" });

  const router = useRouter();

  function FormataStringData(data: string) {
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[2];

    return ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }

  const onSubmit: SubmitHandler<CandidatoInputs> = async (data) => {
    data.zona = user._id;
    data.data_entrada_inst = FormataStringData(data.data_entrada_inst);
    data.data_entrada_docencia = FormataStringData(data.data_entrada_docencia);
    const response = await fetch(`${apiUrl}/api/v1/candidato/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      alert("candidato cadastrado com sucesso");
      router.push("/dashboard/data");
    });
  };

  console.log(candidato);
  let cpfSemTraco = candidato.cpf;
  if (cpfSemTraco) {
    cpfSemTraco = cpfSemTraco.replace(".", "");
    cpfSemTraco = cpfSemTraco.replace(".", "");
    cpfSemTraco = cpfSemTraco.replace("-", "");
  }

  const formBuilderDTO = {
    formDTOs: registerDTOs,
    onSubmit,
    control,
    handleSubmit,
    errors,
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
          ></Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormBuilder formBuilderDTO={formBuilderDTO} />
        </Grid>
      </Grid>
    </Paper>
  );
}
