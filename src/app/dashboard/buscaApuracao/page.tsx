"use client";
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PollIcon from "@mui/icons-material/Poll";
import { useRouter } from "next/navigation";
import Unauthorized from "@/components/unauthorized";

interface Zona {
  inep: string;
  nome: string;
  _id: string;
}

export default function BuscaApuracao() {
  const { user } = useUserContext();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<Zona | null>(null);
  const router = useRouter();

  console.log(user);

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

  const handleOptionChange = (
    event: React.ChangeEvent<{}>,
    value: Zona | null
  ) => {
    setSelectedOption(value);
  };

  const handleAcompanharClick = (id: string) => {
    router.push(`/dashboard/apuracao/${id}`);
    console.log("Acompanhar votação na Unidade escolhida:", selectedOption);
  };

  if (user.role && user.role.includes("super-adm")) {
    return (
      <Box
        margin="0"
        padding="0"
        height={`calc(100vh - 66px)`}
        overflow="hidden"
      >
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
            Apuração da votação nas Unidades de Ensino
          </Typography>
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
            <Box marginTop={4}>
              <Button
                variant="contained"
                startIcon={<PollIcon style={{ fontSize: 46 }} />}
                style={{ backgroundColor: "#0F4C81", color: "#ffffff" }}
                onClick={() => handleAcompanharClick(selectedOption._id)}
              >
                Acompanhar votação na Unidade escolhida
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    );
  } else {
    return <Unauthorized />;
  }
}
