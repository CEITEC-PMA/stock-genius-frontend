"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import FormBuilder from "../form/FormBuilder";
import { userDTOs } from "@/utils/dtos/userDTOs";
import { apiUrl } from "@/utils/api";

export type UserInputs = {
  nome: string;
  username: string;
  password: string;
};

export default function UserRegister() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    console.log(data);
    const response = await fetch(`${apiUrl}/api/v1/usuarios/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
  };

  const formBuilderDTO = {
    formDTOs: userDTOs,
    onSubmit,
    control,
    handleSubmit,
    errors,
  };

  return <FormBuilder formBuilderDTO={formBuilderDTO} />;
}
