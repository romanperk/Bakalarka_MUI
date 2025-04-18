import { Box, Button } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

export const FormNavigation = ({
  handleBack,
  activeStep,
  handleNext,
  steps,
}) => {
  const { formState } = useFormContext();
  const isLastStep = activeStep === steps.length - 1;

  const handleNextClick = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
      <Button
        onClick={handleBack}
        disabled={activeStep === 0}
        variant="outlined"
      >
        Back
      </Button>
      {isLastStep ? (
        <Button
          variant="contained"
          color="primary"
          disabled={!formState.isValid}
          type="submit"
        >
          Submit Order
        </Button>
      ) : (
        <Button
          onClick={handleNextClick}
          variant="contained"
          color="primary"
          disabled={!formState.isValid}
          type="button"
        >
          Next
        </Button>
      )}
    </Box>
  );
};
