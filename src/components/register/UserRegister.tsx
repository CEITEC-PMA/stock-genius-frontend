"use client";
import { SubmitHandler } from "react-hook-form";
import FormBuilder from "../form/FormBuilder";
import { userDTOs } from "@/utils/dtos/userDTOs";

export type UserInputs = {
  nome: string;
  username: string;
  password: string;
};

export default function UserRegister() {
  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    console.log(data);
    const response = await fetch(
      "http://192.168.1.124:3002/api/v1/usuarios/registrar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(response);
  };

  return <FormBuilder onSubmit={onSubmit} formDTOs={userDTOs} />;
}
