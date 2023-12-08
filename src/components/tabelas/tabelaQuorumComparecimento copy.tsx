import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { votosPorCandidatos } from "@/utils/types/votosPorCandidatos.types";

interface ITabelaQuorumComparecimento {
  // diretores: string[]
  // somaVotosAlunosPorCandidato: votosPorCandidatos[]
  totalVotos: votosPorCandidatos[];
  qtdFuncionarosCompareceram: number;
  qtdFuncionariosConstantes: number;
  qtdRespAlunosVotantesCompareceram: number;
  qtdRespAlunosVotantesConstantes: number;
  qtdRespAlunosNaoVotantesConstantes: number;
  qtdRespAlunosNaoVotantesCompareceram: number;
  qtdAlunosCompareceram: number;
  qtdAlunosConstantes: number;
}
export default function TabelaQuorumComparecimento({
  totalVotos,
  qtdAlunosConstantes,
  qtdAlunosCompareceram,
  qtdRespAlunosNaoVotantesConstantes,
  qtdRespAlunosNaoVotantesCompareceram,
  qtdRespAlunosVotantesConstantes,
  qtdRespAlunosVotantesCompareceram,
  qtdFuncionariosConstantes,
  qtdFuncionarosCompareceram,
}: ITabelaQuorumComparecimento) {
  console.log(totalVotos);

  return (
    <Table sx={{ border: "1px solid black" }}>
      <TableHead>
        <TableRow>
          <TableCell
            colSpan={2}
            sx={{
              border: "1px solid black",
              width: "25%",
              textAlign: "center",
            }}
          >
            <Typography>Alunos Votantes -50%</Typography>{" "}
          </TableCell>
          <TableCell
            colSpan={2}
            sx={{
              border: "1px solid black",
              width: "25%",
              textAlign: "center",
            }}
          >
            <Typography>Pais/Responsáveis - Alunos Não Votantes 20%</Typography>{" "}
          </TableCell>
          <TableCell
            colSpan={2}
            sx={{
              border: "1px solid black",
              width: "25%",
              textAlign: "center",
            }}
          >
            <Typography>Pais/Responsáveis - Alunos Votantes</Typography>{" "}
          </TableCell>
          <TableCell
            colSpan={2}
            sx={{
              border: "1px solid black",
              width: "25%",
              textAlign: "center",
            }}
          >
            <Typography>
              Professores e Servidores Administrativos 50%
            </Typography>{" "}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>QtdAlunos Votantes</Typography>{" "}
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>Percentual</Typography>{" "}
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>QtdPais/Responsáveis (AVN)</Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>Percentual</Typography>{" "}
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>QtdPais/Responsáveis (AV)</Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>Percentual</Typography>{" "}
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>Qtd (PSA)</Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>Percentual</Typography>{" "}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>{qtdAlunosConstantes}</Typography>{" "}
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>
              {qtdAlunosConstantes === 0
                ? 0
                : (qtdAlunosCompareceram / qtdAlunosConstantes) * 100}{" "}
              %
            </Typography>{" "}
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography> {qtdRespAlunosNaoVotantesConstantes}</Typography>{" "}
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>
              {Math.round(
                (qtdRespAlunosNaoVotantesCompareceram /
                  qtdRespAlunosNaoVotantesConstantes) *
                  100
              )}{" "}
              %{" "}
            </Typography>{" "}
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>{qtdRespAlunosVotantesConstantes}</Typography>{" "}
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>
              {qtdAlunosConstantes === 0
                ? 0
                : (qtdAlunosCompareceram / qtdAlunosConstantes) * 100}{" "}
              %
            </Typography>{" "}
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography> </Typography> {qtdFuncionariosConstantes}{" "}
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>
              {" "}
              {Math.round(
                (qtdFuncionarosCompareceram / qtdFuncionariosConstantes) * 100
              )}{" "}
              %{" "}
            </Typography>{" "}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
