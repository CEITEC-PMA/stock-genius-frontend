import { Box, Grid, Typography, LinearProgress } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useUserContext } from "@/userContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FinalizarVotacao() {
  const { user } = useUserContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error: Error) => console.log("Erro ao tocar áudio:", error));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = 100 / ((5 * 1000) / 100);
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 500);

    return () => clearTimeout(timer);
  }, [progress, router]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      padding="0"
      margin="0"
      overflow="hidden"
    >
      <Typography align="center" variant="h4" color="#0F4C81">
        Eleição de Diretores 2023 - {user.nome}
      </Typography>
      <Grid container spacing={1}>
        <Grid
          item
          container
          display="flex"
          flexDirection="column"
          justifyItems="center"
          justifyContent="center"
          alignItems="center"
          height="70vh"
        >
          <Image
            src={
              "https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg"
            }
            alt="CheckIcon"
            width={130}
            height={130}
          />
          <Typography align="center" variant="h1">
            Voto computado com sucesso!
          </Typography>
          <Box
            width="100%"
            maxWidth="400px"
            alignSelf="center"
            marginTop="48px"
          >
            <Typography align="center" marginBottom="6px">
              Você será redirecionado em 5 segundos
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              color="success"
              style={{ height: 10, width: "100%" }}
            />
            <audio
              ref={audioRef}
              src="https://www.myinstants.com/media/sounds/confirma-urna.mp3"
              autoPlay
              muted={false}
            />
            {/* <div>
              FinalizarVotacao
              <Button onClick={voltarEtapa}>Voltar</Button>
              <Button onClick={avancarEtapa}>Avançar</Button>
            </div> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
