"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch } from "@/lib/redux";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/utils/api";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
    router.push("/dashboard");
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordsMatch(newPassword === rePassword);
  };

  const handleRePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRePassword = event.target.value;
    setRePassword(newRePassword);
    setPasswordsMatch(password === newRePassword);
  };

  const handleResetPassword = () => {
    if (password.length >= 6 && password === rePassword) {
      setOpenSnack(true);
    } else {
    }
  };

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

        const response = await fetch(`${apiUrl}/api/v1/usuarios/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        })
          .then(async (response) => {
            const resJson = await response.json();
            if (response.status === 200) {
              if (resJson.usuario.acesso === 0) {
                const token = resJson.usuario.token;
                localStorage.setItem("token", token);
                handleOpenDialog();
              }
            } else if (response.status === 401) {
              throw new Error("Inep ou senha incorretos");
            }
          })
          .catch((error) => {
            console.log(error.message);
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
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
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
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Redefina a sua senha</DialogTitle>
            <DialogContent>
              <DialogContentText marginBottom="8px">
                Seja bem-vindo ao Sistema de Eleição de Diretores! Neste
                primeiro acesso, redefina sua senha.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Digite a sua senha"
                type="password"
                inputProps={{
                  minLength: 6,
                }}
                fullWidth
                onChange={handlePasswordChange}
              />
              <TextField
                error={!passwordsMatch}
                margin="dense"
                id="confirmpassword"
                label="Confirme a sua senha"
                type="password"
                inputProps={{
                  minLength: 6,
                }}
                fullWidth
                onChange={handleRePasswordChange}
                helperText={!passwordsMatch && "As senhas não coincidem."}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleResetPassword}>Enviar</Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={openSnack}
            autoHideDuration={2000}
            onClose={handleCloseSnack}
          >
            <Alert
              onClose={(e) => handleCloseSnack(e)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Senha redefinida com sucesso!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Container>
  );
}
