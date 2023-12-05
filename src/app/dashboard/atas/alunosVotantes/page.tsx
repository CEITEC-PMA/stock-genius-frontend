"use client";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import { Aluno } from "@/utils/types/aluno.types";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import html2pdf from "html2pdf.js";

const GetContainer = ({ aluno }: { aluno: Aluno }) => {
  return (
    <Grid container mb={1} padding={2} sx={{ border: "1px solid black" }}>
      <Grid item align="center" xs={12} mb={1}>
        <Typography>
          <b>
            {aluno?.nome.substring(0, 30)} - {aluno.serie}
          </b>
        </Typography>
      </Grid>
      <Grid item container>
        <Grid item align="center" xs={4} mb={1}>
          <Typography>{aluno?.responsavel1?.substring(0, 30)}</Typography>
          <Typography>Responsável 1</Typography>
        </Grid>
        <Grid item align="center" xs={4}>
          <Typography>
            {aluno.responsavel2 ? aluno?.responsavel2?.substring(0, 30) : "-"}
          </Typography>
          <Typography>Responsável 2</Typography>
        </Grid>
        <Grid item align="center" xs={4}>
          <Typography>
            {aluno.responsavel3 ? aluno?.responsavel3?.substring(0, 30) : "-"}
          </Typography>
          <Typography>Responsável 3</Typography>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item align="center" xs={6} my={2}>
          <Typography>______________________________________</Typography>
          <Typography>Assinatura Responsável</Typography>
        </Grid>
        <Grid item align="center" xs={6} my={2}>
          <Typography>______________________________________</Typography>
          <Typography>Assinatura Aluno</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default function AtaAlunosNaoVotantes() {
  const { user } = useUserContext();
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  const alunosVotantes = alunos.filter((aluno) => aluno.votante);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user._id && token) {
      const getDadosAlunos = async () => {
        try {
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
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      getDadosAlunos();
    }
  }, [user._id]);

  const generatePDF = () => {
    const element = document.getElementById("print");
    if (element) {
      html2pdf(element);
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Lista de Funcionários
          </Typography>
          <Button onClick={generatePDF}>
            <PictureAsPdfIcon
              sx={{ color: "#b30b00", marginRight: "20px", fontSize: 48 }}
            />
          </Button>
        </Grid>
      </Grid>
      <Container id={"print"}>
        <Box sx={{ pageBreakAfter: "always" }}>
          <Container sx={{ textAlign: "center", marginBottom: 5 }}>
            <Image
              src="https://cdn.anapolis.go.gov.br/img/logos/sem_fundo/azuis/educacao.png"
              alt="logo"
              height={50}
              width={250}
            />
          </Container>
          <Typography align="center" variant="h5">
            {user.nome}
          </Typography>
          <Typography align="center" variant="h5">
            Lista de Funcionários - Eleição Diretores 2021
          </Typography>
          {alunosVotantes.map((aluno, i) => (
            <GetContainer aluno={aluno} key={`tableAluno-${i}`} />
          ))}
        </Box>
      </Container>
    </div>
  );
}
