"use client";
import { Box, Button, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AtaFuncionarios from "./funcionarios/page";
import AtaAlunosNaoVotantes from "./alunosNaoVotantes/page";
import AtaAlunosVotantes from "./alunosVotantes/page";
import { apiUrl } from "@/utils/api";
import { useUserContext } from "@/userContext";
import { Aluno } from "@/utils/types/aluno.types";

export default function Atas() {
  const { user } = useUserContext();

  const [alunos, setAlunos] = useState([] as Aluno[]);
  const [alunosVotantes, setAlunosVotantes] = useState([] as Aluno[]);
  const [alunosNaoVotantes, setalunosNaoVotantes] = useState([] as Aluno[]);

  const processarPaginas = (array: any[]) => {
    const alunosVotantesProcessar = [...array];

    const quantPaginas = Math.ceil(alunosVotantesProcessar.length / 12);
    const arrayAlunosVotantes = [];

    for (let i = 0; i < quantPaginas; i++) {
      const arrayNovo = alunosVotantesProcessar.slice(0, 12);
      arrayAlunosVotantes.push(arrayNovo);
      alunosVotantesProcessar.splice(0, 12);
    }

    const arrayPaginas = [];
    const arrayProcessar = [...arrayAlunosVotantes];
    const quant = Math.ceil(arrayProcessar.length / 20);
    for (let i = 0; i < quant; i++) {
      const arrayNovo = arrayProcessar.slice(0, 20);
      arrayPaginas.push({
        numeroPagina: i,
        paginas: arrayNovo,
      });
      arrayProcessar.splice(0, 20);
    }
    return arrayPaginas;
  };

  const alunosVotantesPaginas = processarPaginas(alunosVotantes);
  const alunosNaoVotantesPaginas = processarPaginas(alunosNaoVotantes);

  console.log(alunosVotantesPaginas);

  useEffect(() => {
    const votantes = alunos.filter((alunos) => alunos.votante);
    const naoVotantes = alunos.filter((alunos) => !alunos.votante);
    setAlunosVotantes(votantes);
    setalunosNaoVotantes(naoVotantes);
  }, [alunos]);

  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
    if (user._id) {
      const getDadosAlunos = async () => {
        const response = await fetch(`${apiUrl}/api/v1/aluno/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseJson = await response.json();

        setAlunos(responseJson.alunos);
        return response;
      };
      getDadosAlunos();
    }
  }, [user._id]);
  return (
    <Box>
      <Box>
        <Box textAlign="center" my={8} mb={12}>
          <Typography variant="h3">LISTAS DE ASSINATURA</Typography>
        </Box>
        <Box
          display="flex"
          gap={2}
          mx={2}
          alignContent="center"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          justifyItems="center"
        >
          <Box display="flex" flexDirection="row" gap={2} mx={2}>
            <AtaFuncionarios />
          </Box>
          <Box display="flex" flexDirection="row" gap={2} mx={2}>
            {alunosVotantesPaginas.map((votantes, i) => {
              return (
                <AtaAlunosVotantes
                  key={`ata-votante-${i}`}
                  pagina={votantes.numeroPagina}
                  arrayAlunos={votantes.paginas}
                />
              );
            })}
          </Box>
          <Box display="flex" flexDirection="row" gap={2} mx={2}>
            {alunosNaoVotantesPaginas.map((votantes, i) => {
              return (
                <AtaAlunosNaoVotantes
                  key={`ata-votante-${i}`}
                  pagina={votantes.numeroPagina}
                  arrayAlunos={votantes.paginas}
                />
              );
            })}
          </Box>
          {/* {alunosVotantes.length ? <AtaAlunosVotantes /> : null} */}
          {/* {alunosNaoVotantes.length ? <AtaAlunosNaoVotantes /> : null} */}
        </Box>
      </Box>
      <Box
        alignContent="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        justifyItems="center"
      >
        <Box textAlign="center" my={8} mb={12}>
          <Typography variant="h3">ATAS DE RESULTADO</Typography>
        </Box>
        <Box
          display="flex"
          gap={2}
          mx={2}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          justifyItems="center"
        >
          <Link href={"/dashboard/atas/psa"}>
            <Button
              size="large"
              variant="contained"
              startIcon={<DescriptionIcon style={{ fontSize: 48 }} />}
            >
              ATA MESA COLETORA PROFESSORES E SERVIDORES ADMINSTRATIVOS
            </Button>
          </Link>
          <Link href={"/dashboard/atas/pa"}>
            <Button
              size="large"
              variant="contained"
              startIcon={<ArticleIcon style={{ fontSize: 48 }} />}
            // onClick={handleAluno}
            >
              Ata Mesa Coletora Responsáveis e Alunos
            </Button>
          </Link>
          <Link href={"/dashboard/atas/quorum"}>
            <Button
              size="large"
              variant="contained"
              startIcon={<DocumentScannerIcon style={{ fontSize: 48 }} />}
            // onClick={handleAluno}
            >
              Quórum Comparecimento de Eleitores
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
