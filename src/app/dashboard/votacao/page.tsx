"use client";
import ConfirmaCandidato from "@/components/votacao/ConfirmaCandidato";
import EscolhaCandidato from "@/components/votacao/EscolhaCandidato";
import FinalizarVotacao from "@/components/votacao/FinalizarVotacao";
import React, { useState } from "react";

export default function VotacaoT() {
  const [etapa, setEtapa] = useState(0);

  const avancarEtapa = () => {
    setEtapa((prev) => prev + 1);
  };

  const voltarEtapa = () => {
    setEtapa((prev) => prev - 1);
  };

  const renderVotacao = (etapa: number) => {
    switch (etapa) {
      case 0:
        return (
          <EscolhaCandidato
            avancarEtapa={avancarEtapa}
            voltarEtapa={voltarEtapa}
          />
        );
      case 1:
        return (
          <ConfirmaCandidato
            avancarEtapa={avancarEtapa}
            voltarEtapa={voltarEtapa}
          />
        );
      case 2:
        return (
          <FinalizarVotacao
            avancarEtapa={avancarEtapa}
            voltarEtapa={voltarEtapa}
          />
        );
      default:
        return "Etapa desconhecida";
    }
  };
  return <div>{renderVotacao(etapa)}</div>;
}
