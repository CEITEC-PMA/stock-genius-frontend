"use client";
import DocslistCard from "@/components/form/DocsListCard";
import { documentsList } from "@/components/form/formsDocsList";
import { useUserContext } from "@/userContext";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiUrl } from "@/utils/api";

interface Candidato {
  candidato: CandidatoClass;
}

interface CandidatoClass {
  curso_gestor: string;
  foto: any[];
  docs: { [key: string]: Doc };
  deletado: boolean;
  _id: string;
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  funcao: string;
  matricula: number;
  data_entrada_inst: Date;
  data_entrada_docencia: Date;
  tempo_modulacao: string;
  tempo_docencia: string;
  protocolo: string;
  zona: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface Doc {
  file: string;
  original_file: string;
}

const onSubmit = (data: any) => {
  console.log(data);
  console.log("enviou");
};

export default function DocsCandidato({ params }: { params: { id: string } }) {
  const { control, handleSubmit } = useForm();
  const { user, setUser } = useUserContext();
  const [candidato, setCandidato] = useState<CandidatoClass>();
  const router = useRouter();

  useEffect(() => {
    const getDadosCandidato = async (id: string, token: string) => {
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
      return;
    };
    const token = localStorage.getItem("token");
    if (token) {
      getDadosCandidato(params.id, token);
    }
  }, [params.id]);

  return (
    <Box margin="24px">
      <Container>
        <Typography variant="h4" marginBottom="12px" textAlign="center">
          Documentos do candidato
        </Typography>
        <Paper sx={{ padding: "12px" }}>
          <Box margin="0 12px">
            <Typography variant="h6">
              Unidade de ensino:{" "}
              <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
                {user?.nome}
              </span>
            </Typography>
            <Typography variant="h6">
              Nome do candidato(a)/indicado(a):{" "}
              <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
                {candidato?.nome}
              </span>
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            {candidato ? (
              documentsList.map((document, i) => (
                <DocslistCard
                  candidato={candidato}
                  name={document.name}
                  categoria={document.categoria}
                  key={i}
                />
              ))
            ) : (
              <div>Carregando...</div>
            )}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            ></Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
