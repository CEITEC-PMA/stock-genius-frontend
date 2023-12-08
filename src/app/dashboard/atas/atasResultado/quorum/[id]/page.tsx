"use client";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import { resultadoVotosEleicaoTypes } from "@/utils/types/resultadoVotosEleicaoTypes";
import { useRef } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReplyIcon from "@mui/icons-material/Reply";

import Paper from "@mui/material/Paper";

import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";
import { Box, Button, Container, Table, Typography } from "@mui/material";
import { resultadoVoto } from "@/utils/resultado.eleicao.mock";
import Link from "next/link";
import { Candidato, Zona } from "@/utils/types/candidato.types";
import TabelaQuorumComparecimento from "@/components/tabelas/tabelaQuorumComparecimento";
//import { passouQuorum, percentualVotos, resultadoFinal } from '@/utils/processarVotos';
import TabelaQuorumVotosPaisRespAlunos from "@/components/tabelas/tabelaQuorumVotosPaisRespAlunos";
import TabelaQuorumVotosPaisRespAlunosCopy from "@/components/tabelas/tabelaQuorumVotosPaisRespAlunoscopy";
import TabelaQuorumServidores from "@/components/tabelas/tabelaQuorumVotosServidores";
import TabelaResultadoFinal from "@/components/tabelas/taelaResultadoFinal";
import TabelaQuorumServidoresCopy from "@/components/tabelas/tabelaQuorumVotosServidoresCopy";
import TabelaResultadoFinalCopy from "@/components/tabelas/taelaResultadoFinalCopy";
import { DadosQuorum } from "@/utils/types/dadosQuorum.types";

export default function Quorum({ params }: { params: { id: string } }) {
  const [resultadoVoto, setResultadoVoto] =
    useState<resultadoVotosEleicaoTypes>({
      alunosVotaram: 0,
      funcionariosVotaram: 0,
      quantidadeAlunosNaoVotantes: 0,
      quantidadeAlunosVotantes: 0,
      quantidadeFuncionarios: 0,
      respAlunosNaoVotantesVotaram: 0,
      respAlunosVotantesVotaram: 0,
      votos: {
        votosAlunos: {
          branco: 0,
          candidato_dois: 0,
          candidato_um: 0,
          nulo: 0,
        },
        votosFuncionarios: {
          branco: 0,
          candidato_dois: 0,
          candidato_um: 0,
          nulo: 0,
        },
        votosRespAlunosNaoVotantes: {
          branco: 0,
          candidato_dois: 0,
          candidato_um: 0,
          nulo: 0,
        },
        votosRespAlunosVotantes: {
          branco: 0,
          candidato_dois: 0,
          candidato_um: 0,
          nulo: 0,
        },
      },
    } as resultadoVotosEleicaoTypes);

  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [dadosQuorum, setDadosQuorum] = useState<DadosQuorum[]>([]);
  const [zona, setZona] = useState<Zona | null>(null);
  const { user } = useUserContext();
  const { id } = params;

  const options: Options = {
    // default is `save`
    method: "save",

    resolution: Resolution.HIGH,
    page: {
      margin: Margin.MEDIUM,

      format: "A4",

      orientation: "portrait",
    },

    overrides: {
      pdf: {
        compress: true,
      },
    },
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getDadosZona = async () => {
      const response = await fetch(`${apiUrl}/api/v1/zona/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseJson = await response.json();
      setZona(responseJson.zona);
    };
    getDadosZona();
  }, [id]);

  // Fetch Alunos, Responsaveis, Funcionários
  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
    if (user._id) {
      setIsloading(true);
      const getDadosVotos = async () => {
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

          const responseJson = await response.json();
          //console.log(responseJson)
          setResultadoVoto(responseJson);
        } catch (error) {
          console.log("Erro na solicitação", error);
        }
      };
      setIsloading(false);
      getDadosVotos();
    }
  }, [user._id]);

  // Fetch Candidatos
  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
    if (user._id) {
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
        setCandidatos(responseJson.candidatos);
      };
      getDadosCandidatos();
    }
  }, [user._id]);

  // fetch quorum
  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
    if (user._id) {
      const getDadosQuorum = async () => {
        const response = await fetch(
          `${apiUrl}/api/v1/voto/dadosQuorum/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseJson = await response.json();
        setDadosQuorum(responseJson.resposta);
      };
      getDadosQuorum();
    }
  }, [user._id]);

  const diretores = candidatos.map((diretor) => {
    return diretor.nome;
  });
  //console.log(diretores)

  let imagemDiretor = candidatos.map((diretor) => {
    return diretor.foto;
  });

  // Alunos Votantes
  const qtdAlunosConstantes = resultadoVoto.quantidadeAlunosVotantes;
  const qtdAlunosCompareceram = resultadoVoto.alunosVotaram;
  const qtdAlunosNaoCompareceram = qtdAlunosConstantes - qtdAlunosCompareceram;

  // Responsáveis por Alunos Votantes
  const qtdRespAlunosVotantesConstantes =
    resultadoVoto.quantidadeAlunosVotantes;
  const qtdRespAlunosVotantesCompareceram =
    resultadoVoto.respAlunosVotantesVotaram;
  const qtdRespAlunosVotantesNaoCompareceram =
    qtdRespAlunosVotantesConstantes - qtdRespAlunosVotantesCompareceram;

  // Responsáveis por Alunos Não Votantes
  const qtdRespAlunosNaoVotantesConstantes =
    resultadoVoto.quantidadeAlunosNaoVotantes;
  const qtdRespAlunosNaoVotantesCompareceram =
    resultadoVoto.respAlunosNaoVotantesVotaram;
  const qtdRespAlunosNaoVotantesNaoCompareceram =
    qtdRespAlunosNaoVotantesConstantes - qtdRespAlunosNaoVotantesCompareceram;

  //Professores e Servidores Adminstrativos
  const qtdFuncionariosConstantes = resultadoVoto.quantidadeFuncionarios;
  const qtdFuncionarosCompareceram = resultadoVoto.funcionariosVotaram;
  const qtdFucionariosNaoCompareceram =
    qtdFuncionariosConstantes - qtdFuncionarosCompareceram;

  const getTargetElement = () => document.getElementById("content-id");

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "30px" }}>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Button onClick={() => generatePDF(getTargetElement, options)}>
            <PictureAsPdfIcon
              sx={{ color: "#b30b00", marginRight: "20px", fontSize: 48 }}
            />
          </Button>
          <Link href={"/dashboard/atas"}>
            <ReplyIcon sx={{ fontSize: 45, color: "blue" }} />
          </Link>
        </Box>

        <div id="content-id">
          <Box display="flex" flexDirection="column" component={Paper} mx={1}>
            <Box textAlign="center" mt={2}>
              <Image
                width={320}
                height={55}
                src="https://cdn.anapolis.go.gov.br/img/logos/sem_fundo/azuis/educacao.png"
                alt="Logo"
              />
            </Box>

            <Box textAlign="center" mt={2}>
              <Typography>Prefeitura Municipal de Anápolis</Typography>
              <Typography>Secretaria Municipal de Educação</Typography>
              <Typography>{zona ? zona?.nome : "Carregando"}</Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              marginTop={4}
              gap={2}
            >
              <Typography variant="h5">
                APURAÇÃO DOS VOTOS - ELEIÇÃO PARA DIRETOR
              </Typography>

              <Typography>
                <strong>Quórum - Comparecimento de Eleitores</strong>
              </Typography>
            </Box>

            <Box mt={1} component={Paper} textAlign="center" mx={1}>
              <TabelaQuorumComparecimento
                qtdAlunosConstantes={qtdAlunosConstantes}
                qtdAlunosCompareceram={qtdAlunosCompareceram}
                qtdRespAlunosNaoVotantesConstantes={
                  qtdRespAlunosNaoVotantesConstantes
                }
                qtdRespAlunosNaoVotantesCompareceram={
                  qtdRespAlunosNaoVotantesCompareceram
                }
                qtdRespAlunosVotantesConstantes={
                  qtdRespAlunosVotantesConstantes
                }
                qtdFuncionariosConstantes={qtdFuncionariosConstantes}
                qtdFuncionarosCompareceram={qtdFuncionarosCompareceram}
                qtdRespAlunosVotantesCompareceram={
                  qtdRespAlunosVotantesCompareceram
                }
                dadosQuorum={dadosQuorum}
              />

              {/* ________________________________________________________________________________ */}

              <Box my={2}>
                <Typography>
                  <strong>Votos de Pais / Responsáveis e alunos</strong>{" "}
                </Typography>
              </Box>
              <TabelaQuorumVotosPaisRespAlunosCopy dadosQuorum={dadosQuorum} />

              {/* _______________________________________________________________________________________     */}

              <Box my={2}>
                <Typography>
                  <strong>
                    Votos de Professores e Servidores Aministrativos
                  </strong>
                </Typography>
              </Box>

              <TabelaQuorumServidoresCopy dadosQuorum={dadosQuorum} />

              {/* _________________________________________________________________________________________ */}

              <Box my={2}>
                <Typography variant="h6">
                  {" "}
                  <strong> Resultado Final</strong>
                </Typography>
              </Box>

              <TabelaResultadoFinalCopy dadosQuorum={dadosQuorum} />
            </Box>
          </Box>
        </div>
      </Container>
    </>
  );
}
