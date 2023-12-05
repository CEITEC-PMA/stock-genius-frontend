"use client";
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import { Funcionario } from "@/utils/types/funcionario.types";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";

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

const options: Options = {
  // default is `save`
  method: "save",
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.HIGH,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.MEDIUM,
    // default is 'A4'
    format: "A4",
    // default is 'portrait'
    orientation: "portrait",
  },

  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: true,
    },
    // see https://html2canvas.hertzen.com/configuration for more options
    // canvas: {
    //     useCORS: true
    // }
  },
};

export default function AtaFuncionarios() {
  const { user } = useUserContext();
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
    if (user._id) {
      const getDadosFuncionarios = async () => {
        const response = await fetch(`${apiUrl}/api/v1/funcionario/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseJson = await response.json();
        console.log(responseJson.funcionarios);

        setFuncionarios(responseJson.funcionarios);
        return response;
      };
      getDadosFuncionarios();
    }
  }, [user._id]);

  const getTargetElement = () => document.getElementById("print");

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Lista de Funcionários
          </Typography>
          <Button onClick={() => generatePDF(getTargetElement, options)}>
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
          {funcionarios.map((funcionario, i) => {
            return (
              <GetContainer funcionario={funcionario} key={`tableFunc-${i}`} />
            );
          })}
        </Box>
      </Container>
    </div>
  );
}
