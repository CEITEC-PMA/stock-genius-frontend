import React from "react";
import { Modal, Paper, Typography, Button, Box } from "@mui/material";

interface CustomModalProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  yesButtonLabel?: string;
  noButtonLabel?: string;
  onYesButtonClick?: () => void;
  onNoButtonClick?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  title,
  description,
  onClose,
  yesButtonLabel = "SIM",
  noButtonLabel = "NÃO",
  onYesButtonClick,
  onNoButtonClick,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "white",
          padding: 16,
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">{description}</Typography>
        <Box display="flex" margin="16px" justifyContent="space-around">
          {yesButtonLabel && (
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                onYesButtonClick && onYesButtonClick();
                onClose();
              }}
            >
              {yesButtonLabel}
            </Button>
          )}
          {noButtonLabel && (
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                onNoButtonClick && onNoButtonClick();
                onClose();
              }}
            >
              {noButtonLabel}
            </Button>
          )}
        </Box>
      </div>
    </Modal>
  );
};

export default CustomModal;
