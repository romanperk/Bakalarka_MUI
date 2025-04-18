import React, { useEffect } from "react";
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
  FormHelperText,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export const EditOrderModal = ({
  modalOpen,
  handleCloseModal,
  editingOrder,
  setEditingOrder,
  handleSaveEditedOrder,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: editingOrder
      ? {
          ...editingOrder,
          quantity: editingOrder.quantity?.toString(),
        }
      : {},
    resolver: (values) => {
      return { values, errors: {} };
    },
  });

  useEffect(() => {
    if (editingOrder) {
      reset({
        ...editingOrder,
        quantity: editingOrder.quantity?.toString(),
      });
    }
  }, [editingOrder, reset]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      quantity: parseInt(data.quantity, 10),
    };

    setEditingOrder({ ...editingOrder, ...formattedData });
    handleSaveEditedOrder();
  };

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
        <Typography variant="h6">Edit Order</Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Update the order details below and click "Save Changes" to apply.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="userName"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Customer Name"
                    fullWidth
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="userEmail"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Customer Email"
                    type="email"
                    fullWidth
                    error={!!errors.userEmail}
                    helperText={errors.userEmail?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="productName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Product" fullWidth disabled />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="quantity"
                control={control}
                rules={{
                  required: "Quantity is required",
                  min: {
                    value: 1,
                    message: "Quantity must be at least 1",
                  },
                  validate: (value) =>
                    Number.isInteger(Number(value)) ||
                    "Quantity must be a whole number",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Quantity"
                    type="number"
                    fullWidth
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                    onKeyDown={(e) => {
                      if (e.key === "." || e.key === "-") {
                        e.preventDefault();
                      }
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="paymentMethod"
                control={control}
                rules={{ required: "Payment method is required" }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.paymentMethod}>
                    <InputLabel>Payment Method</InputLabel>
                    <Select {...field} label="Payment Method">
                      <MenuItem value="credit_card">Credit Card</MenuItem>
                      <MenuItem value="paypal">PayPal</MenuItem>
                      <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                      <MenuItem value="cash">Cash</MenuItem>
                    </Select>
                    {errors.paymentMethod && (
                      <FormHelperText>
                        {errors.paymentMethod.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="deliveryMethod"
                control={control}
                rules={{ required: "Delivery method is required" }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.deliveryMethod}>
                    <InputLabel>Delivery Method</InputLabel>
                    <Select {...field} label="Delivery Method">
                      <MenuItem value="standard">Standard</MenuItem>
                      <MenuItem value="express">Express</MenuItem>
                      <MenuItem value="pickup">Pickup</MenuItem>
                    </Select>
                    {errors.deliveryMethod && (
                      <FormHelperText>
                        {errors.deliveryMethod.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.status}>
                    <InputLabel>Status</InputLabel>
                    <Select {...field} label="Status">
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="processing">Processing</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                    {errors.status && (
                      <FormHelperText>{errors.status.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleCloseModal} variant="outlined">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isDirty}
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
    </Modal>
  );
};
