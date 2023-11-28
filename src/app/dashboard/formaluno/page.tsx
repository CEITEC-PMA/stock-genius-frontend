"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import { useUserContext } from "@/userContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { apiUrl } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";

interface FormData {
  nome: string;
  responsavel1: string;
  responsavel2: string | null;
  responsavel3: string | null;
  serie: string;
}

const FormularioCadastro = () => {
  const { user } = useUserContext();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";

  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
    if (!!id) {
      setIsloading(true);
      const getDadosAluno = async () => {
        const response = await fetch(`${apiUrl}/api/v1/aluno/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseJson = await response.json();
        const { aluno } = responseJson;

        setFormData({
          nome: aluno.nome,
          responsavel1: aluno.responsavel1,
          responsavel2: aluno.responsavel2,
          responsavel3: aluno.responsavel3,
          serie: aluno.serie,
        });
        return response;
      };
      setIsloading(false);
      getDadosAluno();
    }
  }, [user._id]);

  const serieOptions = [
    "ED. INF. I",
    "ED. INF. II",
    "ED. INF. III",
    "ED. INF. IV",
    "ED. INF. V",
    "1° ANO",
    "2° ANO",
    "3° ANO",
    "4° ANO",
    "5° ANO",
    "6° ANO",
    "7° ANO",
    "8° ANO",
  ];

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    responsavel1: "",
    responsavel2: null,
    responsavel3: null,
    serie: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const paraMaiuscula = value.toUpperCase();
    setFormData((prevData) => ({
      ...prevData,
      [name]: paraMaiuscula,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(
        ([_, value]) => value !== null && value !== ""
      )
    );
    try {
      if (!!id) {
        const response = await fetch(`${apiUrl}/api/v1/aluno/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(filteredFormData),
        });

        if (response.ok) {
          console.log("Dados enviados com sucesso!");
          alert("Edição concluída com sucesso!");
          router.push("/dashboard/alunos");
        } else {
          console.error("Falha ao enviar os dados.");
          alert("Não foi possível cadastrar o aluno, tente novamente");
        }
      } else {
        const response = await fetch(`${apiUrl}/api/v1/aluno/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(filteredFormData),
        });

        if (response.ok) {
          console.log("Dados enviados com sucesso!");
          alert("Cadastro concluído com sucesso!");
          router.push("/dashboard/alunos");
        } else {
          console.error("Falha ao enviar os dados.");
          alert("Não foi possível cadastrar o aluno, tente novamente");
        }
      }
    } catch (error) {
      alert("Não foi possível cadastrar o aluno, tente novamente");
      console.error("Erro ao enviar os dados:", error);
    }
  };

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
          {id
            ? "Formulário de edição de aluno"
            : "Formulário de cadastro de aluno"}
        </Typography>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Nome do Aluno"
                variant="outlined"
                fullWidth
                required
                sx={{ backgroundColor: "#fff" }}
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Responsável 1"
                variant="outlined"
                fullWidth
                required
                sx={{ backgroundColor: "#fff" }}
                name="responsavel1"
                value={formData.responsavel1}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Responsável 2"
                variant="outlined"
                fullWidth
                sx={{ backgroundColor: "#fff" }}
                name="responsavel2"
                value={formData.responsavel2}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Responsável 3"
                variant="outlined"
                fullWidth
                sx={{ backgroundColor: "#fff" }}
                name="responsavel3"
                value={formData.responsavel3}
                onChange={handleInputChange}
              />
            </Grid>
            {!id && (
              <Grid item xs={3}>
                <InputLabel>Série</InputLabel>
                <Select
                  variant="outlined"
                  placeholder="Selecione"
                  required
                  sx={{ width: 180, backgroundColor: "#fff" }}
                  name="serie"
                  value={formData.serie}
                  onChange={handleSelectChange}
                >
                  {serieOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<CheckCircleIcon fontSize="large" />}
                onClick={handleSubmit}
              >
                {id ? "EDITAR" : "SALVAR"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default FormularioCadastro;
