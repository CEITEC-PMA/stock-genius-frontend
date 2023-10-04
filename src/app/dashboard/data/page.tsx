"use client";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "cpf", headerName: "CPF", width: 130 },
  { field: "inep", headerName: "Inep da U.E.", width: 100 },
  { field: "nome", headerName: "Nome completo", width: 575 },
  { field: "telefone", headerName: "Telefone", width: 130, sortable: false },
  {
    field: "acoes",
    headerName: "Ações",
    width: 130,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => (
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
    headerCheckboxSelection: true,
    checkboxSelection: true,
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

const rows = [
  {
    id: 1,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Jon",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 2,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Cersei",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 3,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Jaime",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 4,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Arya",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 5,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Daenerys",
    funcao: "cantor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 6,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Raphael",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 7,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Ferrara",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 8,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Rossini",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 9,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Harvey",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 10,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Harvey",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 11,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Harvey",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 12,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Harvey",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 13,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Harvey",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 14,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Harvey",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 15,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Harvey",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 16,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Harvey",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 17,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Harvey",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 18,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Harvey",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 19,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Harvey",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 20,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Harvey",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
  {
    id: 21,
    cpf: "031.543.551-89",
    inep: "52021459",
    nome: "Harvey",
    funcao: "professor",
    telefone: "(62) 99237-6865",
  },
];

const handleDetalhar = (event, id) => {
  event.stopPropagation();
  // Implemente a lógica para a ação "Detalhar" aqui
};

const handleEditar = (event, id) => {
  event.stopPropagation();
  // Implemente a lógica para a ação "Editar" aqui
};

const handleValidar = (event, id) => {
  event.stopPropagation();
  // Implemente a lógica para a ação "Validar" aqui
};

export default function DataTable() {
  const token = localStorage.getItem("token");
  const [candidatos, setCandidatos] = useState([]);
  useEffect(() => {
    //fetch
    const getDadosCandidatos = async () => {
      const response = await fetch(
        "http://localhost:3002/api/v1/candidato/candidatoZona/651c2130669db209a4d7833a",
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
  }, []);
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
