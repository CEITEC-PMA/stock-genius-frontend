import CandidatoRegister from "@/components/register/CandidatoRegister";
import React from "react";

export default function CandidatoRegisterPage({
  params,
}: {
  params: { id: string };
}) {
  return <CandidatoRegister id={params.id} />;
}
