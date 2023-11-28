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
  cargo: string;
}

const FormularioFuncionario = () => {
  const { user } = useUserContext();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cargo: "",
  });

  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
    if (!!id) {
      const getDadosFuncionario = async () => {
        const response = await fetch(`${apiUrl}/api/v1/funcionario/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseJson = await response.json();
        console.log(responseJson);
        const { funcionario } = responseJson;

        setFormData({
          nome: funcionario.nome,
          cargo: funcionario.cargo,
        });
        return response;
      };
      getDadosFuncionario();
    }
  }, [user._id]);

  const cargoOptions = [
    "Agente Administrativo Educacional Apoio (A)",
    "Agente Administrativo Educacional Superior (S)",
    "Agente Administrativo Educacional Técnico (T)",
    "Agente Administrativo Educacional (VIGIA)",
    "ASHA",
    "ASHA ( Readaptado)",
    "ASHA/Me",
    "Assessora Geral II",
    "Auxiliar de Educação",
    "Auxiliar de Serviços De Higiene E Alimentação (Readaptada)",
    "Cargo em Comissão/Assessor Geral II",
    "Cuidadora",
    "Cuidadora (Comissionada)",
    "Executor de Serviços Administrativos",
    "Interprete de Libras ",
    "Motorista",
    "Professor II",
    "Professor III",
    "Professor IV",
    "Professor IV(Readaptada)",
    "Professor V",
  ];

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const paraMaiuscula = value.toUpperCase();
    setFormData((prevData) => ({
      ...prevData,
      [name]: paraMaiuscula,
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
        const response = await fetch(`${apiUrl}/api/v1/funcionario/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(filteredFormData),
        });

        if (response.ok) {
          console.log("Dados enviados com sucesso!");
          alert("Edição concluído com sucesso!");
          router.push("/dashboard/funcionarios");
        } else {
          console.error("Falha ao enviar os dados.");
          alert("Não foi possível cadastrar o funcionário, tente novamente");
        }
      } else {
        const response = await fetch(`${apiUrl}/api/v1/funcionario/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(filteredFormData),
        });
        console.log(response);
        if (response.ok) {
          console.log("Dados enviados com sucesso!");
          alert("Cadastro concluído com sucesso!");
          router.push("/dashboard/funcionarios");
        } else {
          console.error("Falha ao enviar os dados.");
          alert("Não foi possível cadastrar o funcionário, tente novamente");
        }
      }
    } catch (error) {
      alert("Não foi possível cadastrar o funcionário, tente novamente");
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
            ? "Formulário de edição de funcionário"
            : "Formulário de cadastro de funcionário"}
        </Typography>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Nome do funcionário"
                variant="outlined"
                fullWidth
                required
                sx={{ backgroundColor: "#fff", width: "100%" }}
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sx={{ maxWidth: 700, width: "100%" }}>
              <InputLabel>Cargo</InputLabel>
              <Select
                variant="outlined"
                placeholder="Selecione"
                required
                sx={{ backgroundColor: "#fff", width: "100%" }}
                name="cargo"
                fullWidth
                value={formData.cargo}
                onChange={handleSelectChange}
              >
                {cargoOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sx={{ maxWidth: 700, width: "100%" }}>
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

export default FormularioFuncionario;
