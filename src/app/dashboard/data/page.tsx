"use client";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";

const columns: GridColDef[] = [
  {
    field: "__checkbox__",
    width: 50,
  },
  { field: "cpf", headerName: "CPF", width: 130 },
  { field: "inep", headerName: "Inep da U.E.", width: 100 },
  { field: "nome", headerName: "Nome completo", width: 575 },
  { field: "telefone", headerName: "Telefone", width: 130, sortable: false },
  {
    field: "acoes",
    headerName: "Ações",
    width: 130,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <div>
        <IconButton
          color="primary"
          onClick={(event) => handleDetalhar(event, params.row.id)}
          title="Detalhar"
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          color="primary"
          onClick={(event) => handleEditar(event, params.row.id)}
          title="Editar"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="primary"
          onClick={(event) => handleValidar(event, params.row.id)}
          title="Validar"
        >
          <CheckCircleIcon />
        </IconButton>
      </div>
    ),
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

const handleDetalhar = (
  event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  id: string
) => {
  event.stopPropagation();
};

const handleEditar = (
  event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  id: string
) => {
  event.stopPropagation();
};

const handleValidar = (
  event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  id: string
) => {
  event.stopPropagation();
};

export default function DataTable() {
  const { user } = useUserContext();
  const token = localStorage.getItem("token");
  const [candidatos, setCandidatos] = useState([]);
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
    <>
      <Typography variant="h3">Lista de Candidatos</Typography>
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
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </>
  );
}
