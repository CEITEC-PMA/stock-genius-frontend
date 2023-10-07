"use client";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Header from "./Header";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          // flexGrow: 1,
          height: "100vh",
          width: "100vw",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Box >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
