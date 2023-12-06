"use client";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import { Funcionario } from "@/utils/types/funcionario.types";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import html2pdf from "html2pdf.js";
import DescriptionIcon from "@mui/icons-material/Description";

const GetContainer = ({ funcionario }: { funcionario: Funcionario }) => {
  return (
    <Grid my={0.1} padding={0.5} container sx={{ border: "1px solid black" }}>
      <Grid item xs={12}>
        <Typography textAlign="center" fontSize={"12px"}>
          {funcionario?.nome} - {funcionario.cargo}
        </Typography>
      </Grid>
      <Grid item container my={1}>
        <Grid item xs={12}>
          <Typography textAlign="center" fontSize={"12px"}>
            ______________________________________
          </Typography>
          <Typography textAlign="center" fontSize={"12px"}>
            Assinatura Servidor
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default function AtaFuncionarios() {
  const { user } = useUserContext();
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  const funcionariosProcessar = [...funcionarios];

  const quantPaginas = Math.ceil(funcionariosProcessar.length / 12);
  const arrayFuncionarios = [];

  for (let i = 0; i < quantPaginas; i++) {
    const arrayNovo = funcionariosProcessar.slice(0, 12);
    arrayFuncionarios.push(arrayNovo);
    funcionariosProcessar.splice(0, 12);
  }

  console.log(funcionarios);
  console.log(arrayFuncionarios);

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
    // Choose the element that our invoice is rendered in.
    const element = document.getElementById("print");

    // clone the element
    var clonedElement = element.cloneNode(true);

    // change display of cloned element
    clonedElement.style.display = "block";

    if (clonedElement) {
      // Choose the clonedElement and save the PDF for our user.
      html2pdf(clonedElement);

      // remove cloned element
      clonedElement.remove();
    }
  };

  return (
    <div>
      <Button
        size="large"
        onClick={generatePDF}
        variant="contained"
        startIcon={<DescriptionIcon style={{ fontSize: 48 }} />}
      >
        ATA DE FUNCIONÁRIOS
      </Button>
      <Container id={"print"} sx={{ display: "none" }}>
        {arrayFuncionarios.map((pagina, i) => {
          return (
            <Box
              key={`pagefuncionario-${i}`}
              sx={{ pageBreakAfter: "always", padding: 1 }}
            >
              <Container sx={{ textAlign: "center" }}>
                <Image
                  src="https://cdn.anapolis.go.gov.br/img/logos/sem_fundo/azuis/educacao.png"
                  alt="logo"
                  height={50}
                  width={250}
                />
              </Container>
              <Typography align="center" fontSize={"16px"}>
                {user.nome}
              </Typography>
              <Typography align="center" fontSize={"16px"}>
                Lista de Funcionários - Eleição Diretores Biênio 2024/25
              </Typography>
              {pagina.map((funcionario, i) => (
                <GetContainer
                  funcionario={funcionario}
                  key={`tableFunc-${i}`}
                />
              ))}
            </Box>
          );
        })}
      </Container>
    </div>
  );
}
