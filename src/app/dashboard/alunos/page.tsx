"use client";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Container, Typography } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import { useRouter } from "next/navigation";
import React from "react";
import { Aluno } from "@/utils/types/aluno.types";


export default function Alunos() {
  const { user } = useUserContext();

  const router = useRouter();
  const [alunos, setAlunos] = useState<Aluno[]>([]);



  const columns: GridColDef[] = [
    { field: "nome", renderHeader: () => <strong>{'NOME DO ALUNO'}</strong>, width: 220, align: "center", headerAlign: 'center' },
    { field: "mae", renderHeader: () => <strong>{'NOME DA MÃE'}</strong>, width: 220, align: "center", headerAlign: 'center' },
    { field: "pai", renderHeader: () => <strong>{'NOME DO PAI'}</strong>, width: 220, align: "center", headerAlign: 'center' },
    { field: "responsavel", renderHeader: () => <strong>{'NOME DO RESPONSÁVEL'}</strong>, width: 220, align: "center", headerAlign: 'center' },
    { field: "serie", renderHeader: () => <strong>{'SÉRIE'}</strong>, width: 100, align: "center", headerAlign: 'center' },
    { field: "turma", renderHeader: () => <strong>{'TURMA'}</strong>, width: 100, align: "center", headerAlign: 'center' },
  ];

  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
    if (user._id) {
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
      getDadosAlunos();
    }
  }, [user._id]);

  alunos.sort(function (a: any, b: any) {
    if (a.nome > b.nome) {
      return 1;
    } else {
      return -1;
    }
  })
  console.log(alunos)



  return (
    // <div>teste</div>
    <Box margin="24px" >
      <Container>
        <Typography variant="h3" marginBottom="12x" textAlign="center">
          Lista de Alunos
        </Typography>
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
