import { colors } from "@/utils/colors";
import { Candidato } from "@/utils/types/candidato.types";
import { NumerosVotacao } from "@/utils/types/numerosVotacao.type";
import { ResultadoFinalEleicao } from "@/utils/types/resultadoFinal.types";
import { Typography } from "@mui/material";
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

type MotivoRenderizado = {
  tipo: string;
  motivos: string[];
};

export default function VotacaoFinal(props: {
  candidatos: Candidato[];
  numerosVotacao: NumerosVotacao;
  resultadoEleicao: ResultadoFinalEleicao;
}) {
  const { candidatos } = props;
  const { numerosVotacao } = props;
  const { resultadoEleicao } = props;

  const data01 = candidatos.map((candidato, i) => {
    const votosCandidato =
      resultadoEleicao?.confirmaPercentual[i].percentualTotal;

    const votosCandidatoArredondado = parseFloat(votosCandidato.toFixed(2));
    const nomeCandidato =
      resultadoEleicao?.confirmaPercentual[i].qtdeVotosFuncionarios
        .nome_candidato;

    return {
      name: nomeCandidato,
      value: votosCandidatoArredondado,
    };
  });

  let motivosRenderizados: MotivoRenderizado[] = [];

  if (
    resultadoEleicao.hasOwnProperty("motivosIndeferimento") &&
    Array.isArray(resultadoEleicao.motivosIndeferimento) &&
    resultadoEleicao.motivosIndeferimento.length > 0
  ) {
    motivosRenderizados = resultadoEleicao.motivosIndeferimento.map(
      (motivo) => {
        const tipo = motivo.tipo;
        const motivos = motivo.motivos;

        return {
          tipo,
          motivos,
        };
      }
    );
  }
  const confirmaPercentual = resultadoEleicao.confirmaPercentual;

  const percentuais = confirmaPercentual.map((item) => item.percentualTotal);

  const somaPercentuais = percentuais.reduce(
    (acumulador, valor) => acumulador + valor,
    0
  );

  const valorAbstinencia = 100 - somaPercentuais;
  const valorAbstinenciaArredondado = parseFloat(valorAbstinencia.toFixed(2));

  const votosAbstinencia = {
    name: "Votos abstinentes",
    value: valorAbstinenciaArredondado,
  };

  const data01ComAbstinencia = [...data01, votosAbstinencia];

  const votosValidos = confirmaPercentual.filter(
    (candidatos) =>
      candidatos.candidato !== "branco" && candidatos.candidato !== "nulo"
  );

  const votosValidosCandidatos = votosValidos.map((item) => {
    const percentualTotal = item.percentualTotal;
    const nome_candidato = item.qtdeVotosFuncionarios.nome_candidato;
    return { nome_candidato, percentualTotal };
  });

  const arrayVotosValidos = [...votosValidosCandidatos];

  const somaVotosValidos = arrayVotosValidos.reduce(
    (soma, voto) => soma + voto.percentualTotal,
    0
  );

  const arrayVotosValidosFinal = arrayVotosValidos.map((item) => {
    const name = item.nome_candidato;
    const percentual = (item.percentualTotal * 100) / somaVotosValidos;
    const value = parseFloat(percentual.toFixed(2));

    return {
      name,
      value,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignContent: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            justifyItems: "center",
            alignItems: "center",
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
              Total geral de votos (%)
            </Text>
            <PieChart width={340} height={340}>
              <Pie
                data={data01ComAbstinencia}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {data01ComAbstinencia.map((entry, index) => (
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text x={0} y={15} width={300} textAnchor="middle">
              Total de votos válidos (%)
            </Text>
            <PieChart width={340} height={340}>
              <Pie
                data={arrayVotosValidosFinal}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {arrayVotosValidosFinal.map((entry, index) => (
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
        <div style={{ marginTop: "35px" }}>
          {resultadoEleicao.candidatoApto && (
            <Typography>
              Com {resultadoEleicao.percentualMaior.toFixed(2)}% dos votos e ,
              o/a candidato(a) vencedor foi {resultadoEleicao.candidatoEleito}!
            </Typography>
          )}
          {!resultadoEleicao.candidatoApto && (
            <Typography>
              A eleição não teve um candidato apto a vencê-la. Estes foram os
              motivos:{" "}
              {motivosRenderizados.map((motivo, index) => (
                <React.Fragment key={index}>
                  <span>{motivo.tipo}: </span>
                  <span>{motivo.motivos.join(", ")}</span>
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          )}
        </div>
      </div>
    </ResponsiveContainer>
  );
}
