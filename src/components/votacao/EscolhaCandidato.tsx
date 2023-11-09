import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";

export default function EscolhaCandidato({
  avancarEtapa,
  voltarEtapa,
}: {
  avancarEtapa: () => void;
  voltarEtapa: () => void;
}) {
  useEffect(() => {
    const digitou = new Audio(
      "https://api.anapolis.go.gov.br/apiupload/sed/digito.mp3"
    );

    const tecla1 = () => {
      digitou.play();
    };
    const tecla2 = () => {
      digitou.play();
    };
    const tecla3 = () => {
      digitou.play();
    };
    const tecla4 = () => {
      digitou.play();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "1":
          tecla1();
          break;
        case "2":
          tecla2();
          break;
        case "3":
          tecla3();
          break;
        case "4":
          tecla4();
          break;
        case "Enter":
          digitou.play();
          setTimeout(() => {
            avancarEtapa();
          }, 500);
          break;
        // Add additional cases if needed
        default:
          // If another key is pressed, do nothing
          break;
      }
    };

    // Attach the event listener to the window object
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [avancarEtapa]);

  const handleAlunoResp = () => {
    console.log("clicou aluno responsavel");
  };

  const handleFuncionario = () => {
    console.log("clicou funcionario");
  };

  return (
    <Box margin="0" padding="0" height={`calc(100vh - 66px)`} overflow="hidden">
      <Box
        display="flex"
        flexDirection="column"
        gap={12}
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Box display="flex" gap={12}>
          <Button
            size="large"
            variant="contained"
            startIcon={<EscalatorWarningIcon style={{ fontSize: 48 }} />}
            onClick={handleAlunoResp}
          >
            Liberar voto de aluno/responsável
          </Button>
          <Button
            size="large"
            variant="outlined"
            startIcon={<BadgeIcon style={{ fontSize: 48 }} />}
            onClick={handleFuncionario}
          >
            Liberar voto de funcionário
          </Button>
        </Box>
        <Box>
          EscolhaCandidato
          <Button
            style={{ whiteSpace: "nowrap" }}
            size="large"
            onClick={voltarEtapa}
          >
            Voltar
          </Button>
          <Button
            style={{ whiteSpace: "nowrap" }}
            size="large"
            onClick={avancarEtapa}
          >
            Avançar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
