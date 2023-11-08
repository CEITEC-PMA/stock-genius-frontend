import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import CustomModal from "../modal";

interface ChecklistCardProps {
  label: string;
  alt: string;
  src: string;
  checked: boolean;
  onClick: (checked: boolean) => void;
}

const ChecklistCard: React.FC<ChecklistCardProps> = ({
  label,
  alt,
  src,
  checked,
  onClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("entrou");
  };

  const handleOKButtonClick = () => {
    closeModal();
  };

  return (
    <>
      <Paper elevation={2} sx={{ padding: "6px", margin: "12px" }}>
        <FormGroup>
          <Box display="flex" alignItems="center">
            <Box margin="8px">
              {src ===
              "https://api.anapolis.go.gov.br/apiupload/sed/error.png" ? (
                <Button
                  onClick={() => openModal()}
                  size="small"
                  style={{ textDecoration: "none", margin: 0, padding: 0 }}
                >
                  <Avatar variant="square" alt={alt} src={src}>
                    D
                  </Avatar>
                </Button>
              ) : (
                <Button
                  size="small"
                  style={{ textDecoration: "none", margin: 0, padding: 0 }}
                >
                  <Link
                    href={src}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Avatar
                      sx={{ bgcolor: "#0F4C81" }}
                      variant="square"
                      alt={alt}
                      src={src}
                    >
                      D
                    </Avatar>
                  </Link>
                </Button>
              )}
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={checked}
                  onClick={() => onClick(!checked)}
                />
              }
              label={label}
            />
          </Box>
        </FormGroup>
      </Paper>
      <CustomModal
        open={isModalOpen}
        title="Atenção!"
        description="O documento não foi encontrado!"
        yesButtonLabel="Ok"
        onYesButtonClick={handleOKButtonClick}
      />
    </>
  );
};

export default ChecklistCard;
