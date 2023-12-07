"use client";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import IconButton from "@mui/material/IconButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Button, Container, Typography } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import React from "react";
import { Aluno } from "@/utils/types/aluno.types";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import CustomModal from "@/components/modal";
import { useRouter } from "next/navigation";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nomeAluno, setNomeAluno] = useState("");
  const [idAluno, setIdAluno] = useState("");
  const router = useRouter();

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
              title="Editar dados do aluno"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={(
                event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
              ) => handleDeletar(event, params.row.nome, params.row._id)}
              title="Remover aluno"
            >
              <DeleteIcon />
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

  const handleDeletar = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    nome: string,
    id: string
  ) => {
    setIsModalOpen(true);
    setNomeAluno(nome);
    setIdAluno(id);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/api/v1/aluno/${idAluno}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      setAlunos((prevAlunos) =>
        prevAlunos.filter((aluno) => aluno._id !== idAluno)
      );
      alert("Aluno removido com sucesso!");
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error fetching data:", error);
      // setIsLoading(false);
    }
  };

  const handleEditar = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => router.push(`/dashboard/formaluno?id=${id}`);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  let indexAlunos = 0;
  let permissaoVoto = "";
  alunos.forEach((aluno) => {
    if (aluno.votante === false) {
      permissaoVoto = "NÃO";
    } else {
      permissaoVoto = "SIM";
    }
    indexAlunos++;

    alunos[indexAlunos - 1].permissaoVoto = permissaoVoto;
  });

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

  const handleAdicionar = () => router.push("/dashboard/formaluno");
  return (
    <Box margin="24px">
      <Container>
        <Typography variant="h3" marginBottom="12x" textAlign="center">
          Lista de Alunos
        </Typography>

        {!isLoading && (
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              startIcon={<AddCircleIcon fontSize="large" />}
              onClick={handleAdicionar}
            >
              Adicionar novo aluno
            </Button>
            {/* <IconButton onClick={downloadPdf}>
              <PictureAsPdfIcon fontSize="large" sx={{ color: "#b30b00" }} />
            </IconButton> */}
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
        <CustomModal
          open={isModalOpen}
          title="Confirma exclusão da lista?"
          description={`Deseja excluir o aluno/a ${nomeAluno}?`}
          onClose={closeModal}
          yesButtonLabel="Sim"
          noButtonLabel="Não"
          onYesButtonClick={confirmDelete}
          onNoButtonClick={closeModal}
        />
      </Container>
    </Box>
  );
}
