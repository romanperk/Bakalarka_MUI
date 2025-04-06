import React from "react";
import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export const Step3 = ({ formData, handleChange }) => {
  return (
    <Box sx={{ minHeight: 300 }}>
      <Stack direction={"column"} spacing={2}>
        <FormControl fullWidth required>
          <InputLabel>Payment Method</InputLabel>
          <Select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            label="Payment Method"
          >
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="PayPal">PayPal</MenuItem>
            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel>Delivery Method</InputLabel>
          <Select
            name="deliveryMethod"
            value={formData.deliveryMethod}
            onChange={handleChange}
            label="Delivery Method"
          >
            <MenuItem value="Standard">Standard</MenuItem>
            <MenuItem value="Express">Express</MenuItem>
            <MenuItem value="Pickup">Pickup</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};
