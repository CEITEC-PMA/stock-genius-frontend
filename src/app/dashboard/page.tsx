"use client";
import { Box, Typography, Paper, useMediaQuery, useTheme } from "@mui/material";

import Image from "next/image";

export default function DashboardPage() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        height="100%"
      >
        <Box marginY={2}>
          <Typography
            variant={smDown ? "h6" : mdDown ? "h5" : "h4"}
            textAlign="center"
            marginTop={2}
            color=" #0f4c81"
          >
            Stock Genius - Sistema de Gestão de Materiais da SEMED
          </Typography>
        </Box>

        <Box
          boxSizing="border-box"
          overflow="hidden"
          display="flex"
          justifyContent="center"
          marginX={2}
          borderRadius={2}
        >
          <Box
            boxSizing="border-box"
            overflow="hidden"
            borderRadius={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              height={462.28}
              src="https://api.anapolis.go.gov.br/apiupload/stock/home.jpg"
              width={693.85}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
              alt="Estudante"
            />
          </Box>
        </Box>

        <Box
          marginX={1}
          paddingY={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            textAlign="center"
            mt={mdDown ? "1" : "3"}
            variant="body1"
            color=" #0f4c81"
          >
            Bem-vindo ao Stock Genius - SEMED. Monitore estoques, agilize
            processos e tome decisões estratégicas com facilidade.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
