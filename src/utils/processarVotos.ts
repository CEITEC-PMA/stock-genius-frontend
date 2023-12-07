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
    const qtdeVotosRespAlunosVotantes = votosRespAlunosVotantes[candidato] || 0;
    const qtdeVotosRespAlunosNaoVotantes =
      votosRespAlunosNaoVotantes[candidato] || 0;
    const qtdeVotosAlunos = votosAlunos[candidato] || 0;
    const qtdeVotosFuncionarios = votosFuncionarios[candidato] || 0;

    const somaPaisAlunos =
      qtdeVotosRespAlunosNaoVotantes +
      qtdeVotosAlunos +
      qtdeVotosRespAlunosVotantes;


    const somaPaisAlunosFuncionarios = somaPaisAlunos + qtdeVotosFuncionarios

    const percentualAlunos = qtdeVotos.alunosVotaram > 0 ? ((qtdeVotosAlunos * 50) / qtdeVotos.quantidadeAlunosVotantes) : 0;

    const percentualRespAlunosNaoVotantes = qtdeVotos.quantidadeAlunosNaoVotantes > 0 ? ((qtdeVotosRespAlunosNaoVotantes * 50) / qtdeVotos.quantidadeAlunosNaoVotantes) : 0;
    console.log(percentualAlunos)

    const percentualRespAlunos =
      (somaPaisAlunos * 50) /
      (qtdeVotos.quantidadeAlunosNaoVotantes +
        qtdeVotos.quantidadeAlunosVotantes +
        qtdeVotos.quantidadeAlunosVotantes);

    const percentualFunc =
      (qtdeVotosFuncionarios * 50) / qtdeVotos.quantidadeFuncionarios;

    const percentualTotal = percentualRespAlunos + percentualFunc;

    return {
      qtdeVotosAlunos,
      qtdeVotosRespAlunosVotantes,
      qtdeVotosRespAlunosNaoVotantes,
      candidato,
      somaPaisAlunos,
      qtdeVotosFuncionarios,
      percentualAlunos,
      percentualTotal,
      percentualRespAlunosNaoVotantes,
      somaPaisAlunosFuncionarios,
      qtdeVotosRespAlunosVotantes,
      qtdeVotosRespAlunosNaoVotantes,
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
      if (percentual.percentualTotal > percentualMaior) {
        percentualMaior = percentual.percentualTotal;
        candidatoEleito = percentual.candidato;
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
