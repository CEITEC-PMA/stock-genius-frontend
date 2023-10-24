"use client";
import ChecklistCardWithController from "@/components/checklistCard/checklistCardWithController";
import { documents } from "@/components/checklistCard/dataChecklist";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUserContext } from "@/userContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/utils/api";
import SelectInput from "@/components/inputs/SelectInput";
import { analiseCandidaturaDTO } from "@/utils/dtos/analiseDTO";
import Link from "next/link";

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

export default function ChecklistCandidato({
  params,
}: {
  params: { id: string };
}) {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [candidato, setCandidato] = useState<CandidatoClass>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data: any) => {
    try {
      const apiUrl = "https://anapolis.go.gov.br/seu-endpoint-aqui"; // Substitua com o endpoint correto
      const requestBody = JSON.stringify({ aprovado: "sim" });

      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (response.ok) {
        alert("Documentação de candidatura aprovada");
      } else {
        console.error("Erro ao fazer a solicitação");
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação PUT", error);
    }
  };

  let cpfSemTraco = candidato?.cpf;
  if (cpfSemTraco) {
    cpfSemTraco = cpfSemTraco.replace(".", "");
    cpfSemTraco = cpfSemTraco.replace(".", "");
    cpfSemTraco = cpfSemTraco.replace("-", "");
  }

  return (
    <Box margin="24px">
      <Container>
        <Typography variant="h4" marginBottom="12px" textAlign="center">
          Checklist dos documentos necessários para registro da
          candidatura/indicação
        </Typography>
        <Paper sx={{ padding: "12px" }}>
          <Box margin="0 12px">
            <Typography variant="h6">
              Unidade de ensino:{" "}
              <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
                {candidato?.zona?.nome}
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
            {documents.map((document, i) => (
              <ChecklistCardWithController
                name={document.name}
                alt="Documento Enviado"
                src={`${apiUrl}/fotosCandidato/${cpfSemTraco}/${
                  candidato?.docs[document.categoria]?.file
                }`}
                control={control}
                key={i}
              />
            ))}

            <SelectInput
              control={control}
              errors={errors}
              inputDTO={analiseCandidaturaDTO}
            />

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
    </Box>
  );
}
