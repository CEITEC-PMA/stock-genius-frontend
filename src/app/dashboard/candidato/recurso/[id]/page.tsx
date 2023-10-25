"use client";
import { apiUrl } from "@/utils/api";
import { Candidato } from "@/utils/types/candidato.types";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { SyntheticEvent, ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function RecursoPage({ params }: { params: { id: string } }) {
  const [candidato, setCandidato] = useState<Candidato>();
  const [candidatoDigitou, setCandidatoDigitou] = useState(false);
  const [textoRecurso, setTextoRecurso] = useState("");
  const [docRecurso, setDocRecurso] = useState("");
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

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileLoaded = e.target.files[0];
      const formData = new FormData();
      formData.append("file", fileLoaded);

      //fetch
      fetch(
        `${apiUrl}/api/v1/candidato/images/${candidato?._id}?cpf=${candidato?.cpf}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          method: "PUT",
          body: formData,
        }
      ).then(async (res) => {
        const resJSON = await res.json();
        setDocRecurso(resJSON.candidato.recurso[0]);
        router.refresh();
      });
    }
  };

  const handleSubmit = async (data: any) => {
    const token = localStorage.getItem("token");
    data.preventDefault();
    console.log(JSON.stringify(textoRecurso));
    const response = await fetch(`${apiUrl}/api/v1/candidato/`, {
      method: "POST",
      body: JSON.stringify({ textoRecurso }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      alert("candidato cadastrado com sucesso");
      router.push("/dashboard/data");
    });
  };

  return (
    <Box margin="24px">
      <Container>
        <Typography variant="h3" marginBottom="12px" textAlign="center">
          Recurso do Candidato
        </Typography>
        <Box margin="12px 12px">
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
          <Typography variant="h6">
            Justificativa da Comissão Eleitoral Municipal para indeferimento da
            candidatura:{" "}
            <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
              {candidato?.justificativa}
            </span>
          </Typography>
        </Box>
        {/* <div
          style={{
            height: "645px",
            width: "100%",
            background: "#fff",
          }}
        >
        </div> */}
        <form onSubmit={handleSubmit}>
          <Box
            marginTop="24px"
            display="flex"
            alignItems="center"
            bgcolor="#fff"
          >
            <TextField
              label="Texto do recurso"
              multiline
              rows={8}
              fullWidth
              value={textoRecurso}
              onChange={(e) => {
                setTextoRecurso(e.target.value);
                if (e.target.value.length > 0) {
                  setCandidatoDigitou(true);
                } else {
                  setCandidatoDigitou(false);
                }
              }}
            />
          </Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              marginTop="24px"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              {candidatoDigitou && (
                <div>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Escolha o documento
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => handleOnChange(e)}
                    />
                  </Button>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    marginTop="4px"
                    textAlign="center"
                  >
                    O upload de arquivo é opcional.
                  </Typography>
                </div>
              )}
              <Box marginTop="16px">
                <Button type="submit" variant="contained" color="success">
                  Enviar recurso
                </Button>
              </Box>
            </Box>
          </div>
        </form>
      </Container>
    </Box>
  );
}
