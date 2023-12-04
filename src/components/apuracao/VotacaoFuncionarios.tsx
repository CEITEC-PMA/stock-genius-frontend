"use client";
import { apiUrl } from "@/utils/api";
import { colors, colors1 } from "@/utils/colors";
import { Candidato } from "@/utils/types/candidato.types";
import { NumerosVotacao } from "@/utils/types/numerosVotacao.type";
import { ResultadoFinalEleicao } from "@/utils/types/resultadoFinal.types";
import React, { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Text,
  Tooltip,
} from "recharts";

export default function VotacaoFuncionarios(props: {
  candidatos: Candidato[];
  numerosVotacao: NumerosVotacao;
  resultadoEleicao: ResultadoFinalEleicao;
}) {
  const { candidatos } = props;
  const { numerosVotacao } = props;
  const { resultadoEleicao } = props;

  const data01 = [
    {
      name: "Funcionários que não votaram",
      value:
        numerosVotacao.quantidadeFuncionarios -
        numerosVotacao.funcionariosVotaram,
    },
    {
      name: "Funcionários que já votaram",
      value: numerosVotacao.funcionariosVotaram,
    },
  ];

  const data02 = candidatos.map((candidato, i) => {
    const votosCandidato =
      (resultadoEleicao?.confirmaPercentual[i].qtdeVotosFuncionarios * 100) /
      numerosVotacao.funcionariosVotaram;

    const votosCandidatoArredondado = parseFloat(votosCandidato.toFixed(2));
    const nomeCandidato = resultadoEleicao?.confirmaPercentual[i].candidato;

    return {
      name: nomeCandidato,
      value: votosCandidatoArredondado,
    };
  });

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
            Total de Funcionários
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
                  fill={colors1[index % colors.length]}
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
            Votos dos funcionários (%)
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
