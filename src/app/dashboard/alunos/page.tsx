"use client";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import IconButton from "@mui/material/IconButton";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LinearProgress from '@mui/material/LinearProgress';
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
  const [isLoading, setIsloading] = useState(true)

  const columns: GridColDef[] = [
    { field: "nome", renderHeader: () => <strong>{'NOME DO ALUNO'}</strong>, width: 220, align: "center", headerAlign: 'center', flex: 1 },
    { field: "responsavel1", renderHeader: () => <strong>{'RESPONSAVEL 1'}</strong>, width: 220, align: "center", headerAlign: 'center', flex: 1 },
    { field: "responsavel2", renderHeader: () => <strong>{'RESPONSAVEL 2'}</strong>, width: 220, align: "center", headerAlign: 'center', flex: 1 },
    { field: "serie", renderHeader: () => <strong>{'SÉRIE'}</strong>, width: 100, align: "center", headerAlign: 'center', flex: 1 },

  ];
  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
    if (user._id) {
      setIsloading(true);
      const getDadosAlunos = async () => {
        const response = await fetch(
          `${apiUrl}/api/v1/aluno/alunozona`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const responseJson = await response.json();
        console.log(responseJson.alunos)
        setAlunos(responseJson.alunos);
        return response
      };
      setIsloading(false)
      getDadosAlunos();
    }
  }, [user._id]);


  const downloadPdf = () => {
    console.log(alunos)
    doc.text("Tabela de Alunos", 20, 10);
    const columns = [
      { title: "NOME DO ALUNO", dataKey: "nome" },
      { title: "RESPONSAVEL 1", dataKey: "responsavel1" },
      { title: "RESPONSAVEL 2", dataKey: "responsavel2" },
      { title: "SERIE", dataKey: "serie" },

    ];
    const data = alunos.map((aluno) => ({
      nome: aluno.nome,
      responsavel1: aluno.responsavel1,
      responsavel2: aluno.responsavel2,
      serie: aluno.serie,
    }));

    doc.autoTable({
      head: [columns.map((col) => col.title)],
      //@ts-ignore 
      body: data.map((row) => columns.map((col) => row[col.dataKey as keyof Aluno])),
      startY: 20,
    });

    doc.save("table.pdf");
  };
  return (
    <Box margin="24px" >
      <Container>

        <Typography variant="h3" marginBottom="12x" textAlign="center">
          Lista de Alunos
        </Typography>

        {!isLoading && (<Box display="flex" justifyContent="flex-end">
          <IconButton onClick={downloadPdf} >
            <PictureAsPdfIcon fontSize="large" sx={{ color: "#b30b00" }} />
          </IconButton>
        </Box>)}

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
