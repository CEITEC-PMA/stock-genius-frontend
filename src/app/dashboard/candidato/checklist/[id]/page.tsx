"use client";
import ChecklistCardWithController from "@/components/checklistCard/checklistCardWithController";
import { documents } from "@/components/checklistCard/dataChecklist";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Tooltip,
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
import FindInPageIcon from "@mui/icons-material/FindInPage";

export default function ChecklistCandidato({
  params,
}: {
  params: { id: string };
}) {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [candidato, setCandidato] = useState<Candidato>();
  const [fotoCandidato, setFotoCandidato] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [hasDoc, setHasDoc] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const aprovado = watch("analise_candidatura");
  const textoRecurso = watch("textoRecurso");
  const respostaComissao = watch("respostaComissao");

  useEffect(() => {
    if (candidato) {
      setFileLink(candidato.docs.doc_recurso?.file);
    }
  }, [candidato, candidato?.docs]);

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
      setHasDoc(!!responseJson.candidato?.docs.doc_recurso?.file);
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
      setValue("textoRecurso", candidato.textoRecurso);
      setValue("respostaComissao", candidato.respostaComissao);
    } else {
      setValue("analise_candidatura", candidato?.aprovado);
    }
  }, [candidato, setValue]);

  useEffect(() => {
    if (candidato) {
      setFotoCandidato(candidato.foto[0]);
    }
  }, [candidato?.foto]);

  const onSubmit = async (data: any) => {
    try {
      const requestBody = {
        aprovado: data.analise_candidatura,
        justificativa: data.justificativa,
        respostaComissao: data.respostaComissao,
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
            <Box display="flex" justifyContent="center" alignContent="center">
              <Avatar
                alt="User"
                src={`${apiUrl}/fotosCandidato/${cpfSemTraco}/${fotoCandidato}`}
                sx={{
                  width: { xs: 85, sm: 130, md: 150, lg: 175 },
                  height: { xs: 85, sm: 130, md: 150, lg: 175 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              />
            </Box>
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

              {textoRecurso !== "" && (
                <Controller
                  name="textoRecurso"
                  control={control}
                  defaultValue=""
                  // rules={{ required: "Justificativa é obrigatória" }}
                  render={({ field }) => (
                    <div style={{ marginTop: "16px" }}>
                      <TextField
                        {...field}
                        label="Texto do recurso"
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
              <div
                style={{
                  margin: "8px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {hasDoc && (
                  <Tooltip title="Documento enviado">
                    <Button
                      href={`${apiUrl}/fotosCandidato/${cpfSemTraco}/${fileLink}`}
                      target="_blank"
                    >
                      <FindInPageIcon color="success" />
                    </Button>
                  </Tooltip>
                )}
              </div>
              {aprovado === "Indeferida" && (
                <Controller
                  name="respostaComissao"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div style={{ marginTop: "16px" }}>
                      <TextField
                        {...field}
                        label="Resposta da Comissão Eleitoral Municipal sobre o recurso"
                        variant="outlined"
                        fullWidth
                        multiline
                        maxRows={6}
                        onChange={(e) => field.onChange(e.target.value)}
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
