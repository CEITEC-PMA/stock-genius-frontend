export interface NumerosVotacao {
  quantidadeAlunosVotantes: number;
  quantidadeAlunosNaoVotantes: number;
  quantidadeFuncionarios: number;
  alunosVotaram: number;
  funcionariosVotaram: number;
  respAlunosVotantesVotaram: number;
  respAlunosNaoVotantesVotaram: number;
  votos: Votos;
}
export interface Votos {
  votosRespAlunosVotantes: VotosAlunosClass;
  votosRespAlunosNaoVotantes: VotosAlunosClass;
  votosAlunos: VotosAlunosClass;
  votosFuncionarios: VotosAlunosClass;
}
export interface VotosAlunosClass {
  candidato_um: {
    numero_votos: number;
    nome_candidato: string | null;
  };
  candidato_dois?: {
    numero_votos: number;
    nome_candidato: string | null;
  };
  branco: {
    numero_votos: number;
    nome_candidato: string | null;
  };
  nulo: {
    numero_votos: number;
    nome_candidato: string | null;
  };
  [key: string]:
    | {
        numero_votos: number;
        nome_candidato: string | null;
      }
    | undefined;
}
