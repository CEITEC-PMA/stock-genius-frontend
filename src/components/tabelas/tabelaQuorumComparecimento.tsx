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
import { DadosQuorum } from "@/utils/types/dadosQuorum.types";

interface ITabelaQuorumComparecimento {
  qtdFuncionarosCompareceram: number;
  qtdFuncionariosConstantes: number;
  qtdRespAlunosVotantesCompareceram: number;
  qtdRespAlunosVotantesConstantes: number;
  qtdRespAlunosNaoVotantesConstantes: number;
  qtdRespAlunosNaoVotantesCompareceram: number;
  qtdAlunosCompareceram: number;
  qtdAlunosConstantes: number;
  dadosQuorum: DadosQuorum[];
}
export default function TabelaQuorumComparecimento({
  dadosQuorum,
  qtdAlunosConstantes,
  qtdAlunosCompareceram,
  qtdRespAlunosNaoVotantesConstantes,
  qtdRespAlunosNaoVotantesCompareceram,
  qtdRespAlunosVotantesConstantes,
  qtdRespAlunosVotantesCompareceram,
  qtdFuncionariosConstantes,
  qtdFuncionarosCompareceram,
}: ITabelaQuorumComparecimento) {
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
            <Typography>Alunos Votantes - 50%</Typography>{" "}
          </TableCell>
          <TableCell
            colSpan={2}
            sx={{
              border: "1px solid black",
              width: "25%",
              textAlign: "center",
            }}
          >
            <Typography>Pais/Responsaveis - Alunos Não Votantes 20%</Typography>{" "}
          </TableCell>
          <TableCell
            colSpan={2}
            sx={{
              border: "1px solid black",
              width: "25%",
              textAlign: "center",
            }}
          >
            <Typography>Pais/Responsaveis - Alunos Votantes</Typography>{" "}
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
            <Typography>QtdPais/Responsaveis (ANV)</Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>Percentual</Typography>{" "}
          </TableCell>
          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>QtdPais/Responsaveis (AV)</Typography>
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
            <Typography>
              {qtdAlunosCompareceram} de {qtdAlunosConstantes}
            </Typography>{" "}
          </TableCell>
          <TableCell
            sx={{
              border: "1px solid black",
              textAlign: "center",
              bgcolor:
                (qtdAlunosCompareceram / qtdAlunosConstantes) * 100 < 50
                  ? "red"
                  : "white",
              color:
                (qtdAlunosCompareceram / qtdAlunosConstantes) * 100 < 50
                  ? "white"
                  : "black",
            }}
          >
            <Typography>
              {qtdAlunosConstantes
                ? ((qtdAlunosCompareceram / qtdAlunosConstantes) * 100).toFixed(
                  2
                )
                : 0}
              %
            </Typography>
          </TableCell>

          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>

              {qtdRespAlunosNaoVotantesCompareceram} de
              {qtdRespAlunosNaoVotantesConstantes}
            </Typography>
          </TableCell>
          <TableCell
            sx={{
              border: "1px solid black",
              textAlign: "center",
              bgcolor:
                (qtdRespAlunosNaoVotantesCompareceram /
                  qtdRespAlunosNaoVotantesConstantes) *
                  100 <
                  20
                  ? "red"
                  : "white",
              color:
                (qtdRespAlunosNaoVotantesCompareceram /
                  qtdRespAlunosNaoVotantesConstantes) *
                  100 <
                  20
                  ? "white"
                  : "black",
            }}
          >
            <Typography>
              {qtdRespAlunosNaoVotantesConstantes
                ? (
                  (qtdRespAlunosNaoVotantesCompareceram /
                    qtdRespAlunosNaoVotantesConstantes) *
                  100
                ).toFixed(2)
                : 0}
              %
            </Typography>
          </TableCell>

          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography>
              {qtdRespAlunosVotantesCompareceram} de
              {qtdRespAlunosVotantesConstantes}
            </Typography>
          </TableCell>
          <TableCell
            sx={{
              border: "1px solid black",
              textAlign: "center",

            }}
          >
            <Typography>
              {qtdRespAlunosVotantesConstantes
                ? (
                  (qtdRespAlunosVotantesCompareceram /
                    qtdRespAlunosVotantesConstantes) *
                  100
                ).toFixed(2)
                : 0}
              %
            </Typography>
          </TableCell>

          <TableCell sx={{ border: "1px solid black", textAlign: "center" }}>
            <Typography> </Typography> {qtdFuncionarosCompareceram} de{" "}
            {qtdFuncionariosConstantes}
          </TableCell>
          <TableCell
            sx={{
              border: "1px solid black",
              textAlign: "center",
              bgcolor:
                (qtdFuncionarosCompareceram / qtdFuncionariosConstantes) * 100 <
                  50
                  ? "red"
                  : "white",
              color:
                (qtdFuncionarosCompareceram / qtdFuncionariosConstantes) * 100 <
                  50
                  ? "white"
                  : "black",
            }}
          >
            <Typography>
              {qtdFuncionariosConstantes ? ((qtdFuncionarosCompareceram / qtdFuncionariosConstantes) * 100).toFixed(2) : 0}  %
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
