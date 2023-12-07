import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import CandidatoCardEscolha from "../candidatoCard/candidatoCardEscolha";
import { useUserContext } from "@/userContext";
import { Candidato } from "@/utils/types/candidato.types";
import { apiUrl } from "@/utils/api";

export default function EscolhaCandidato({
  avancarEtapa,
  setCandidatoEscolhido,
  alturaTela,
}: {
  avancarEtapa: () => void;
  voltarEtapa: () => void;
  setCandidatoEscolhido: (candidato: Candidato) => void;
  alturaTela: number;
}) {
  const { user } = useUserContext();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [digitou, setDigitou] = useState(false);
  const [opcaoInvalida, setOpcaoInvalida] = useState(false);
  const [enterPressionado, setEnterPressionado] = useState(false);
  const [candidatoValido, setCandidatoValido] = useState(false);

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

        const candidatosAprovados: Candidato[] = responseJson.candidatos.filter(
          (candidato: Candidato) =>
            candidato.aprovado === "Deferida" ||
            candidato.nome === "Branco" ||
            candidato.nome === "Nulo"
        );

        const candidatosOrdenados: Candidato[] = candidatosAprovados.sort(
          (a: Candidato, b: Candidato) =>
            parseInt(a.numero_candidato) - parseInt(b.numero_candidato)
        );

        setCandidatos(candidatosOrdenados);
      };
      getDadosCandidatos();
    }
  }, [user._id]);

  useEffect(() => {
    const digitou = new Audio(
      "https://api.anapolis.go.gov.br/apiupload/sed/digito.mp3"
    );

    const pressKey = (event: KeyboardEvent) => {
      const candidatoSelecionado = candidatos.find(
        (candidato) => candidato.numero_candidato == event.key
      );

      if (candidatoSelecionado) {
        digitou.play();
        setDigitou(true);
        setCandidatoValido(true);
        setOpcaoInvalida(false);
        setCandidatoEscolhido(candidatoSelecionado);
      } else if (event.key === "Enter" && candidatoValido) {
        if (!enterPressionado) {
          digitou.play();
          setDigitou(true);
          setOpcaoInvalida(false);
          setEnterPressionado(true);
          digitou.play();
          setTimeout(() => {
            avancarEtapa();
            setEnterPressionado(false);
          }, 500);
        }
      } else {
        digitou.play();
        setOpcaoInvalida(true);
        setDigitou(false);
      }
    };

    window.addEventListener("keyup", pressKey);

    return () => {
      window.removeEventListener("keyup", pressKey);
    };
  }, [avancarEtapa, candidatos, enterPressionado, setCandidatoEscolhido]);

  return (
    <Box margin="0" padding="0" height={`calc(100vh - 66px)`} overflow="hidden">
      <Typography
        variant={mdDown ? "h6" : "h5"}
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
          variant={mdDown ? "h6" : "h5"}
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
              const numeroCandidato = candidato.numero_candidato;

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
                <Grid item xs={2.5} md={2.5} lg={2.5} key={i}>
                  <CandidatoCardEscolha
                    image={obterCaminhoFoto(candidato)}
                    numero={
                      numeroCandidato === undefined ? "S/ nº" : numeroCandidato
                    }
                    nome={nomeCortado}
                    alturaTela={alturaTela}
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
        {opcaoInvalida && (
          <Box
            sx={{
              backgroundColor: "#d32f2f",
              padding: 2,
              borderRadius: 4,
              marginTop: 1.2,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" color="white">
              Opção inválida, digite novamente
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
