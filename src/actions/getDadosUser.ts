import { apiUrl } from "@/utils/api";

export const getDadosUser = async (token: string) => {
  const response = await fetch(`${apiUrl}/api/v1/usuarios/registrar`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
