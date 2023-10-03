"use client";
import DocslistCard from "@/components/form/DocsListCard";
import { documentsList } from "@/components/form/formsDocsList";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const onSubmit = (data: any) => {
  console.log(data);
  console.log("enviou");
};

export default function FormDocs() {
  const { control, handleSubmit } = useForm();

  return (
    <Container>
      <Paper sx={{ padding: "12px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {documentsList.map((document, i) => (
            <DocslistCard name={document.name} key={i} />
          ))}
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              type="submit"
              variant="contained"
              style={{ margin: "12px" }}
              fullWidth
            >
              Salvar
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
