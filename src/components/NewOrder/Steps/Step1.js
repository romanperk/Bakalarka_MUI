import React from "react";
import { TextField, Box, Stack } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const Step1 = () => {
  const { control } = useFormContext();

  return (
    <Box sx={{ minHeight: 300 }}>
      <Stack direction={"column"} spacing={2}>
        <Controller
          name="userName"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field, fieldState }) => (
            <TextField
              label="Name"
              fullWidth
              required
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="userEmail"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              label="Email"
              type="email"
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
