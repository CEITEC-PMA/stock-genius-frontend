"use client";
import ChecklistCardWithController from "@/components/checklistCard/checklistCardWithController";
import { documents } from "@/components/checklistCard/dataChecklist";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export default function DocsCandidato() {
  const nomeUnidade = "Escola Municipal Teste";
  const nomeCandidato = "Candidato Teste da Silva";

  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    console.log("enviou");
  };

  return (
    <Container>
      <Typography variant="h4" textAlign="center">
        Checklist dos documentos necessários para registro da
        candidatura/indicação
      </Typography>

      <Paper sx={{ padding: "12px" }}>
        <Box margin="0 12px">
          <Typography variant="h6">
            Unidade de ensino:{" "}
            <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
              {nomeUnidade}
            </span>
          </Typography>
          <Typography variant="h6">
            Nome do candidato(a)/indicado(a):{" "}
            <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
              {nomeCandidato}
            </span>
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          {documents.map((document, i) => (
            <ChecklistCardWithController
              name={document.name}
              alt={document.alt}
              src={document.src}
              control={control}
              key={i}
            />
          ))}
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              type="submit"
              variant="contained"
              style={{ margin: "12px" }}
              fullWidth
            >
              Salvar
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
