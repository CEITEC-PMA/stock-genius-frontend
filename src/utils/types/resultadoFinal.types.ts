export type ResultadoFinalEleicao = {
  confirmaQuorum: ConfirmaQuorum;
  confirmaPercentual: ConfirmaPercentual[];
  candidatoApto: boolean;
  candidatoEleito: string;
  percentualMaior: number;
  motivosIndeferimento: MotivosIndeferimento[];
};

export type ConfirmaPercentual = {
  qtdeVotosAlunos: number;
  qtdeVotosRespAlunosVotantes: number;
  qtdeVotosRespAlunosNaoVotantes: number;
  candidato: string;
  somaPaisAlunos: number;
  qtdeVotosFuncionarios: number;
  percentualTotal: number;
};

export type ConfirmaQuorum = {
  quorumFunc: Quorum;
  quorumAlunos: Quorum;
  quorumPais: Quorum;
  quorunsNaoAtingidos: string[];
  resultGeral: boolean;
};

export type Quorum = {
  percentual: number | null;
  result: boolean;
};

export type MotivosIndeferimento = {
  tipo: string;
  motivos: string[];
};
