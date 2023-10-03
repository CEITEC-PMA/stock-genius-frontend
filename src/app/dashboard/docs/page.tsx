"use client";
import DocslistCard from "@/components/form/DocsListCard";
import { documentsList } from "@/components/form/formsDocsList";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const onSubmit = (data: any) => {
  console.log(data);
  console.log("enviou");
};

const nomeUnidade = "Escola Municipal Teste";
const nomeCandidato = "Candidato Teste da Silva";

export default function FormDocs() {
  const { control, handleSubmit } = useForm();

  return (
    <Container>
      <Typography variant="h4" textAlign="center">
        Documentos do candidato
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
          {documentsList.map((document, i) => (
            <DocslistCard name={document.name} key={i} />
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
