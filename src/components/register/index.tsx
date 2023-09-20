"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import FormBuilder from "../form/FormBuilder";
import { registerDTOs } from "@/utils/dtos/registerDTOs";

export type Inputs = {
  cpf: string;
  nome: string;
  matricula: string;
  data: string;
  telefone: string;
  email: string;
  funcao: string;
  cargo: string;
  curso_gestor: string;
  data_entrada: string;
  data_inicio_docencia: string;
  obs_curso_gestor: string;
};

export default function Register() {
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return <FormBuilder onSubmit={onSubmit} formDTOs={registerDTOs} />;

  // return (
  //   <form style={{ marginTop: "20px" }} onSubmit={handleSubmit(onSubmit)}>
  //     <Grid container spacing={1}>
  //       <Grid item xs={3}>
  //         <CpfInput cpfDTO={cpfDTO} control={control} errors={errors} />
  //       </Grid>
  //       <Grid item xs={3}>
  //         <TextInput
  //           control={control}
  //           name="matricula"
  //           label="Matricula"
  //           errors={errors}
  //         />
  //       </Grid>
  //       <Grid item xs={3}>
  //         <TextInput
  //           control={control}
  //           name="nome"
  //           label="Nome"
  //           errors={errors}
  //         />
  //       </Grid>
  //       <Grid item xs={3}>
  //         <FoneInput
  //           control={control}
  //           name="telefone"
  //           label="Telefone"
  //           errors={errors}
  //         />
  //       </Grid>
  //       <Grid item xs={3}>
  //         <EmailInput
  //           control={control}
  //           name="email"
  //           label="Email"
  //           errors={errors}
  //         />
  //       </Grid>
  //       <Grid item xs={3}>
  //         <SelectInput
  //           control={control}
  //           name="funcao"
  //           label="Função"
  //           errors={errors}
  //         />
  //       </Grid>
  //       <Grid item xs={3}>
  //         <Button variant={"contained"} type="submit">
  //           enviar
  //         </Button>
  //       </Grid>
  //     </Grid>
  //   </form>
  // );
}
