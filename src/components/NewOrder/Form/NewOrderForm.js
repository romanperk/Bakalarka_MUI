import React from "react";
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
  formData,
  handleChange,
  handleBack,
  handleNext,
  canProceed,
  steps,
}) => {
  return (
    <>
      {submitted ? (
        <SubmittedStep
          submitted={submitted}
          loadingProgress={loadingProgress}
        />
      ) : (
        <>
          {activeStep === 0 && (
            <Step1 formData={formData} handleChange={handleChange} />
          )}
          {activeStep === 1 && (
            <Step2 formData={formData} handleChange={handleChange} />
          )}
          {activeStep === 2 && (
            <Step3 formData={formData} handleChange={handleChange} />
          )}
          {activeStep === 3 && <Step4 formData={formData} />}
          <FormNavigation
            handleBack={handleBack}
            activeStep={activeStep}
            handleNext={handleNext}
            canProceed={canProceed}
            steps={steps}
          />
        </>
      )}
    </>
  );
};

export default NewOrderForm;
