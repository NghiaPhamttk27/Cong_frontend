import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const typeColors = {
  success: "#4caf50",
  warning: "#ff9800",
  error: "#f44336",
  info: "#2196f3",
  form: "#3f51b5",
};

export default function CustomModal({
  open,
  onClose,
  type = "info",
  title,
  content,
  footer,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          bgcolor: typeColors[type],
          color: "#fff",
        }}
      >
        <DialogTitle sx={{ m: 0, p: 0, color: "inherit" }}>
          <Typography variant="h6" component="span">
            {title}
          </Typography>
        </DialogTitle>
        <IconButton onClick={onClose} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <DialogContent dividers>
        {typeof content === "string" ? (
          <Typography>{content}</Typography>
        ) : (
          content
        )}
      </DialogContent>

      {/* Footer */}
      {footer && <DialogActions>{footer}</DialogActions>}
    </Dialog>
  );
}
