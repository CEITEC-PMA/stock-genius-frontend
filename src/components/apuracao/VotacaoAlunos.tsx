"use client";
import { Candidato } from "@/utils/types/candidato.types";
import { NumerosVotacao } from "@/utils/types/numerosVotacao.type";
import { ResultadoFinalEleicao } from "@/utils/types/resultadoFinal.types";
import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Text,
  Tooltip,
} from "recharts";

export default function VotacaoAlunos(props: {
  candidatos: Candidato[];
  numerosVotacao: NumerosVotacao;
  resultadoEleicao: ResultadoFinalEleicao;
}) {
  const { candidatos } = props;
  const { numerosVotacao } = props;
  const { resultadoEleicao } = props;

  console.log(numerosVotacao);
  console.log(
    numerosVotacao.quantidadeAlunosVotantes - numerosVotacao.alunosVotaram
  );
  console.log(resultadoEleicao);

  const data01 = [
    {
      name: "Alunos que não votaram",
      value:
        numerosVotacao.quantidadeAlunosVotantes - numerosVotacao.alunosVotaram,
    },
    {
      name: "Alunos que já votaram",
      value: numerosVotacao.alunosVotaram,
    },
  ];

  const data02 = candidatos.map((candidato, i) => {
    const votosCandidato =
      (resultadoEleicao?.confirmaPercentual[i].qtdeVotosAlunos * 100) /
      numerosVotacao.alunosVotaram;

    const votosCandidatoArredondado = parseFloat(votosCandidato.toFixed(2));
    const nomeCandidato = resultadoEleicao?.confirmaPercentual[i].candidato;

    return {
      name: nomeCandidato,
      value: votosCandidatoArredondado,
    };
  });

  const colors = ["#F4DEB2", "#227487", "#4EA3B7", "#104A57", "#00A9B5"];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text x={0} y={15} width={300} textAnchor="middle">
            Total de Alunos Votantes
          </Text>
          <PieChart width={400} height={400}>
            <Pie
              data={data01}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data01.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
            <Tooltip formatter={(value, name, props) => [value, name]} />
          </PieChart>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text x={0} y={15} width={300} textAnchor="middle">
            Votos dos alunos (%)
          </Text>
          <PieChart width={400} height={400}>
            <Pie
              data={data02}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data02.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
            <Tooltip
              formatter={(value, name, props) => [
                `${Number(value).toFixed(2)}%`,
                name,
              ]}
            />
          </PieChart>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
