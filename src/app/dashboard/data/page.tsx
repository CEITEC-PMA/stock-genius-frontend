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
import { Candidato } from "@/utils/types/candidato.types";
import ThreePIcon from "@mui/icons-material/ThreeP";
import ArticleIcon from "@mui/icons-material/Article";
import CustomModal from "@/components/modal";

export default function DataTable() {
  const { user } = useUserContext();

  const router = useRouter();
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [respostaComissao, setRespostaComissao] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "cpf", headerName: "CPF", width: 130 },
    { field: "nome", headerName: "Nome completo", width: 575, flex: 1 },
    { field: "telefone", headerName: "Telefone", width: 130, sortable: false },
    {
      field: "acoes",
      headerName: "Ações",
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const aprovado = params.row.aprovado;
        return (
          <div>
            <IconButton
              color="primary"
              onClick={(event) => handleDetalhar(event, params.row._id)}
              title="Detalhar"
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={(event) => handleEditar(event, params.row._id)}
              title="Documentação do candidato"
            >
              <AttachFileIcon />
            </IconButton>

            {/* <IconButton
              color="primary"
              onClick={(event) => handleDeletar(event, params.row._id)}
              title="Remover"
            >
              <DeleteIcon />
            </IconButton> */}

            {aprovado === "Indeferida" && (
              <IconButton
                color="error"
                onClick={(event) => handleRecorrer(event, params.row._id)}
                title="Recurso do candidato"
              >
                <ThreePIcon />
              </IconButton>
            )}

            {aprovado === "Indeferida" && (
              <IconButton
                color="warning"
                onClick={(event) =>
                  handleRespostaComissao(event, params.row.respostaComissao2)
                }
                title="Resposta da Comissão Eleitoral Municipal ao recurso"
              >
                <ArticleIcon />
              </IconButton>
            )}

            {/* {user.role?.includes("super-adm") && (
              <IconButton
                color="primary"
                onClick={(event) => handleValidar(event, params.row._id)}
                title="Analisar"
              >
                <CheckCircleIcon />
              </IconButton>
            )} */}
          </div>
        );
      },
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

  const handleRecorrer = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();
    console.log(id);
    router.push(`/dashboard/candidato/recurso/${id}`);
  };

  const handleDeletar = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/api/v1/candidato/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedCandidatos = candidatos.filter(
          (candidato) => candidato._id !== id
        );
        console.log("deletado");
        setCandidatos(updatedCandidatos);
      } else {
        console.error("Erro ao excluir candidato. Else!!!!");
      }
    } catch (error) {
      console.error("Erro ao excluir candidato:", error);
    }
  };

  const handleValidar = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();
    router.push(`/dashboard/candidato/checklist/${id}`);
  };

  const handleRespostaComissao = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    respostaComissao: string
  ) => {
    setRespostaComissao(respostaComissao);
    openModal();
  };

  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
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
  }, [user._id]);

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
          <CustomModal
            open={isModalOpen}
            title="Resposta da Comissão Eleitoral Municipal ao recurso:"
            description={respostaComissao}
            onClose={closeModal}
            yesButtonLabel="Ok"
            onYesButtonClick={closeModal}
          />
        </div>
      </Container>
    </Box>
  );
}
