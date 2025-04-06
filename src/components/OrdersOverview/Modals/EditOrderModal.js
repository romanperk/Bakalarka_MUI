import React from "react";
import {
  Paper,
  Box,
  Typography,
  Modal,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

export const EditOrderModal = ({
  modalOpen,
  handleCloseModal,
  editingOrder,
  setEditingOrder,
  handleSaveEditedOrder,
}) => {
  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 600, width: "90%", borderRadius: 2 }}>
        <Typography variant="h6" mb={2}>
          Edit Order
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Customer Name"
              value={editingOrder?.userName || ""}
              onChange={(e) =>
                setEditingOrder({
                  ...editingOrder,
                  userName: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Customer Email"
              type="email"
              value={editingOrder?.userEmail || ""}
              onChange={(e) =>
                setEditingOrder({
                  ...editingOrder,
                  userEmail: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Product"
              value={editingOrder?.productName || ""}
              onChange={(e) =>
                setEditingOrder({
                  ...editingOrder,
                  productName: e.target.value,
                })
              }
              fullWidth
              disabled
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Quantity"
              type="number"
              value={editingOrder?.quantity || 1}
              onChange={(e) =>
                setEditingOrder({
                  ...editingOrder,
                  quantity: Number(e.target.value),
                })
              }
              fullWidth
              slotProps={{
                htmlInput: {
                  min: 1,
                  onKeyDown: (e) => {
                    if (e.key === "." || e.key === "-") {
                      e.preventDefault();
                    }
                  },
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={editingOrder?.paymentMethod || "credit_card"}
                label="Payment Method"
                onChange={(e) =>
                  setEditingOrder({
                    ...editingOrder,
                    paymentMethod: e.target.value,
                  })
                }
              >
                <MenuItem value="credit_card">Credit Card</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
                <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                <MenuItem value="cash">Cash</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Delivery Method</InputLabel>
              <Select
                value={editingOrder?.deliveryMethod || "standard"}
                label="Delivery Method"
                onChange={(e) =>
                  setEditingOrder({
                    ...editingOrder,
                    deliveryMethod: e.target.value,
                  })
                }
              >
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="express">Express</MenuItem>
                <MenuItem value="pickup">Pickup</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={editingOrder?.status || "pending"}
                label="Status"
                onChange={(e) =>
                  setEditingOrder({
                    ...editingOrder,
                    status: e.target.value,
                  })
                }
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleCloseModal} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSaveEditedOrder}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};
