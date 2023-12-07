export interface resultadoVotosEleicaoTypes {
  alunosVotaram: number;
  funcionariosVotaram: number;
  quantidadeAlunosNaoVotantes: number;
  quantidadeAlunosVotantes: number;
  quantidadeFuncionarios: number;
  respAlunosNaoVotantesVotaram: number;
  respAlunosVotantesVotaram: number;
  votos: Votos;
}

export interface Votos {
  votosAlunos: VotosAlunosClass;
  votosFuncionarios: VotosAlunosClass;
  votosRespAlunosNaoVotantes: VotosAlunosClass;
  votosRespAlunosVotantes: VotosAlunosClass;
}

export interface VotosAlunosClass {
  branco: number;
  candidato_dois: number;
  candidato_um: number;
  nulo: number;
}
