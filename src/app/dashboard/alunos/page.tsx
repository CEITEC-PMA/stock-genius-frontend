"use client";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import IconButton from "@mui/material/IconButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import React from "react";
import { Aluno } from "@/utils/types/aluno.types";
import jsPDF from "jspdf";
import "jspdf-autotable";

//interface para autoTable
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDFWithAutoTable;
}
const doc: jsPDFWithAutoTable = new jsPDF({
  orientation: "landscape",
});

export default function Alunos() {
  const { user } = useUserContext();
  let [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isLoading, setIsloading] = useState(true);

  const columns: GridColDef[] = [
    {
      field: "nome",
      renderHeader: () => <strong>{"NOME DO ALUNO"}</strong>,
      align: "center",
      headerAlign: "center",
      flex: 2,
    },
    {
      field: "responsavel1",
      renderHeader: () => <strong>{"RESPONSAVEL 1"}</strong>,
      align: "center",
      headerAlign: "center",
      flex: 2,
    },
    {
      field: "responsavel2",
      renderHeader: () => <strong>{"RESPONSAVEL 2"}</strong>,
      align: "center",
      headerAlign: "center",
      flex: 2,
    },
    {
      field: "responsavel3",
      renderHeader: () => <strong>{"RESPONSAVEL 3"}</strong>,
      align: "center",
      headerAlign: "center",
      flex: 2,
    },
    {
      field: "serie",
      renderHeader: () => <strong>{"SÉRIE"}</strong>,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "permissaoVoto",
      renderHeader: () => <strong>{"VOTA"}</strong>,
      align: "center",
      headerAlign: "center",
    },
  ];
  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
    if (user._id) {
      setIsloading(true);
      const getDadosAlunos = async () => {
        const response = await fetch(`${apiUrl}/api/v1/aluno/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseJson = await response.json();

        setAlunos(responseJson.alunos);
        return response;
      };
      setIsloading(false);
      getDadosAlunos();
    }
  }, [user._id]);

  let indexAlunos = 0;
  let permissaoVoto = "";
  alunos.forEach((aluno) => {
    if (aluno.votante === false) {
      permissaoVoto = "NÃO";
    } else {
      permissaoVoto = "SIM";
    }
    indexAlunos++;

    console.log("permissão de voto: " + permissaoVoto);

    alunos[indexAlunos - 1].permissaoVoto = permissaoVoto;
  });

  console.log(alunos);

  const downloadPdf = () => {
    doc.text(
      `ELEIÇÕES MUNICIPAIS DE DIRETORES BIÊNIO 2024/25\nLista de Alunos - ${user.nome}`,
      20,
      10
    );
    const columns = [
      { title: "NOME DO ALUNO", dataKey: "nome" },
      { title: "RESPONSAVEL 1", dataKey: "responsavel1" },
      { title: "RESPONSAVEL 2", dataKey: "responsavel2" },
      { title: "RESPONSAVEL 3", dataKey: "responsavel3" },
      { title: "SERIE", dataKey: "serie" },
      { title: "VOTA", dataKey: "permissaoVoto" },
    ];
    const data = alunos.map((aluno) => ({
      nome: aluno.nome,
      responsavel1: aluno.responsavel1,
      responsavel2: aluno.responsavel2,
      responsavel3: aluno.responsavel3,
      serie: aluno.serie,
      aluno_votou: aluno.aluno_votou,
      permissaoVoto: aluno.permissaoVoto,
    }));

    doc.autoTable({
      head: [columns.map((col) => col.title)],
      body: data.map((row) =>
        //@ts-ignore
        columns.map((col) => row[col.dataKey as keyof Aluno])
      ),
      startY: 20,
    });

    doc.save("table.pdf");
  };
  return (
    <Box margin="24px">
      <Container>
        <Typography variant="h3" marginBottom="12x" textAlign="center">
          Lista de Alunos
        </Typography>

        {!isLoading && (
          <Box display="flex" justifyContent="flex-end">
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
            height: "645px",
            width: "100%",
            background: "#fff",
          }}
        >
          <DataGrid
            sx={{ marginTop: "20px" }}
            getRowId={(row) => row._id}
            rows={alunos}
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
