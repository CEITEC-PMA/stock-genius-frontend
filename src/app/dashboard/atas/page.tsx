import { Box, Button, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import React from "react";
import Link from "next/link";

export default function Atas() {
  return (
    <Box>
      <Box>
        <Box textAlign="center" my={8} mb={12}>
          <Typography variant="h3">ATAS DE ASSINATURA</Typography>
        </Box>
        <Box display="flex" gap={2} mx={2}>
          <Link href={"/dashboard/atas/funcionarios"}>
            <Button
              size="large"
              variant="contained"
              startIcon={<DescriptionIcon style={{ fontSize: 48 }} />}
            >
              ATA DE FUNCIONÁRIOS
            </Button>
          </Link>
          <Link href={"/dashboard/atas/pa"}>
            <Button
              size="large"
              variant="contained"
              startIcon={<ArticleIcon style={{ fontSize: 48 }} />}
              // onClick={handleAluno}
            >
              ATA DE ALUNOS E RESPONSÁVEIS
            </Button>
          </Link>
        </Box>
      </Box>
      <Box>
        <Box textAlign="center" my={8} mb={12}>
          <Typography variant="h3">ATAS DE RESULTADO</Typography>
        </Box>
        <Box display="flex" gap={2} mx={2}>
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
