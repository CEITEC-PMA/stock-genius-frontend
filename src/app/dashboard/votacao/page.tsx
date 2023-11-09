"use client";
import ConfirmaCandidato from "@/components/votacao/ConfirmaCandidato";
import EscolhaCandidato from "@/components/votacao/EscolhaCandidato";
import FinalizarVotacao from "@/components/votacao/FinalizarVotacao";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function Votacao() {
  const [etapa, setEtapa] = useState(0);
  const searchParams = useSearchParams();

  const tipo = searchParams.get("tipo");
  const id = searchParams.get("id");

  console.log("O tipo do voto é", tipo);
  console.log(id);

  const avancarEtapa = () => {
    setEtapa((prev) => prev + 1);
  };

  const voltarEtapa = () => {
    setEtapa((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log(tipoVoto);
    console.log(idVotante);
    console.log(candidato);

    //se o status da resposta for 200, executa o avancarEtapa()
    avancarEtapa();
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
            avancarEtapa={handleSubmit}
            voltarEtapa={voltarEtapa}
            tipo={tipo}
            id={id}
            handleSubmit={handleSubmit}
          />
        );
      case 2:
        return <FinalizarVotacao />;
      default:
        return "Etapa desconhecida";
    }
  };
  return <div>{renderVotacao(etapa)}</div>;
}
