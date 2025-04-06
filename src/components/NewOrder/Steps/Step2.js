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

export const Step2 = ({ formData, handleChange }) => {
  return (
    <Box sx={{ minHeight: 300 }}>
      <Stack direction={"column"} spacing={2}>
        <FormControl fullWidth required>
          <InputLabel>Product</InputLabel>
          <Select
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            label="Product"
          >
            <MenuItem value="Headphones">Headphones</MenuItem>
            <MenuItem value="Keyboard">Keyboard</MenuItem>
            <MenuItem value="Smart Watch">Smart Watch</MenuItem>
            <MenuItem value="Speaker">Speaker</MenuItem>
            <MenuItem value="Mouse">Mouse</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
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
          value={formData.quantity}
          onChange={handleChange}
          fullWidth
          required
        />
      </Stack>
    </Box>
  );
};
