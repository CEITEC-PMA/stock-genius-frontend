"use client";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import IconButton from "@mui/material/IconButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Button, Container, Typography } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
// import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Funcionario } from "@/utils/types/funcionario.types";
import { useUserContext } from "@/userContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";

//interface para autoTable
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDFWithAutoTable;
}
const doc: jsPDFWithAutoTable = new jsPDF({});

export default function Funcionarios() {
  const { user } = useUserContext();
  let [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const router = useRouter();

  const handleAdicionar = () => router.push("/dashboard/formfuncionario");

  const handleEditar = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => router.push(`/dashboard/formfuncionario?id=${id}`);

  const columns: GridColDef[] = [
    {
      field: "nome",
      renderHeader: () => <strong>{"NOME"}</strong>,
      width: 450,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "cargo",
      renderHeader: () => <strong>{"CARGO"}</strong>,
      width: 450,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "acoes",
      headerName: "Ações",
      width: 95,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div>
            <IconButton
              color="primary"
              onClick={(
                event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
              ) => handleEditar(event, params.row._id)}
              title="Editar dados do funcionário"
            >
              <EditIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
    if (user._id) {
      setIsloading(true);
      const getDadosFuncionarios = async () => {
        const response = await fetch(`${apiUrl}/api/v1/funcionario/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseJson = await response.json();
        console.log(responseJson);
        setFuncionarios(responseJson.funcionarios);
        return response;
      };
      setIsloading(false);
      getDadosFuncionarios();
    }
  }, [user._id]);

  const downloadPdf = () => {
    // console.log(funcionarios)
    doc.text(
      `ELEIÇÕES MUNICIPAIS DE DIRETORES BIÊNIO 2024/25\nLista de Funcionários - ${user.nome}`,
      20,
      10
    );
    const columns = [
      { title: "NOME ", dataKey: "nome" },
      { title: "CARGO", dataKey: "cargo" },
    ];

    const data = funcionarios.map((funcionario) => ({
      nome: funcionario.nome,
      cargo: funcionario.cargo,
    }));

    doc.autoTable({
      head: [columns.map((col) => col.title)],
      body: data.map((row) =>
        //@ts-ignore
        columns.map((col) => row[col.dataKey as keyof Funcionario])
      ),
      startY: 20,
    });

    doc.save("table.pdf");
  };
  return (
    <Box margin="24px">
      <Container>
        <Typography variant="h3" marginBottom="12x" textAlign="center">
          Lista de Funcionários - {user.nome}
        </Typography>

        {!isLoading && (
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              startIcon={<AddCircleIcon fontSize="large" />}
              onClick={handleAdicionar}
            >
              Adicionar novo funcionário
            </Button>
            <IconButton onClick={downloadPdf}>
              <PictureAsPdfIcon fontSize="large" sx={{ color: "#b30b00" }} />
            </IconButton>
          </Box>
        )}

        {isLoading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}

        <div
          style={{
            // height: "645px",
            width: "100%",
            background: "#fff",
          }}
        >
          <DataGrid
            sx={{ marginTop: "20px" }}
            getRowId={(row) => row._id}
            rows={funcionarios}
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
