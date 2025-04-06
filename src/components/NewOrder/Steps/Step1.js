import React from "react";
import { TextField, Box, Stack } from "@mui/material";

export const Step1 = ({ formData, handleChange }) => {
  return (
    <Box sx={{ minHeight: 300 }}>
      <Stack direction={"column"} spacing={2}>
        <TextField
          label="Name"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="userEmail"
          type="email"
          value={formData.userEmail}
          onChange={handleChange}
          fullWidth
          required
        />
      </Stack>
    </Box>
  );
};
