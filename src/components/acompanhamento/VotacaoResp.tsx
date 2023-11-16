"use client";
import { resultadoVoto } from "@/utils/resultado.eleicao.mock";
import { Candidato } from "@/utils/types/candidato.types";
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

export default function VotacaoResp(props: { candidatos: Candidato[] }) {
  const { candidatos } = props;

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (user._id) {
  //     const getDados = async () => {
  //       const response = await fetch(`${apiUrl}/api/v1/funcionario`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const responseJson = await response.json();
  //       setFuncionarios(responseJson.funcionarios);
  //       return response;
  //     };
  //     getDados();
  //   }
  // }, [setFuncionarios, user._id]);
  // console.log(funcionarios);
  // const funcionariosTotais = funcionarios.length;
  // const qtdeFuncJaVotaram = funcionarios.filter(
  //   (funcionario) => !!funcionario.votou
  // ).length;

  // const data01 = [
  //   { name: "Funcionários totais", value: funcionariosTotais },
  //   { name: "Funcionários que já votaram", value: qtdeFuncJaVotaram },
  // ];

  const data01 = [
    {
      name: "Alunos que não votaram",
      value:
        resultadoVoto.quantidadeAlunosVotantes - resultadoVoto.alunosVotaram,
    },
    {
      name: "Alunos que já votaram",
      value: resultadoVoto.alunosVotaram,
    },
  ];

  const data02 = [
    {
      name: `${candidatos[0]?.nome}`,
      value: parseFloat(
        (
          (resultadoVoto.votos.votosAlunos.candidato_um * 100) /
          resultadoVoto.alunosVotaram
        ).toFixed(2)
      ),
    },
    {
      name: `${candidatos[1]?.nome}`,
      value: parseFloat(
        (
          (resultadoVoto.votos.votosAlunos.candidato_dois * 100) /
          resultadoVoto.alunosVotaram
        ).toFixed(2)
      ),
    },
    {
      name: `${candidatos[2]?.nome}`,
      value: parseFloat(
        (
          (resultadoVoto.votos.votosAlunos.branco * 100) /
          resultadoVoto.alunosVotaram
        ).toFixed(2)
      ),
    },
    {
      name: `${candidatos[3]?.nome}`,
      value: parseFloat(
        (
          (resultadoVoto.votos.votosAlunos.nulo * 100) /
          resultadoVoto.alunosVotaram
        ).toFixed(2)
      ),
    },
  ];

  const data03 = [
    {
      name: "Pais de alunos-não-votantes que não votaram",
      value:
        resultadoVoto.quantidadeAlunosVotantes -
        resultadoVoto.respAlunosVotantesVotaram,
    },
    {
      name: "Pais de alunos-não-votantes que já votaram",
      value: resultadoVoto.respAlunosVotantesVotaram,
    },
  ];

  const data04 = [
    {
      name: `${candidatos[0]?.nome}`,
      value: parseFloat(
        (
          (resultadoVoto.votos.votosRespAlunosVotantes.candidato_um * 100) /
          resultadoVoto.respAlunosVotantesVotaram
        ).toFixed(2)
      ),
    },
    {
      name: `${candidatos[1]?.nome}`,
      value: parseFloat(
        (
          (resultadoVoto.votos.votosRespAlunosVotantes.candidato_dois * 100) /
          resultadoVoto.respAlunosVotantesVotaram
        ).toFixed(2)
      ),
    },
    {
      name: `${candidatos[2]?.nome}`,
      value: parseFloat(
        (
          (resultadoVoto.votos.votosRespAlunosVotantes.branco * 100) /
          resultadoVoto.respAlunosVotantesVotaram
        ).toFixed(2)
      ),
    },
    {
      name: `${candidatos[3]?.nome}`,
      value: parseFloat(
        (
          (resultadoVoto.votos.votosRespAlunosVotantes.nulo * 100) /
          resultadoVoto.respAlunosVotantesVotaram
        ).toFixed(2)
      ),
    },
  ];

  const colors = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"];
  const colors2 = ["#F4DEB2", "#227487", "#4EA3B7", "#104A57", "#00A9B5"];

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
            Total de pais de alunos votantes
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
            Total de pais de alunos-não-votantes
          </Text>
          <PieChart width={400} height={400}>
            <Pie
              data={data03}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data03.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors2[index % colors2.length]}
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
            Votos dos pais de alunos votantes (%)
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text x={0} y={15} width={300} textAnchor="middle">
            Votos dos pais de alunos-não-votantes (%)
          </Text>
          <PieChart width={400} height={400}>
            <Pie
              data={data04}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data04.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors2[index % colors2.length]}
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
