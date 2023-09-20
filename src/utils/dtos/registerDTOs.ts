import { Inputs } from "@/components/register";

interface SelectField {
  value: string | boolean;
  label: string;
}

export interface RegisterDTO {
  name: keyof Inputs;
  label: string;
  input: string;
  rules?: {
    required: string;
    minLength?: {
      value: number;
      message: string;
    };
  };
  selectFields?: SelectField[];
}

const nomeDTO: RegisterDTO = {
  name: "nome",
  label: "Nome",
  input: "text",
  rules: {
    required: "Nome é obrigatório",
    minLength: { value: 10, message: "Escreva seu nome completo" },
  },
};

const matriculaDTO: RegisterDTO = {
  name: "matricula",
  label: "Matrícula",
  input: "text",
  rules: {
    required: "Matrícula é obrigatório",
  },
};

const telefoneDTO: RegisterDTO = {
  name: "telefone",
  label: "Telefone",
  input: "fone",
  rules: {
    required: "Telefone é obrigatório",
  },
};

const emailDTO: RegisterDTO = {
  name: "email",
  label: "Email",
  input: "email",
};

const funcaoDTO: RegisterDTO = {
  name: "funcao",
  label: "Função",
  input: "select",
  selectFields: [
    {
      value: "professor",
      label: "Professor",
    },
    {
      value: "diretor",
      label: "Diretor",
    },
    {
      value: "coordenador_pedagogico",
      label: "Coordenador Pedagógico",
    },
    {
      value: "coordenador_geral",
      label: "Coordenador Geral",
    },
    {
      value: "coordenador_tecnico",
      label: "Coordenador Técnico",
    },
  ],
};

const cargoDTO: RegisterDTO = {
  name: "cargo",
  label: "Cargo",
  input: "text",
  rules: { required: "Cargo é obrigatório" },
};

const cursoGestorDTO: RegisterDTO = {
  name: "curso_gestor",
  label: "Curso de Gestor",
  input: "select",
  rules: { required: "Campo Obrigatório" },
  selectFields: [
    {
      value: true,
      label: "Sim",
    },
    {
      value: false,
      label: "Não",
    },
  ],
};

const obsCursoGestor: RegisterDTO = {
  name: "obs_curso_gestor",
  label: "Observação Curso Gestor",
  input: "text",
};

const dataEntrada: RegisterDTO = {
  name: "data_entrada",
  label: "Data de Entrada",
  input: "data",
  rules: { required: "Data de Entra é Obrigatório" },
};

const dataInicioDocencia: RegisterDTO = {
  name: "data_inicio_docencia",
  label: "Data Inicio Docencia",
  input: "data",
  rules: { required: "Data de Inicio Docencia é Obrigatorio" },
};

export const registerDTOs = [
  nomeDTO,
  matriculaDTO,
  cargoDTO,
  telefoneDTO,
  dataInicioDocencia,
  dataEntrada,
  cursoGestorDTO,
  funcaoDTO,
];
