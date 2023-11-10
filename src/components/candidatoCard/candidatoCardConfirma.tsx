import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { apiUrl } from "@/utils/api";
import { CardActionArea } from "@mui/material";

type CandidatoCardProps = {
  image: string;
  nome: string | undefined;
  numero: string;
};

export default function CandidatoCardConfirma({
  image,
  nome,
  numero,
}: CandidatoCardProps) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          height="550px"
          style={{
            aspectRatio: "1 / 1",
            maxWidth: "100%",
            objectFit: "contain",
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