import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Step1 } from "../Steps/Step1";
import { Step2 } from "../Steps/Step2";
import { Step3 } from "../Steps/Step3";
import { Step4 } from "../Steps/Step4";
import { SubmittedStep } from "../Steps/SubmittedStep";
import { FormNavigation } from "./FormNavigation";

const NewOrderForm = ({
  submitted,
  loadingProgress,
  activeStep,
  handleBack,
  handleNext,
  steps,
  onSubmit,
  defaultValues,
}) => {
  const methods = useForm({ defaultValues, mode: "onChange" });
  const isLastStep = activeStep === steps.length - 1;

  const handleFormSubmit = (e) => {
    if (isLastStep) {
      methods.handleSubmit(onSubmit)(e);
    } else {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit}>
        {submitted ? (
          <SubmittedStep
            submitted={submitted}
            loadingProgress={loadingProgress}
          />
        ) : (
          <>
            {activeStep === 0 && <Step1 />}
            {activeStep === 1 && <Step2 />}
            {activeStep === 2 && <Step3 />}
            {activeStep === 3 && <Step4 />}
            <FormNavigation
              handleBack={handleBack}
              activeStep={activeStep}
              handleNext={handleNext}
              steps={steps}
            />
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default NewOrderForm;
