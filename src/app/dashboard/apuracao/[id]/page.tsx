"use client";
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
import { ResultadoVoto } from "@/utils/types/resultado.types";

export default function Apuracao({ params }: { params: { id: string } }) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [tipoResultado, setTipoResultado] = useState("");
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const { id } = params;
  const [zona, setZona] = useState<Zona | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultadoVoto, setResultadoVoto] = useState<ResultadoVoto | null>(
    null
  );

  interface Zona {
    inep: string;
    nome: string;
    _id: string;
  }

  const handleTipo = (tipo: string) => {
    setTipoResultado(tipo);
  };

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const getDadosZona = async () => {
      const response = await fetch(`${apiUrl}/api/v1/zona/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseJson = await response.json();
      setZona(responseJson.zona);
      setIsLoading(false);
    };
    getDadosZona();
  }, [id]);

  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");

    const getDadosCandidatos = async () => {
      const response = await fetch(
        `${apiUrl}/api/v1/candidato/candidatoZona/${id}`,
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
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getResultadoVoto = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/votacao`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          alert("Erro ao obter os resultados dos votos, tente novamente");
          console.error("Erro ao obter resultados de votos");
          return;
        }

        const resultadoVotoJson = await response.json();
        setResultadoVoto(resultadoVotoJson);
      } catch (error) {
        console.error("Erro na solicitação, tente novamente", error);
      }
    };

    getResultadoVoto();
  }, [zona?._id]);
  console.log(resultadoVoto);

  return (
    <Box margin="0" padding="0" height={`calc(100vh - 66px)`} overflow="hidden">
      <Typography
        variant={smDown ? "h6" : mdDown ? "h5" : "h4"}
        textAlign="center"
        marginTop={2}
        color=" #0f4c81"
      >
        ELEIÇÕES MUNICIPAIS DE DIRETORES BIÊNIO 2024/25 -{" "}
        {isLoading ? "Carregando..." : zona?.nome}
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
            {resultadoVoto ? (
              <VotacaoAlunos
                candidatos={candidatos}
                resultadoVoto={resultadoVoto}
              />
            ) : (
              <p>Carregando resultados...</p>
            )}
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
            {resultadoVoto ? (
              <VotacaoResp
                candidatos={candidatos}
                resultadoVoto={resultadoVoto}
              />
            ) : (
              <p>Carregando...</p>
            )}
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
            {resultadoVoto ? (
              <VotacaoFuncionarios
                candidatos={candidatos}
                resultadoVoto={resultadoVoto}
              />
            ) : (
              <p>Carregando...</p>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
