import { apiUrl } from "@/utils/api";
import { Candidato } from "@/utils/types/candidato.types";
import { SetStateAction } from "react";

export const getDadosCandidato = async (
  id: string,
  token: string | null,
  setCandidato: (value: SetStateAction<Candidato>) => void
) => {
  await fetch(`${apiUrl}/api/v1/candidato/candidatoId/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const responseJson = await response.json();
      setCandidato(responseJson.candidato);
    })
    .catch((error) => {
      console.log(error);
    });
};
