import React from "react";
import { Box, Typography, Fade, LinearProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const SubmittedStep = ({ submitted, loadingProgress }) => {
  return (
    <Box
      sx={{
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={submitted}>
        <Box sx={{ textAlign: "center" }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Order Submitted Successfully!
          </Typography>
          <Box sx={{ width: "100%", mt: 3, mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={loadingProgress}
              color="success"
              sx={{
                height: 8,
                borderRadius: 4,
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                },
              }}
            />
          </Box>
          <Typography color="text.secondary">
            Redirecting to order list...
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
};
