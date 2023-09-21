import { UserInputs } from "@/components/register/UserRegister";

export interface UserDTO {
  name: keyof UserInputs;
  label: string;
  input: string;
  rules?: {
    required: string;
    minLength?: {
      value: number;
      message: string;
    };
  };
}

const nomeDTO: UserDTO = {
  name: "nome",
  label: "Nome",
  input: "text",
  rules: {
    required: "Nome é obrigatório",
    minLength: { value: 10, message: "Escreva seu nome completo" },
  },
};

const usernameDTO: UserDTO = {
  name: "username",
  label: "Usuário",
  input: "cpf",
};

const passwordDTO: UserDTO = {
  name: "password",
  label: "Senha",
  input: "text",
  rules: {
    required: "Senha é obrigatório",
    minLength: { value: 10, message: "Escreva seu nome completo" },
  },
};

export const userDTOs = [nomeDTO, usernameDTO, passwordDTO];
