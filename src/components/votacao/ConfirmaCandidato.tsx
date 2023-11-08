import CandidatoCard from "@/components/candidatoCard";
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import { Candidato } from "@/utils/types/candidato.types";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ConfirmaCandidato({
  avancarEtapa,
  voltarEtapa,
}: {
  avancarEtapa: () => void;
  voltarEtapa: () => void;
}) {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const { user } = useUserContext();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
    if (user._id) {
      const getDadosCandidatos = async () => {
        const response = await fetch(
          `${apiUrl}/api/v1/candidato/candidatoZona/${user._id}`,
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

  console.log(candidatos);

  useEffect(() => {
    const digitou = new Audio(
      "https://api.anapolis.go.gov.br/apiupload/sed/digito.mp3"
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "1":
          digitou.play();
          setTimeout(() => {
            avancarEtapa();
          }, 800);
          break;
        case "2":
          digitou.play();
          setTimeout(() => {
            voltarEtapa();
          }, 500);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [avancarEtapa, voltarEtapa]);

  return (
    <Box
      margin="0"
      padding="0"
      height="calc(100vh - <AppBar_Height>px)"
      overflow="hidden"
    >
      <Typography
        variant={smDown ? "h6" : mdDown ? "h5" : "h4"}
        textAlign="center"
        marginTop={2}
        color=" #0f4c81"
      >
        ELEIÇÕES MUNICIPAIS DE DIRETORES BIÊNIO 2024/25 - {user.nome}
      </Typography>
      <Grid container spacing={1} style={{ padding: 16 }}>
        <Grid
          item
          container
          display="flex"
          justifyItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CandidatoCard
              image={
                "https://api.anapolis.go.gov.br/apieleicao/fotosCandidato/35341089065/file-1697650092544.webp"
              }
              nome={"Nome do Candidato teste"}
              numero={"numero aqui"}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          spacing={2}
          gap={2}
          justifyItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="success"
              fullWidth={!smDown}
              onClick={avancarEtapa}
              sx={{ padding: 2.5 }}
            >
              Confirma (1)
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="error"
              fullWidth={!smDown}
              onClick={voltarEtapa}
              sx={{ padding: 2.5 }}
            >
              Corrige (2)
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
