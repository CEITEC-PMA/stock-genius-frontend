export type ResultadoFinalEleicao = {
  confirmaQuorum: ConfirmaQuorum;
  confirmaPercentual: ConfirmaPercentual[];
  candidatoApto: boolean;
  candidatoEleito: string;
  percentualMaior: number;
  motivosIndeferimento: MotivosIndeferimento[];
};

export type ConfirmaPercentual = {
  qtdeVotosAlunos: QtdeVotos;
  qtdeVotosRespAlunosVotantes: QtdeVotos;
  qtdeVotosRespAlunosNaoVotantes: QtdeVotos;
  candidato: string;
  somaPaisAlunos: number;
  qtdeVotosFuncionarios: QtdeVotos;
  percentualTotal: number;
};

export type QtdeVotos = {
  numero_votos: number;
  nome_candidato: null | string;
};

export type ConfirmaQuorum = {
  quorumFunc: Quorum;
  quorumAlunos: Quorum;
  quorumPais: Quorum;
  quorunsNaoAtingidos: string[];
  resultGeral: boolean;
};

export type Quorum = {
  percentual: number;
  result: boolean;
};

export type MotivosIndeferimento = {
  tipo: string;
  motivos: string[];
};
