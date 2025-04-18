import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

export const OrderStepper = ({ activeStep, steps, downMd }) => {
  return (
    <Stepper
      activeStep={activeStep}
      sx={{
        mb: 4,
      }}
    >
      {steps.map((step) => (
        <Step key={step}>
          <StepLabel>{!downMd && step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
