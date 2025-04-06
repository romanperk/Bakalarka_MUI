import React from "react";
import { Box, Typography, Paper, Grid, Alert } from "@mui/material";

export const Step4 = ({ formData }) => {
  return (
    <Box sx={{ minHeight: 300 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Order Summary
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 2, bgcolor: "background.paper" }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Customer Details
            </Typography>
            <Typography>{formData.userName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {formData.userEmail}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Product Details
            </Typography>
            <Typography>{formData.productName}</Typography>
            <Typography variant="body2" color="text.secondary">
              Quantity: {formData.quantity}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Payment Method
            </Typography>
            <Typography>{formData.paymentMethod}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Delivery Method
            </Typography>
            <Typography>{formData.deliveryMethod}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Alert severity="info" sx={{ my: 2 }}>
        Please review your order details before submission.
      </Alert>
    </Box>
  );
};
