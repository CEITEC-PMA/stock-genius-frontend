"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import FormBuilder from "../form/FormBuilder";
import { registerDTOs } from "@/utils/dtos/registerDTOs";

export type CandidatoInputs = {
  cpf: string;
  nome: string;
  matricula: string;
  data: string;
  telefone: string;
  email: string;
  funcao: string;
  cargo: string;
  curso_gestor: string;
  data_entrada_inst: string;
  data_entrada_docencia: string;
  obs_curso_gestor: string;
};

export default function CandidatoRegister() {
  const onSubmit: SubmitHandler<CandidatoInputs> = async (data) => {
    console.log(data);
    const response = await fetch(
      "http://192.168.1.124:3002/api/v1/candidato/",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    console.log(response);
  };

  return <FormBuilder onSubmit={onSubmit} formDTOs={registerDTOs} />;
}
