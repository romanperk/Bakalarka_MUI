import React from "react";
import {
  TextField,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const Step2 = () => {
  const { control } = useFormContext();
  return (
    <Box sx={{ minHeight: 300 }}>
      <Stack direction={"column"} spacing={2}>
        <FormControl fullWidth required>
          <InputLabel>Product</InputLabel>
          <Controller
            name="productName"
            control={control}
            rules={{ required: "Product is required" }}
            render={({ field, fieldState }) => (
              <Select {...field} label="Product" error={!!fieldState.error}>
                <MenuItem value="Headphones">Headphones</MenuItem>
                <MenuItem value="Keyboard">Keyboard</MenuItem>
                <MenuItem value="Smart Watch">Smart Watch</MenuItem>
                <MenuItem value="Speaker">Speaker</MenuItem>
                <MenuItem value="Mouse">Mouse</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <Controller
          name="quantity"
          control={control}
          rules={{
            required: "Quantity is required",
            min: { value: 1, message: "Minimum quantity is 1" },
            validate: (value) =>
              Number.isInteger(Number(value)) || "Must be an integer",
          }}
          render={({ field, fieldState }) => (
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              required
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Stack>
    </Box>
  );
};
