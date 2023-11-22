import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

export default function Unauthorized() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box margin="0" padding="0" height={`calc(100vh - 66px)`} overflow="hidden">
      <Typography
        variant={smDown ? "h6" : mdDown ? "h5" : "h4"}
        textAlign="center"
        marginTop={2}
        color=" #0f4c81"
      >
        ELEIÇÕES MUNICIPAIS DE DIRETORES BIÊNIO 2024/25
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
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
          Você não possui autorização para acessar essa página
        </Typography>
      </Box>
    </Box>
  );
}
