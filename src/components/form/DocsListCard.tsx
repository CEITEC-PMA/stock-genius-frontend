import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function DocslistCard({ name }: { name: string }) {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper elevation={2} sx={{ padding: "6px", margin: "12px" }}>
        <Box
          display="flex"
          flexDirection={isSmallScreen ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          padding="8px"
        >
          <Box margin="8px">
            <Typography variant="body1">{name}</Typography>
          </Box>
          <Box>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ whiteSpace: "nowrap" }}
            >
              Escolher arquivo
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
