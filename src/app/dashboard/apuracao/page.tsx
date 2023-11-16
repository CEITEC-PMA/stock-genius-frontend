"use client";
import { useUserContext } from "@/userContext";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import VotacaoFuncionarios from "@/components/apuracao/VotacaoFuncionarios";
import { apiUrl } from "@/utils/api";
import { Candidato } from "@/utils/types/candidato.types";
import VotacaoAlunos from "@/components/apuracao/VotacaoAlunos";
import Face6Icon from "@mui/icons-material/Face6";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import VotacaoResp from "@/components/apuracao/VotacaoResp";

export default function Apuracao() {
  const { user } = useUserContext();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [tipoResultado, setTipoResultado] = useState("");
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);

  const handleTipo = (tipo: string) => {
    setTipoResultado(tipo);
  };

  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
    if (user._id) {
      const getDadosCandidatos = async () => {
        const response = await fetch(
          `${apiUrl}/api/v1/candidato/candidatoZona/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseJson = await response.json();

        const candidatosAprovados: Candidato[] = responseJson.candidatos.filter(
          (candidato: Candidato) =>
            candidato.aprovado === "Deferida" ||
            candidato.nome === "Branco" ||
            candidato.nome === "Nulo"
        );

        const candidatosOrdenados: Candidato[] = candidatosAprovados.sort(
          (a: Candidato, b: Candidato) =>
            parseInt(a.numero_candidato) - parseInt(b.numero_candidato)
        );

        setCandidatos(candidatosOrdenados);
      };
      getDadosCandidatos();
    }
  }, [user._id]);

  return (
    <Box margin="0" padding="0" height={`calc(100vh - 66px)`} overflow="hidden">
      <Typography
        variant={smDown ? "h6" : mdDown ? "h5" : "h4"}
        textAlign="center"
        marginTop={2}
        color=" #0f4c81"
      >
        ELEIÇÕES MUNICIPAIS DE DIRETORES BIÊNIO 2024/25 - {user.nome}
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        height="100%"
      >
        <Typography
          variant="h4"
          textAlign="center"
          marginTop={1.2}
          color=" #000"
        >
          Apuração da votação
        </Typography>
        <Box
          display="flex"
          width="100%"
          marginTop="20px"
          alignItems="center"
          justifyContent="center"
          gap={4}
        >
          <Box>
            <Button
              variant="contained"
              startIcon={<Face6Icon style={{ fontSize: 24 }} />}
              onClick={() => handleTipo("Alunos")}
              style={{ backgroundColor: "#0F4C81", color: "#ffffff" }}
            >
              Alunos
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              startIcon={<EscalatorWarningIcon style={{ fontSize: 24 }} />}
              onClick={() => handleTipo("Responsáveis")}
              style={{ backgroundColor: "#0F4C81", color: "#ffffff" }}
            >
              Responsáveis
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              startIcon={<BadgeIcon style={{ fontSize: 24 }} />}
              onClick={() => handleTipo("Funcionários")}
              style={{ backgroundColor: "#0F4C81", color: "#ffffff" }}
            >
              Funcionários
            </Button>
          </Box>
        </Box>
        {tipoResultado === "Alunos" && (
          <>
            <Typography
              variant="h5"
              textAlign="center"
              marginTop={2}
              marginBottom={2}
              color="#000"
            >
              Alunos
            </Typography>
            <VotacaoAlunos candidatos={candidatos} />
          </>
        )}
        {tipoResultado === "Responsáveis" && (
          <>
            <Typography
              variant="h5"
              textAlign="center"
              marginTop={2}
              marginBottom={2}
              color="#000"
            >
              Responsáveis
            </Typography>
            <VotacaoResp candidatos={candidatos} />
          </>
        )}
        {tipoResultado === "Funcionários" && (
          <>
            <Typography
              variant="h5"
              textAlign="center"
              marginTop={2}
              marginBottom={2}
              color="#000"
            >
              Funcionários
            </Typography>
            <VotacaoFuncionarios candidatos={candidatos} />
          </>
        )}
      </Box>
    </Box>
  );
}
