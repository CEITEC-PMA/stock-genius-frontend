export const analiseCandidaturaDTO = {
  name: "analise_candidatura",
  label: "Análise Candidatura",
  input: "select",
  rules: { required: "Campo Obrigatório" },
  selectFields: [
    {
      value: "aprovado",
      label: "Aprovado",
    },
    {
      value: "reprovado",
      label: "Reprovado",
    },
  ],
};
