"use client";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useRouter } from "next/navigation";
import { Candidato } from "@/utils/types/candidato.types";
import { apiUrl } from "@/utils/api";
import CustomModal from "@/components/modal";
import { useUserContext } from "@/userContext";
import Unauthorized from "@/components/unauthorized";

interface Zona {
  inep: string;
  nome: string;
  _id: string;
}

export default function Settings() {
  const router = useRouter();
  const [token, setToken] = useState("" as string | null);
  const [textFieldValue, setTextFieldValue] = useState<string>("");
  const [candidato, setCandidato] = useState({
    foto: [],
  } as unknown as Candidato);
  const { user } = useUserContext();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Zona | null>(null);
  const [inputValue, setInputValue] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (user._id) {
      const getDados = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/v1/zona`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const responseJson = await response.json();
          setZonas(responseJson.zona);
          setIsLoading(false);
          return response;
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      };

      getDados();
    }
  }, [user._id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);
  }, [token]);

  const handleReset = async (inep: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/zona/inep`, {
        method: "PUT",
        body: JSON.stringify({ inep: selectedOption?.inep }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Senha redefinida com sucesso!");
        router.push("/dashboard");
      } else {
        alert("Não foi possível redefinir a senha!");
      }
    } catch (error) {
      console.error("Ocorreu um erro na solicitação:", error);
      alert("Ocorreu um erro na solicitação");
    }
  };

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setTextFieldValue(event.target.value);
  // };

  const handleOptionChange = (
    event: React.ChangeEvent<{}>,
    value: Zona | null
  ) => {
    setSelectedOption(value);
  };

  if (user.role && user.role.includes("super-adm")) {
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
            {isLoading === false && (
              <Box marginTop={4}>
                <Autocomplete
                  options={zonas}
                  getOptionLabel={(option) => option.nome}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Digite o nome da Unidade de Ensino"
                      variant="outlined"
                      onChange={(e) => setInputValue(e.target.value)}
                      sx={{ width: 500, backgroundColor: "#fff" }}
                    />
                  )}
                  value={selectedOption}
                  onChange={handleOptionChange}
                  renderOption={(props, option) => (
                    <li {...props} key={option._id}>
                      {option.nome}
                    </li>
                  )}
                />
              </Box>
            )}
            {selectedOption && (
              <Button
                variant="contained"
                startIcon={<RotateLeftIcon />}
                size="large"
                onClick={() => openModal()}
              >
                Resetar senha
              </Button>
            )}
            <CustomModal
              open={isModalOpen}
              title="Atenção!"
              description={`Confirma o reset de senha da unidade ${selectedOption?.nome}?`}
              onClose={closeModal}
              yesButtonLabel="Sim"
              noButtonLabel="Não"
              onYesButtonClick={() => handleReset(textFieldValue)}
              onNoButtonClick={closeModal}
            />
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return <Unauthorized />;
  }
}
