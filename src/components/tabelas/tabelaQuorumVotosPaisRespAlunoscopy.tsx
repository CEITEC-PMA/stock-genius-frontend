import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { resultadoVotosEleicaoTypes } from "@/utils/types/resultadoVotosEleicaoTypes";
import { votosPorCandidatos } from "@/utils/types/votosPorCandidatos.types";
import { lutimes } from "fs";
import { Candidato } from "@/utils/types/candidato.types";
import { DadosQuorum } from "@/utils/types/dadosQuorum.types";

interface ITAbelaQuorumVotosPaisRespAlunos {
  dadosQuorum: DadosQuorum[];
}

export default function TabelaQuorumVotosPaisRespAlunosCopy({
  dadosQuorum,
}: ITAbelaQuorumVotosPaisRespAlunos) {
  const qtdAlunosResponsaveis = dadosQuorum?.map((quorum) => {
    return quorum.totalVotosAlunosResponsaveis;
  });
  const somaQtdAlunosResponsaveis = qtdAlunosResponsaveis?.reduce(
    (acumulator, value) => acumulator + value,
    0
  );
  return (
    <Box display="flex">
      <Box flex={1}>
        <Table sx={{ border: "1px solid black" }}>
          <TableHead>
            <TableRow sx={{ height: "85px" }}>
              <TableCell
                sx={{
                  border: "1px solid black",
                  width: "20%",
                  textAlign: "center",
                }}
              >
                <Typography>Diretor</Typography>{" "}
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                  width: "20%",
                  textAlign: "center",
                }}
              >
                <Typography>Votos de Alunos</Typography>{" "}
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                  width: "20%",
                  textAlign: "center",
                }}
              >
                <Typography>Votos responsáveis por alunos votantes</Typography>{" "}
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                  width: "20%",
                  textAlign: "center",
                }}
              >
                <Typography>
                  Votos responsáveis por alunos não votantes
                </Typography>{" "}
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                  width: "20%",
                  textAlign: "center",
                }}
              >
                <Typography>Total Votos</Typography>{" "}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dadosQuorum?.map((dados, i) => (
              <TableRow key={i}>
                <TableCell
                  sx={{
                    border: "1px solid black",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  <Typography>{dados.nome}</Typography>
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid black",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  {dados.votosAlunos}
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid black",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  {dados.votosResponsaveisVotantes}
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid black",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  {dados.votosResponsaveisNaoVotantes}
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid black",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  {dados.totalVotosAlunosResponsaveis}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell
                colSpan={5}
                sx={{ border: "1px solid black", textAlign: "center" }}
              >
                <Typography>
                  TOTAL VOTOS VÁLIDOS SEGMENTO PAIS / RESPONSÁVEIS E ALUNOS:{" "}
                  {somaQtdAlunosResponsaveis}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
