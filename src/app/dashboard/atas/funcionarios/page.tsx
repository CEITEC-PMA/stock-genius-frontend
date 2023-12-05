"use client";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import { Funcionario } from "@/utils/types/funcionario.types";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import html2pdf from "html2pdf.js";

const GetContainer = ({ funcionario }: { funcionario: Funcionario }) => {
  return (
    <Grid my={5} padding={2} container sx={{ border: "1px solid black" }}>
      <Grid item xs={12}>
        <Typography textAlign="center">
          {funcionario?.nome} - {funcionario.cargo}
        </Typography>
      </Grid>
      <Grid item container my={1}>
        <Grid item xs={12}>
          <Typography textAlign="center">
            ______________________________________
          </Typography>
          <Typography textAlign="center">Assinatura Servidor</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default function AtaFuncionarios() {
  const { user } = useUserContext();
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user._id && token) {
      const getDadosFuncionarios = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/v1/funcionario/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const responseJson = await response.json();
          setFuncionarios(responseJson.funcionarios);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      getDadosFuncionarios();
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
          {funcionarios.map((funcionario, i) => (
            <GetContainer funcionario={funcionario} key={`tableFunc-${i}`} />
          ))}
        </Box>
      </Container>
    </div>
  );
}
