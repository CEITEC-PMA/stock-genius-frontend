export const analiseCandidaturaDTO = {
  name: "analise_candidatura",
  label: "Análise Candidatura",
  input: "select",
  rules: { required: "Campo Obrigatório" },
  selectFields: [
    {
      value: "Deferida",
      label: "Candidatura deferida",
    },
    {
      value: "Indeferida",
      label: "Candidatura indeferida",
    },
  ],
};
