import CandidatoCardConfirma from "@/components/candidatoCard/candidatoCardConfirma";
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
  handleSubmit,
  candidatoEscolhido,
  alturaTela,
}: {
  avancarEtapa: () => void;
  voltarEtapa: () => void;
  handleSubmit: () => void;
  candidatoEscolhido: Candidato | null;
  alturaTela: number;
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

  useEffect(() => {
    const digitou = new Audio(
      "https://api.anapolis.go.gov.br/apiupload/sed/digito.mp3"
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
          digitou.play();
          setTimeout(() => {
            handleSubmit();
          }, 800);
          break;
        case "0":
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

  let cpfSemTraco = candidatoEscolhido?.cpf;
  if (cpfSemTraco) {
    cpfSemTraco = cpfSemTraco.replace(".", "");
    cpfSemTraco = cpfSemTraco.replace(".", "");
    cpfSemTraco = cpfSemTraco.replace("-", "");
  }

  const textStyle = {
    fontWeight: "bold",
    fontSize: "25.9px",
  };

  const obterCaminhoFoto = (candidato: Candidato) => {
    const nomeCandidato = candidato?.nome?.toUpperCase()?.trim();

    if (nomeCandidato === "BRANCO") {
      return "https://api.anapolis.go.gov.br/apiupload/sed/branco.jpg";
    } else if (nomeCandidato === "NULO") {
      return "https://api.anapolis.go.gov.br/apiupload/sed/nulo.jpg";
    } else {
      return `${apiUrl}/fotosCandidato/${cpfSemTraco}/${candidato.foto}`;
    }
  };

  return (
    <Box
      margin="0"
      padding="0"
      height={`calc(100vh - 66px)`}
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Typography
        variant={mdDown ? "h6" : "h5"}
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
          <Grid item xs={12} sm={6} md={6} lg={5}>
            {candidatoEscolhido && (
              <CandidatoCardConfirma
                image={obterCaminhoFoto(candidatoEscolhido)}
                nome={candidatoEscolhido?.nome.toUpperCase()}
                numero={""}
                alturaTela={alturaTela}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        gap={2}
        justifyItems="center"
        justifyContent="center"
        marginBottom={7}
      >
        <Grid item xs={3} marginBottom={7}>
          <Button
            style={textStyle}
            variant="contained"
            color="success"
            fullWidth={!smDown}
            onClick={avancarEtapa}
            sx={{ paddingX: 12, paddingY: 3.5 }}
          >
            Confirma (ENTER)
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            style={textStyle}
            variant="contained"
            color="error"
            fullWidth={!smDown}
            onClick={voltarEtapa}
            sx={{ paddingX: 12, paddingY: 3.5 }}
          >
            Corrige (0)
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
