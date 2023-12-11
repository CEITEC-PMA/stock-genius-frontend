"use client";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DetailsIcon from "@mui/icons-material/Details";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { useUserContext } from "@/userContext";
import { apiUrl } from "@/utils/api";
import { useRouter } from "next/navigation";
import { Candidato } from "@/utils/types/candidato.types";
import CustomModal from "@/components/modal";
import Unauthorized from "@/components/unauthorized";

export default function DataTable() {
  const { user } = useUserContext();

  const router = useRouter();
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [justificativa, setJustificativa] = useState("");
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const columns: GridColDef[] = [
    { field: "cpf", headerName: "CPF", width: 130 },
    { field: "nome", headerName: "Nome completo", width: 280, flex: 1 },
    {
      field: "unidade",
      headerName: "Unidade",
      width: 380,
      sortable: true,
      valueGetter: (params) => params.row.zona?.nome || "",
    },
    {
      field: "aprovado",
      headerName: "Análise de candidatura",
      width: 140,
      sortable: true,
    },
    {
      field: "acoes",
      headerName: "Ações",
      width: 190,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <IconButton
            color="primary"
            onClick={(event) => handleDetalhar(event, params.row._id)}
            title="Detalhar"
          >
            <VisibilityIcon />
          </IconButton>

          {/* <IconButton
            color="primary"
            onClick={(event) => handleEditar(event, params.row._id)}
            title="Inserir"
          >
            <AttachFileIcon />
          </IconButton> */}

          {/* <IconButton
            color="primary"
            onClick={(event) => handleDeletar(event, params.row._id)}
            title="Remover"
          >
            <DeleteIcon />
          </IconButton> */}

          {user.role?.includes("super-adm") && (
            <IconButton
              color={
                params.row.aprovado === "em analise"
                  ? "warning"
                  : params.row.aprovado === "Indeferida"
                  ? "error"
                  : params.row.aprovado === "Deferida"
                  ? "success"
                  : "primary"
              }
              onClick={(event) => handleValidar(event, params.row._id)}
              title="Analisar"
            >
              <CheckCircleIcon />
            </IconButton>
          )}

          {params.row.aprovado === "Indeferida" && (
            <IconButton
              color="warning"
              onClick={(event) => {
                handleDetalharIndeferimento(
                  event,
                  params.row.justificativa,
                  params.row.justificativa2,
                  "modal1"
                );
              }}
              title="Detalhar indeferimento"
            >
              <DetailsIcon />
            </IconButton>
          )}
          {params.row.aprovado === "Indeferida" && (
            <IconButton
              style={{ color: "#f74904" }}
              onClick={(event) => {
                handleDetalharIndeferimento(
                  event,
                  params.row.justificativa,
                  params.row.justificativa2,
                  "modal2"
                );
              }}
              title="Detalhar indeferimento 2"
            >
              <DetailsIcon />
            </IconButton>
          )}
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDetalharIndeferimento = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    justificativa: string,
    justificativa2: string,
    modalType: string
  ) => {
    let justificativaParaModal = "";
    if (modalType === "modal1") {
      justificativaParaModal = justificativa;
      openModal();
    } else if (modalType === "modal2") {
      justificativaParaModal = justificativa2;
    }
    console.log(justificativaParaModal);
    setJustificativa(justificativaParaModal);
    openModal();
  };

  useEffect(() => {
    //fetch
    const token = localStorage.getItem("token");
    if (user._id) {
      const getDadosCandidatos = async () => {
        const response = await fetch(
          `${apiUrl}/api/v1/candidato/lista/candidatos`,
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

  let contadorDeferidas = 0;
  let contadorIndeferidas = 0;

  for (const candidato of candidatos) {
    if (candidato.aprovado === "Deferida") {
      contadorDeferidas++;
    }
  }

  const candidatosFiltrados = candidatos.filter(
    (candidatos: Candidato) =>
      candidatos.nome !== "Branco" && candidatos.nome !== "Nulo"
  );

  for (const candidato of candidatos) {
    if (candidato.aprovado === "Indeferida") {
      contadorIndeferidas++;
    }
  }

  let contadorEmAnalise =
    candidatosFiltrados.length - contadorDeferidas - contadorIndeferidas;

  if (!user.role || !user.role.includes("super-adm")) return <Unauthorized />;
  return (
    <Box margin="24px">
      <Container>
        <Typography variant="h3" marginBottom="12x" textAlign="center">
          Lista de Candidatos
        </Typography>

        <Box
          display="flex"
          alignContent="space-evenly"
          gap="48px"
          justifyContent="center"
          marginTop="16px"
          marginBottom="8px"
        >
          <Typography variant="h6">
            Candidaturas em análise:{" "}
            <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
              {contadorEmAnalise}
            </span>
          </Typography>
          <Typography variant="h6">
            Candidaturas deferidas:{" "}
            <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
              {contadorDeferidas}
            </span>
          </Typography>
          <Typography variant="h6">
            Candidaturas indeferidas:{" "}
            <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
              {contadorIndeferidas}
            </span>
          </Typography>
        </Box>
        <div
          style={{
            height: "645px",
            width: "100%",
            background: "#fff",
          }}
        >
          <DataGrid
            getRowId={(row) => row._id}
            rows={candidatosFiltrados}
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
            title="Motivo do indeferimento:"
            description={justificativa}
            onClose={closeModal}
            yesButtonLabel="Ok"
            onYesButtonClick={closeModal}
          />
        </div>
      </Container>
    </Box>
  );
}
