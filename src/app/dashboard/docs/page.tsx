"use client";
import ChecklistCard from "@/components/checklistCard";
import ChecklistCardWithController from "@/components/checklistCard/checklistCardWithController";
import { documents } from "@/components/checklistCard/dataChecklist";
import { Button, Container, Paper, Typography } from "@mui/material";
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

      <Paper sx={{ padding: "12px" }}>
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
          <Button type="submit" variant="contained" style={{ margin: "12px" }}>
            Salvar
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
