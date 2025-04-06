import { Box, Button } from "@mui/material";
import React from "react";

export const FormNavigation = ({
  handleBack,
  activeStep,
  handleNext,
  canProceed,
  steps,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
      <Button
        onClick={handleBack}
        disabled={activeStep === 0}
        variant="outlined"
      >
        Back
      </Button>
      <Button
        onClick={handleNext}
        variant="contained"
        color={activeStep === steps.length - 1 ? "success" : "primary"}
        disabled={!canProceed()}
      >
        {activeStep === steps.length - 1 ? "Submit Order" : "Next"}
      </Button>
    </Box>
  );
};
