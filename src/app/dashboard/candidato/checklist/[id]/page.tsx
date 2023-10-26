"use client";
import ChecklistCardWithController from "@/components/checklistCard/checklistCardWithController";
import { documents } from "@/components/checklistCard/dataChecklist";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useUserContext } from "@/userContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/utils/api";
import SelectInput from "@/components/inputs/SelectInput";
import { analiseCandidaturaDTO } from "@/utils/dtos/analiseDTO";
import { Candidato } from "@/utils/types/candidato.types";

export default function ChecklistCandidato({
  params,
}: {
  params: { id: string };
}) {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [candidato, setCandidato] = useState<Candidato>();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const aprovado = watch("analise_candidatura");

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

  useEffect(() => {
    if (candidato?.aprovado === "Indeferida") {
      setValue("analise_candidatura", candidato.aprovado);
      setValue("justificativa", candidato.justificativa);
    } else {
      setValue("analise_candidatura", candidato?.aprovado);
    }
  }, [candidato, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const requestBody = {
        aprovado: data.analise_candidatura,
        justificativa: data.justificativa,
      };

      const response = await fetch(
        `${apiUrl}/api/v1/candidato/${candidato?._id}`,
        {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        alert("Documentação de candidatura analisada!");
        router.push(`/dashboard/dataAdm`);
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
            {documents.map((document, i) => {
              let src = `${apiUrl}/fotosCandidato/${cpfSemTraco}/${
                candidato?.docs[document.name]?.file
              }`;
              if (
                src.includes("undefined") ||
                src.endsWith(`${cpfSemTraco}/`)
              ) {
                src = "https://api.anapolis.go.gov.br/apiupload/sed/error.png";
              }

              return (
                <ChecklistCardWithController
                  name={document.name}
                  alt="Documento Enviado"
                  label={document.label}
                  src={src}
                  control={control}
                  key={i}
                />
              );
            })}
            <div style={{ margin: "8px 16px" }}>
              <SelectInput
                control={control}
                errors={errors}
                inputDTO={analiseCandidaturaDTO}
              />

              {aprovado === "Indeferida" && (
                <Controller
                  name="justificativa"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Justificativa é obrigatória" }}
                  render={({ field }) => (
                    <div style={{ marginTop: "16px" }}>
                      <TextField
                        {...field}
                        label="Justificativa do indeferimento da candidatura"
                        variant="outlined"
                        fullWidth
                        multiline
                        maxRows={4}
                        onChange={(e) => {
                          const value = e.target.value;
                          const capitalizedValue = value
                            .toLowerCase()
                            .split(". ")
                            .map(
                              (sentence) =>
                                sentence.charAt(0).toUpperCase() +
                                sentence.slice(1)
                            )
                            .join(". ");

                          field.onChange(capitalizedValue);
                        }}
                      />
                    </div>
                  )}
                />
              )}
            </div>

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
