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
import { NumerosVotacao } from "@/utils/types/numerosVotacao.type";
import { resultadoFinal } from "@/utils/processarVotos";
import VotacaoFinal from "@/components/apuracao/VotacaoFinal";
import PollIcon from "@mui/icons-material/Poll";
import { ResultadoFinalEleicao } from "@/utils/types/resultadoFinal.types";
import { useUserContext } from "@/userContext";
import Unauthorized from "@/components/unauthorized";

export default function Apuracao({ params }: { params: { id: string } }) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [tipoResultado, setTipoResultado] = useState("");
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const { id } = params;
  const [zona, setZona] = useState<Zona | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const [numerosVotacao, setNumerosVotacao] = useState<
    NumerosVotacao | undefined
  >(undefined);
  const [resultadoEleicao, setResultadoEleicao] =
    useState<ResultadoFinalEleicao>({
      percentualMaior: 0,
      confirmaQuorum: {
        quorumFunc: {
          percentual: 0,
          result: false,
        },
        quorumAlunos: {
          percentual: 0,
          result: false,
        },
        quorumPais: {
          percentual: 0,
          result: false,
        },
        quorunsNaoAtingidos: [""],
        resultGeral: false,
      },
      confirmaPercentual: [
        {
          qtdeVotosAlunos: {
            numero_votos: 0,
            nome_candidato: "",
          },
          qtdeVotosRespAlunosVotantes: {
            numero_votos: 0,
            nome_candidato: "",
          },
          qtdeVotosRespAlunosNaoVotantes: {
            numero_votos: 0,
            nome_candidato: "",
          },
          candidato: "candidato_um",
          somaPaisAlunos: 0,
          qtdeVotosFuncionarios: {
            numero_votos: 0,
            nome_candidato: "",
          },
          percentualTotal: 0,
        },
        {
          qtdeVotosAlunos: {
            numero_votos: 0,
            nome_candidato: "",
          },
          qtdeVotosRespAlunosVotantes: {
            numero_votos: 0,
            nome_candidato: "",
          },
          qtdeVotosRespAlunosNaoVotantes: {
            numero_votos: 0,
            nome_candidato: "",
          },
          candidato: "candidato_dois",
          somaPaisAlunos: 0,
          qtdeVotosFuncionarios: {
            numero_votos: 0,
            nome_candidato: "",
          },
          percentualTotal: 0,
        },
        {
          qtdeVotosAlunos: {
            numero_votos: 0,
            nome_candidato: "",
          },
          qtdeVotosRespAlunosVotantes: {
            numero_votos: 0,
            nome_candidato: "",
          },
          qtdeVotosRespAlunosNaoVotantes: {
            numero_votos: 0,
            nome_candidato: "",
          },
          candidato: "Branco",
          somaPaisAlunos: 0,
          qtdeVotosFuncionarios: {
            numero_votos: 0,
            nome_candidato: "Branco",
          },
          percentualTotal: 0,
        },
        {
          qtdeVotosAlunos: {
            numero_votos: 0,
            nome_candidato: "",
          },
          qtdeVotosRespAlunosVotantes: {
            numero_votos: 0,
            nome_candidato: "",
          },
          qtdeVotosRespAlunosNaoVotantes: {
            numero_votos: 0,
            nome_candidato: "",
          },
          candidato: "Nulo",
          somaPaisAlunos: 0,
          qtdeVotosFuncionarios: {
            numero_votos: 0,
            nome_candidato: "Nulo",
          },
          percentualTotal: 0,
        },
      ],
      candidatoApto: false,
      candidatoEleito: "",
      motivosIndeferimento: [
        {
          tipo: "",
          motivos: [""],
        },
        {
          tipo: "",
          motivos: [""],
        },
      ],
    });

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

    const getNumerosVotacao = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/votacao/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          alert("Erro ao obter os resultados dos votos, tente novamente");
          console.error("Erro ao obter resultados de votos");
          return;
        }

        const numerosVotacaoJson = await response.json();
        setNumerosVotacao(numerosVotacaoJson);
      } catch (error) {
        console.error("Erro na solicitação, tente novamente", error);
      }
    };

    getNumerosVotacao();
  }, [zona?._id]);

  useEffect(() => {
    if (numerosVotacao) {
      setResultadoEleicao(resultadoFinal(numerosVotacao));
    }
  }, [numerosVotacao]);

  if (user.role && user.role.includes("super-adm")) {
    return (
      <Box
        margin="0"
        padding="0"
        height={`calc(100vh - 66px)`}
        overflow="hidden"
      >
        <Typography
          variant={smDown ? "h6" : mdDown ? "h5" : "h5"}
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
            variant="h6"
            textAlign="center"
            marginTop={0.2}
            color=" #000"
          >
            Apuração da votação
          </Typography>
          <Box
            display="flex"
            width="100%"
            marginTop="5px"
            alignItems="center"
            justifyContent="center"
            gap={2.5}
          >
            <Box>
              {numerosVotacao?.quantidadeAlunosVotantes !== 0 && (
                <Button
                  variant="contained"
                  startIcon={<Face6Icon style={{ fontSize: 24 }} />}
                  onClick={() => handleTipo("Alunos")}
                  style={{ backgroundColor: "#0F4C81", color: "#ffffff" }}
                >
                  Alunos
                </Button>
              )}
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
            <Box>
              <Button
                variant="contained"
                startIcon={<PollIcon style={{ fontSize: 24 }} />}
                onClick={() => handleTipo("Resultado Final")}
                style={{ backgroundColor: "#0F4C81", color: "#ffffff" }}
              >
                Resultado Final
              </Button>
            </Box>
          </Box>
          {tipoResultado === "Alunos" && (
            <>
              <Typography
                variant="h5"
                textAlign="center"
                marginTop={0.8}
                marginBottom={0.8}
                color="#000"
              >
                Alunos
              </Typography>
              {numerosVotacao ? (
                <VotacaoAlunos
                  candidatos={candidatos}
                  numerosVotacao={numerosVotacao}
                  resultadoEleicao={resultadoEleicao}
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
                marginTop={0.8}
                marginBottom={0.8}
                color="#000"
              >
                Responsáveis
              </Typography>
              {numerosVotacao ? (
                <VotacaoResp
                  candidatos={candidatos}
                  numerosVotacao={numerosVotacao}
                  resultadoEleicao={resultadoEleicao}
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
                marginTop={0.8}
                marginBottom={0.8}
                color="#000"
              >
                Funcionários
              </Typography>
              {numerosVotacao ? (
                <VotacaoFuncionarios
                  candidatos={candidatos}
                  numerosVotacao={numerosVotacao}
                  resultadoEleicao={resultadoEleicao}
                />
              ) : (
                <p>Carregando...</p>
              )}
            </>
          )}
          {tipoResultado === "Resultado Final" && (
            <>
              <Typography
                variant="h5"
                textAlign="center"
                marginTop={0.8}
                marginBottom={0.8}
                color="#000"
              >
                Resultado Final
              </Typography>
              {numerosVotacao ? (
                <VotacaoFinal
                  candidatos={candidatos}
                  numerosVotacao={numerosVotacao}
                  resultadoEleicao={resultadoEleicao}
                />
              ) : (
                <p>Carregando...</p>
              )}
            </>
          )}
        </Box>
      </Box>
    );
  } else {
    return <Unauthorized />;
  }
}
