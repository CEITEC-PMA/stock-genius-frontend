export const analiseCandidaturaDTO = {
  name: "analise_candidatura",
  label: "Análise Candidatura",
  input: "select",
  rules: { required: "Campo Obrigatório" },
  selectFields: [
    {
      value: "deferido",
      label: "Candidatura deferida",
    },
    {
      value: "indeferido",
      label: "Candidatura indeferida",
    },
  ],
};
