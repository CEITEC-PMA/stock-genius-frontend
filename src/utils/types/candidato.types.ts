export interface Candidato {
  curso_gestor: string;
  foto: string[];
  docs: { [key: string]: Doc };
  deletado: boolean;
  _id: string;
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  funcao: string;
  matricula: string;
  data_entrada_inst: string;
  data_entrada_docencia: string;
  tempo_modulacao: string;
  tempo_docencia: string;
  protocolo: string;
  zona: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Doc {
  file: string;
  original_file: string;
}
