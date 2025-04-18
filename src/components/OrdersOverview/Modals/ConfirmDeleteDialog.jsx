import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from "@mui/material";

export const ConfirmDeleteDialog = ({
  modalOpen,
  handleCancelDelete,
  orderToDelete,
  handleConfirmDelete,
}) => {
  return (
    <Dialog open={modalOpen} onClose={handleCancelDelete}>
      <Paper sx={{ p: 1, borderRadius: 2 }}>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete order #{orderToDelete?.id}{" "}
            {orderToDelete?.productName}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};
