import { NumerosVotacao } from "./types/numerosVotacao.type";

const passouQuorum = (qtdeVotos: NumerosVotacao) => {
  const {
    quantidadeFuncionarios,
    funcionariosVotaram,
    alunosVotaram,
    quantidadeAlunosVotantes,
    respAlunosNaoVotantesVotaram,
    quantidadeAlunosNaoVotantes,
  } = qtdeVotos;
  const percentualFunc = (funcionariosVotaram / quantidadeFuncionarios) * 100;
  const percentualAlunos = (alunosVotaram / quantidadeAlunosVotantes) * 100;
  const percentualPais =
    (respAlunosNaoVotantesVotaram / quantidadeAlunosNaoVotantes) * 100;

  const quorumFunc = {
    percentual: percentualFunc,
    result: percentualFunc < 50 ? false : true,
  };
  const quorumAlunos = {
    percentual: percentualAlunos,
    result: percentualAlunos < 50 ? false : true,
  };

  const quorumPais = {
    percentual: percentualPais,
    result: percentualPais < 20 ? false : true,
  };

  let resultGeral = true;
  const quorunsNaoAtingidos = [];

  if (!quorumFunc.result) {
    resultGeral = false;
    quorunsNaoAtingidos.push("Quórum de funcionários não atingido");
  }
  if (!quorumAlunos.result) {
    resultGeral = false;
    quorunsNaoAtingidos.push("Quórum de alunos não atingido");
  }
  if (!quorumPais.result) {
    resultGeral = false;
    quorunsNaoAtingidos.push("Quórum de pais/responsáveis não atingido");
  }

  return {
    quorumFunc,
    quorumAlunos,
    quorumPais,
    quorunsNaoAtingidos,
    resultGeral,
  };
};

const percentualVotos = (qtdeVotos: NumerosVotacao) => {
  const { votos } = qtdeVotos;
  const {
    votosRespAlunosVotantes,
    votosRespAlunosNaoVotantes,
    votosAlunos,
    votosFuncionarios,
  } = votos;

  const arrayDeCandidatos = Object.keys(votosAlunos);

  //console.log(arrayDeCandidatos)

  const qtdeVotosCandidato = arrayDeCandidatos.map((candidato) => {
    const qtdeVotosRespAlunosVotantes = votosRespAlunosVotantes[candidato] || {
      numero_votos: 0,
      nome_candidato: null,
    };
    const qtdeVotosRespAlunosVotantesNumeric = qtdeVotosRespAlunosVotantes as {
      numero_votos: number;
      nome_candidato: string | null;
    };

    const qtdeVotosRespAlunosNaoVotantes = votosRespAlunosNaoVotantes[
      candidato
    ] || { numero_votos: 0, nome_candidato: null };
    const qtdeVotosRespAlunosNaoVotantesNumeric =
      qtdeVotosRespAlunosNaoVotantes as {
        numero_votos: number;
        nome_candidato: string | null;
      };

    const qtdeVotosAlunos = votosAlunos[candidato] || {
      numero_votos: 0,
      nome_candidato: null,
    };
    const qtdeVotosAlunosNumeric = qtdeVotosAlunos as {
      numero_votos: number;
      nome_candidato: string | null;
    };

    const qtdeVotosFuncionarios = votosFuncionarios[candidato] || {
      numero_votos: 0,
      nome_candidato: null,
    };
    const qtdeVotosFuncionariosNumeric = qtdeVotosFuncionarios as {
      numero_votos: number;
      nome_candidato: string | null;
    };

    const somaPaisAlunos =
      qtdeVotosRespAlunosNaoVotantesNumeric.numero_votos +
      qtdeVotosAlunosNumeric.numero_votos +
      qtdeVotosRespAlunosVotantesNumeric.numero_votos;

    const percentualRespAlunos =
      (somaPaisAlunos * 50) /
      (qtdeVotos.quantidadeAlunosNaoVotantes +
        qtdeVotos.quantidadeAlunosVotantes * 2);

    const percentualFunc =
      (qtdeVotosFuncionariosNumeric.numero_votos * 50) /
      qtdeVotos.quantidadeFuncionarios;

    const percentualTotal = percentualRespAlunos + percentualFunc;

    return {
      qtdeVotosAlunos,
      qtdeVotosRespAlunosVotantes,
      qtdeVotosRespAlunosNaoVotantes,
      candidato,
      somaPaisAlunos,
      qtdeVotosFuncionarios,
      percentualTotal,
      nome_candidato: qtdeVotosAlunosNumeric.nome_candidato,
      numero_votos: qtdeVotosAlunosNumeric.numero_votos,
    };
  });
  return qtdeVotosCandidato;
};

export const resultadoFinal = (qtdeVotos: NumerosVotacao) => {
  const confirmaQuorum = passouQuorum(qtdeVotos);
  const confirmaPercentual = percentualVotos(qtdeVotos);

  let candidatoApto = true;
  let candidatoEleito = "";
  const motivosIndeferimento = [];

  const candidatosDisputando = confirmaPercentual.filter(
    (percentual) =>
      percentual.candidato !== "branco" && percentual.candidato !== "nulo"
  );

  const initialValue = 0;
  const somaPercentualCandidatos = candidatosDisputando.reduce(
    (accumulator, currentValue) =>
      accumulator + (currentValue.percentualTotal || 0),
    initialValue
  );

  if (somaPercentualCandidatos <= 50) {
    candidatoApto = false;
    motivosIndeferimento.push({
      tipo: "Percentual",
      motivos: ["Percentual mínimo não atingido"],
    });
  }

  if (!confirmaQuorum.resultGeral) {
    candidatoApto = false;
    motivosIndeferimento.push({
      tipo: "Quórum",
      motivos: confirmaQuorum.quorunsNaoAtingidos,
    });
  }
  let percentualMaior = 0;

  if (confirmaQuorum.resultGeral && somaPercentualCandidatos > 50) {
    confirmaPercentual.forEach((percentual) => {
      if (
        percentual.percentualTotal > percentualMaior &&
        percentual.qtdeVotosFuncionarios.nome_candidato !== null
      ) {
        percentualMaior = percentual.percentualTotal;
        candidatoEleito = percentual.qtdeVotosFuncionarios.nome_candidato;
      }
    });
  }
  return {
    confirmaQuorum,
    confirmaPercentual,
    candidatoApto,
    candidatoEleito,
    percentualMaior,
    motivosIndeferimento,
  };
};
