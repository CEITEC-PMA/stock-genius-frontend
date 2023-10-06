"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { PatternFormat } from "react-number-format";
import { useRouter } from "next/navigation";
import Header from "../dashboard/Header";
import AppBarComponent from "../dashboard/AppBarComponent";
import { apiUrl } from "@/utils/api";
import { TransitionProps } from "@mui/material/transitions";
import { Alert, Fade, IconButton, Snackbar, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function LoginPage() {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errorInep, setErrorInep] = React.useState("");

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataToSend = {
      inep: data.get("inep"),
      password: data.get("senha"),
    };
    const { password, inep } = dataToSend;
    if (!inep) {
      setErrorInep("Campo Obrigatório");
      alert("Por favor digite o número do INEP");
    }
    if (!password) {
      alert("Por favor digite uma senha");
    } else {
      if (password.length < 6) {
        alert("a senha deve ter pelo menos 6 caracteres");
      } else {
        //Trocar dispatch para um post utilizando o https://nextjs.org/docs/app/api-reference/functions/fetch

        const response = await fetch(`${apiUrl}/api/v1/usuarios/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        })
          .then(async (response) => {
            if (response.status === 200) {
              const resJson = await response.json();
              const token = resJson.usuario.token;
              localStorage.setItem("token", token);
              router.push("/dashboard");
            } else if (response.status === 401) {
              throw new Error("Inep ou Senha Inválidos");
            }
          })
          .catch((error) => {
            setErrorMessage(error.message);
            setOpen(true);
          });
        // dispatch(userSlice.actions.loginUser(dataToSend));
        // router.push("/dashboard");
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={open}
          autoHideDuration={8000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Stack>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="inep"
            label="INEP"
            type="tel"
            id="inep"
            autoComplete="inep"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="senha-atual"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
