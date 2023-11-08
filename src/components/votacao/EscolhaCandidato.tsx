import { Button } from "@mui/material";
import React, { useEffect } from "react";

export default function EscolhaCandidato({ avancarEtapa, voltarEtapa }) {
  const digitou = new Audio(
    "https://api.anapolis.go.gov.br/apiupload/sed/digito.mp3"
  );

  useEffect(() => {
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

    const handleKeyDown = (event) => {
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
  return (
    <div>
      EscolhaCandidato
      <Button onClick={voltarEtapa}>Voltar</Button>
      <Button onClick={avancarEtapa}>Avançar</Button>
    </div>
  );
}
