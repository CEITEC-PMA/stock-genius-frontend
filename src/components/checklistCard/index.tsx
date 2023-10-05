import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function ChecklistCard({
  name,
  alt,
  src,
  checked,
  onClick,
}: {
  name: string;
  alt: string;
  src: string;
  checked: boolean;
  onClick: any;
}) {
  return (
    <Paper elevation={2} sx={{ padding: "6px", margin: "12px" }}>
      <FormGroup>
        <Box display="flex" alignItems="center">
          <Box margin="8px">
            <Link href={src}>
              <Avatar
                sx={{ bgcolor: "#fcc" }}
                variant="square"
                alt={alt}
                src={src}
              >
                D
              </Avatar>
            </Link>
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={checked}
                onClick={() => onClick(!checked)}
              />
            }
            label={name}
          />
        </Box>
      </FormGroup>
    </Paper>
  );
}
