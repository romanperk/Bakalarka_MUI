import React, { useEffect, useState } from "react";
import NewOrderForm from "../components/NewOrder/Form/NewOrderForm";
import { Paper, Typography } from "@mui/material";
import { OrderStepper } from "../components/NewOrder/Stepper/Stepper";
import { useNavigate } from "react-router-dom";
import { useBreakpoints } from "../hooks/useBreakpoints";
import { useOrders } from "../context/ordersContext";

const NewOrder = () => {
  const navigate = useNavigate();
  const { downMd } = useBreakpoints();
  const { addOrder } = useOrders();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    productName: "",
    quantity: 1,
    paymentMethod: "",
    deliveryMethod: "",
    status: "pending",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const steps = [
    "Personal Details",
    "Select Product",
    "Shipping & Payment",
    "Confirm Order",
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let timer;
    if (submitted) {
      timer = setInterval(() => {
        setLoadingProgress((prevProgress) => {
          const newProgress = prevProgress + 5;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 100);
    }

    return () => {
      clearInterval(timer);
    };
  }, [submitted]);

  const handleSubmit = () => {
    const formattedData = {
      ...formData,
      paymentMethod: formData.paymentMethod.toLowerCase().replace(/ /g, "_"),
      deliveryMethod: formData.deliveryMethod.toLowerCase().replace(/ /g, "_"),
    };

    setLoadingProgress(0);
    addOrder(formattedData);
    setSubmitted(true);

    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  };

  const canProceed = () => {
    const isValidEmail = (email) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    };

    switch (activeStep) {
      case 0:
        return formData.userName && isValidEmail(formData.userEmail);
      case 1:
        return formData.productName && formData.quantity > 0;
      case 2:
        return formData.paymentMethod && formData.deliveryMethod;
      default:
        return true;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        New Order
      </Typography>
      <OrderStepper activeStep={activeStep} steps={steps} downMd={downMd} />
      <NewOrderForm
        submitted={submitted}
        loadingProgress={loadingProgress}
        activeStep={activeStep}
        formData={formData}
        handleChange={handleChange}
        handleBack={handleBack}
        handleNext={handleNext}
        canProceed={canProceed}
        steps={steps}
      />
    </Paper>
  );
};

export default NewOrder;
