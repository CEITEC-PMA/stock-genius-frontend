"use client";
import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useUserContext } from "@/userContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const FormularioCadastro = () => {
  const { user } = useUserContext();
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
        <Typography variant="h4" gutterBottom>
          Formulário de cadastro de aluno
        </Typography>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Nome do Aluno"
                variant="outlined"
                fullWidth
                required // torna o campo obrigatório
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Responsável 1"
                variant="outlined"
                fullWidth
                required // torna o campo obrigatório
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Responsável 2" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Responsável 3" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Série"
                variant="outlined"
                required // torna o campo obrigatório
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<CheckCircleIcon fontSize="large" />}
              >
                Salvar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default FormularioCadastro;
