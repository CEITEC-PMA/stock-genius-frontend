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
import { useDispatch } from "@/lib/redux";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataToSend = {
      inep: data.get("inep"),
      password: data.get("senha"),
    };
    const { password, inep } = dataToSend;
    if (!password) {
      alert("Por favor digite uma senha");
    } else {
      if (password.length < 6) {
        alert("a senha deve ter pelo menos 6 caracteres");
      } else {
        //Trocar dispatch para um post utilizando o https://nextjs.org/docs/app/api-reference/functions/fetch

        const response = await fetch(
          "http://localhost:3002/api/v1/usuarios/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        )
          .then(async (response) => {
            const resJson = await response.json();
            const token = resJson.usuario.token;
            localStorage.setItem("token", token);
            router.push("/dashboard");
          })
          .catch((error) => {
            console.log(error);
          });
        // dispatch(userSlice.actions.loginUser(dataToSend));
        // router.push("/dashboard");
      }
    }
  };

  return (
    <Container maxWidth="xs">
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar-me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Enviar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu sua senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Cadastrar como Candidato"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
