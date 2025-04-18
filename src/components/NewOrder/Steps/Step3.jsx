import React from "react";
import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const Step3 = () => {
  const { control } = useFormContext();
  return (
    <Box sx={{ minHeight: 300 }}>
      <Stack direction={"column"} spacing={2}>
        <FormControl fullWidth required>
          <InputLabel>Payment Method</InputLabel>
          <Controller
            name="paymentMethod"
            control={control}
            rules={{ required: "Payment method is required" }}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                label="Payment Method"
                error={!!fieldState.error}
              >
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="PayPal">PayPal</MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel>Delivery Method</InputLabel>
          <Controller
            name="deliveryMethod"
            control={control}
            rules={{ required: "Delivery method is required" }}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                label="Delivery Method"
                error={!!fieldState.error}
              >
                <MenuItem value="Standard">Standard</MenuItem>
                <MenuItem value="Express">Express</MenuItem>
                <MenuItem value="Pickup">Pickup</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Stack>
    </Box>
  );
};
