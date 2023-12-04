import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

type CandidatoCardProps = {
  image: string;
  nome: string | undefined;
  numero: string;
  alturaTela: number;
};

export default function CandidatoCardEscolha({
  image,
  nome,
  numero,
  alturaTela,
}: CandidatoCardProps) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          height={alturaTela > 1000 ? "350px" : "240px"}
          style={{
            aspectRatio: "16 / 9",
            maxWidth: "100%",
            objectFit: alturaTela > 1000 ? "contain" : "contain",
          }}
          component="img"
          image={image}
          title={nome}
          sx={{
            cursor: "default",
          }}
          alt={nome}
        />
        <CardContent
          sx={{
            cursor: "default",
            margin: "auto",
          }}
        >
          {numero && (
            <Typography gutterBottom align="center" variant="h2" component="h2">
              {numero}
            </Typography>
          )}
          <Typography gutterBottom align="center" variant="h5" component="h2">
            {nome}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
