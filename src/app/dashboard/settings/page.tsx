"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useRouter } from "next/navigation";
import { Candidato } from "@/utils/types/candidato.types";
import { apiUrl } from "@/utils/api";

export default function Settings() {
  const router = useRouter();
  const [token, setToken] = useState("" as string | null);
  const [textFieldValue, setTextFieldValue] = useState<string>("");
  const [candidato, setCandidato] = useState({
    foto: [],
  } as unknown as Candidato);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);
  }, [token]);

  const handleSubmit = async (inep: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/zona/inep`, {
        method: "PUT",
        body: JSON.stringify({ inep }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Senha redefinida com sucesso!");
        router.push("/");
      } else {
        alert("Não foi possível redefinir a senha!");
      }
    } catch (error) {
      console.error("Ocorreu um erro na solicitação:", error);
      alert("Ocorreu um erro na solicitação");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  return (
    <Box margin="24px">
      <Grid container alignItems="center" flexDirection="column">
        <Grid item>
          <Typography variant="h3" marginBottom="12x" textAlign="center">
            Redefinição de senha de usuário
          </Typography>
        </Grid>
        <Grid
          item
          marginTop="200px"
          alignItems="center"
          display="flex"
          flexDirection="column"
          gap="24px"
        >
          <TextField
            margin="normal"
            required
            name="inep"
            label="INEP"
            fullWidth
            type="tel"
            id="inep"
            autoComplete="inep"
            value={textFieldValue}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            startIcon={<RotateLeftIcon />}
            size="large"
            onClick={() => handleSubmit(textFieldValue)}
          >
            Resetar senha
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
