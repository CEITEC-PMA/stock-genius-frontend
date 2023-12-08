"use client";
import { Box, Button, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { apiUrl } from "@/utils/api";
import { useUserContext } from "@/userContext";
import { Aluno } from "@/utils/types/aluno.types";

export default function AtasResultadoAdmin({
  params,
}: {
  params: { id: string };
}) {
  const { user } = useUserContext();

  const [alunos, setAlunos] = useState([] as Aluno[]);
  const [alunosVotantes, setAlunosVotantes] = useState([] as Aluno[]);
  const [alunosNaoVotantes, setalunosNaoVotantes] = useState([] as Aluno[]);
  const { id } = params;

  // useEffect(() => {
  //   //fetch
  //   const token = localStorage.getItem("token");
  //   if (user._id) {
  //     const getDadosAlunos = async () => {
  //       const response = await fetch(`${apiUrl}/api/v1/aluno/`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }

  //       const responseJson = await response.json();

  //       setAlunos(responseJson.alunos);
  //       return response;
  //     };
  //     getDadosAlunos();
  //   }
  // }, [user._id]);

  return (
    <Box mb={8}>
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
          <Link href={`/dashboard/atas/atasResultado/psa/${id}`}>
            <Button
              size="large"
              variant="contained"
              startIcon={<DescriptionIcon style={{ fontSize: 48 }} />}
            >
              ATA MESA COLETORA PROFESSORES E SERVIDORES ADMINSTRATIVOS
            </Button>
          </Link>
          <Link href={`/dashboard/atas/atasResultado/pa/${id}`}>
            <Button
              size="large"
              variant="contained"
              startIcon={<ArticleIcon style={{ fontSize: 48 }} />}
              // onClick={handleAluno}
            >
              Ata Mesa Coletora Responsáveis e Alunos
            </Button>
          </Link>
          <Link href={`/dashboard/atas/atasResultado/quorum/${id}`}>
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
