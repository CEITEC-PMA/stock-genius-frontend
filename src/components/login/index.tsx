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
import { PatternFormat } from "react-number-format";
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
  Stack,
} from "@mui/material";
import type { DialogProps } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter();
  const [openSnack, setOpenSnack] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [username, setUsername] = useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (typeof token === "string") setToken(token);
  }, []);

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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

  const handleResetPassword = async () => {
    try {
      const response = await fetch(`${apiUrl}/v1/auth/primeiroacesso`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const resJson = await response.json();
        console.log(resJson);
        const tokenBackEnd = resJson.tokens.access.token;
        setToken(tokenBackEnd);
        localStorage.setItem("token", token);
        router.push("/dashboard");
      } else {
        throw new Error("Falha ao redefinir a senha");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setOpen(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataToSend = {
      username: data.get("username"),
      password: data.get("password"),
    };
    const { password, username } = dataToSend;
    if (!username) {
      setErrorMessage("Por favor digite o número do CPF");
      setOpen(true);
    }
    if (!password) {
      setErrorMessage("Por favor digite uma senha");
      setOpen(true);
    } else {
      if (password.length < 6) {
        setErrorMessage("A senha deve ter pelo menos 6 caracteres");
        setOpen(true);
      } else {
        const response = await fetch(`${apiUrl}/v1/auth/login-cpf`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        })
          .then(async (response) => {
            if (response.status === 200) {
              const resJson = await response.json();
              if (resJson.message === "Primeiro acesso") {
                handleOpenDialog();
              } else {
                const token = resJson.tokens.access.token;
                setToken(token);
                localStorage.setItem("token", token);
                router.push("/dashboard");
              }
            } else if (response.status === 401) {
              throw new Error("CPF ou Senha Inválidos");
            }
          })
          .catch((error) => {
            setErrorMessage(error.message);
            setOpen(true);
          });
      }
    }
  };

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

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
            name="username"
            label="CPF"
            type="tel"
            id="username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Enviar
          </Button>
          <Dialog open={openDialog}>
            <DialogTitle>Redefina a sua senha</DialogTitle>
            <DialogContent>
              <DialogContentText marginBottom="8px">
                Neste primeiro acesso, redefina sua senha. Sua senha deve conter
                pelo menos 8 caracteres, com pelo menos 1 letra e 1 número.
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
                error={
                  !!(
                    !passwordsMatch ||
                    (password && !passwordRegex.test(password))
                  )
                }
                helperText={
                  (!passwordsMatch && "As senhas não coincidem.") ||
                  (password &&
                    !passwordRegex.test(password) &&
                    "A senha deve ter pelo menos 8 caracteres, com pelo menos 1 letra e 1 número.")
                }
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
                helperText={
                  (!passwordsMatch && "As senhas não coincidem.") ||
                  (rePassword &&
                    password !== rePassword &&
                    "As senhas não coincidem.")
                }
              />
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleCloseDialog}>Cancelar</Button> */}
              <Button
                variant="contained"
                disabled={!passwordsMatch || !passwordRegex.test(password)}
                onClick={handleResetPassword}
              >
                Enviar
              </Button>
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
