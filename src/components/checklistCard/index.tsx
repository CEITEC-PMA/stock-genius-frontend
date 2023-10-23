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

interface ChecklistCardProps {
  name: string;
  alt: string;
  src: string;
  checked: boolean;
  onClick: (checked: boolean) => void;
}

const ChecklistCard: React.FC<ChecklistCardProps> = ({
  name,
  alt,
  src,
  checked,
  onClick,
}) => {
  return (
    <Paper elevation={2} sx={{ padding: "6px", margin: "12px" }}>
      <FormGroup>
        <Box display="flex" alignItems="center">
          <Box margin="8px">
            <Link href={src} target="_blank" style={{ textDecoration: "none" }}>
              <Avatar
                sx={{ bgcolor: "#0F4C81" }}
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
};

export default ChecklistCard;
