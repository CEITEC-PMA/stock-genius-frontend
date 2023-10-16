"use client";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Container, Typography } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DataTable() {
  const { user } = useUserContext();
  const [token, setToken] = useState("" as string | null);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    setToken(localStorageToken);
  }, []);

  const router = useRouter();
  const [candidatos, setCandidatos] = useState([]);

  const columns: GridColDef[] = [
    { field: "cpf", headerName: "CPF", width: 130 },
    { field: "nome", headerName: "Nome completo", width: 575 },
    { field: "telefone", headerName: "Telefone", width: 130, sortable: false },
    {
      field: "acoes",
      headerName: "Ações",
      width: 130,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <Link href={`/dashboard/candidato/register/${params.row._id}`}>
            <IconButton color="primary" title="Detalhar">
              <VisibilityIcon />
            </IconButton>
          </Link>

          <IconButton
            color="primary"
            onClick={(event) => handleEditar(event, params.row._id)}
            title="Inserir"
          >
            <AttachFileIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={(event) => handleValidar(event, params.row._id)}
            title="Analisar"
          >
            <CheckCircleIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleDetalhar = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();
    router.push(`/dashboard/candidato/register/${id}`);
  };

  const handleEditar = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();
    console.log(id);
    router.push(`/dashboard/candidato/docs/${id}`);
  };

  const handleValidar = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();
  };

  useEffect(() => {
    //fetch
    if (user._id) {
      const getDadosCandidatos = async () => {
        const response = await fetch(
          `${apiUrl}/api/v1/candidato/candidatoZona/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseJson = await response.json();
        setCandidatos(responseJson.candidatos);
      };
      getDadosCandidatos();
    }
  }, [token, user._id]);
  return (
    <Box margin="24px">
      <Container>
        <Typography variant="h3" marginBottom="12x" textAlign="center">
          Lista de Candidatos
        </Typography>
        <div
          style={{
            height: "645px",
            width: "100%",
            background: "#fff",
          }}
        >
          <DataGrid
            getRowId={(row) => row._id}
            rows={candidatos}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </div>
      </Container>
    </Box>
  );
}
