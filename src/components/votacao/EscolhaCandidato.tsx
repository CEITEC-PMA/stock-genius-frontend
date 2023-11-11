import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import CandidatoCardEscolha from "../candidatoCard/candidatoCardEscolha";
import { useUserContext } from "@/userContext";
import { Candidato } from "@/utils/types/candidato.types";
import { apiUrl } from "@/utils/api";

export default function EscolhaCandidato({
  avancarEtapa,
  setCandidatoEscolhido,
}: {
  avancarEtapa: () => void;
  voltarEtapa: () => void;
  setCandidatoEscolhido: (candidato: Candidato) => void;
}) {
  const { user } = useUserContext();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [digitou, setDigitou] = useState(false);

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

    const teclaPressionada = (numero: number) => {
      digitou.play();
      setDigitou(true);

      if (candidatos[numero - 1]) {
        setCandidatoEscolhido(candidatos[numero - 1]);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (candidatos.length === 3) {
        switch (event.key) {
          case "1":
            teclaPressionada(1);
            break;
          case "3":
            teclaPressionada(3);
            break;
          case "4":
            teclaPressionada(4);
            break;
          case "Enter":
            digitou.play();
            setTimeout(() => {
              avancarEtapa();
            }, 500);
            break;
          default:
            break;
        }
      } else {
        switch (event.key) {
          case "1":
            teclaPressionada(1);
            break;
          case "2":
            teclaPressionada(2);
            break;
          case "3":
            teclaPressionada(3);
            break;
          case "4":
            teclaPressionada(4);
            break;
          case "Enter":
            digitou.play();
            setTimeout(() => {
              avancarEtapa();
            }, 500);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [avancarEtapa, candidatos]);

  return (
    <Box margin="0" padding="0" height={`calc(100vh - 66px)`} overflow="hidden">
      <Typography
        variant={smDown ? "h6" : mdDown ? "h5" : "h4"}
        textAlign="center"
        marginTop={2}
        color=" #0f4c81"
      >
        ELEIÇÕES MUNICIPAIS DE DIRETORES BIÊNIO 2024/25 - {user.nome}
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        alignItems="center"
        justifyContent="flex-start"
        height="100%"
      >
        <Typography
          variant="h4"
          textAlign="center"
          marginTop={1.2}
          color=" #000"
        >
          Digite o número correspondente:
        </Typography>
        <Box>
          <Grid container spacing={2} justifyContent="center">
            {candidatos.map((candidato, i) => {
              let cpfSemTraco = candidato?.cpf;
              if (cpfSemTraco) {
                cpfSemTraco = cpfSemTraco.replace(".", "");
                cpfSemTraco = cpfSemTraco.replace(".", "");
                cpfSemTraco = cpfSemTraco.replace("-", "");
              }

              const nomes = candidato?.nome?.toUpperCase()?.trim()?.split(" ");
              const nomeCortado = nomes.slice(0, 2).join(" ");
              const numeroCandidato = candidato.numero;

              return (
                <Grid item xs={2.5} md={2.5} lg={2.5} key={i}>
                  <CandidatoCardEscolha
                    image={`https://api.anapolis.go.gov.br/apieleicao/fotosCandidato/${cpfSemTraco}/${candidato.foto}`}
                    numero={
                      numeroCandidato === undefined ? "S/ nº" : numeroCandidato
                    }
                    nome={nomeCortado}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
        {digitou && (
          <Box
            sx={{
              backgroundColor: "#2e7d32",
              padding: 2,
              borderRadius: 4,
              marginTop: 1.2,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" color="white">
              Tecle ENTER para prosseguir
            </Typography>
          </Box>
        )}
        {/* <Box>
          EscolhaCandidato
          <Button
            style={{ whiteSpace: "nowrap" }}
            size="large"
            onClick={voltarEtapa}
          >
            Voltar
          </Button>
          <Button
            style={{ whiteSpace: "nowrap" }}
            size="large"
            onClick={avancarEtapa}
          >
            Avançar
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
}
