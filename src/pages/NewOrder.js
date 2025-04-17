import React, { useEffect, useState } from "react";
import NewOrderForm from "../components/NewOrder/Form/NewOrderForm";
import { Box, Button, Paper, Typography } from "@mui/material";
import { OrderStepper } from "../components/NewOrder/Stepper/Stepper";
import { useNavigate } from "react-router-dom";
import { useBreakpoints } from "../hooks/useBreakpoints";
import { useOrders } from "../context/ordersContext";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

const NewOrder = () => {
  const navigate = useNavigate();
  const { downMd } = useBreakpoints();
  const { addOrder } = useOrders();
  const [activeStep, setActiveStep] = useState(0);
  const defaultValues = {
    userName: "",
    userEmail: "",
    productName: "",
    quantity: 1,
    paymentMethod: "",
    deliveryMethod: "",
    status: "pending",
  };
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
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
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

  const handleSubmit = (data) => {
    const formattedData = {
      ...data,
      paymentMethod: data.paymentMethod.toLowerCase().replace(/ /g, "_"),
      deliveryMethod: data.deliveryMethod.toLowerCase().replace(/ /g, "_"),
    };

    setLoadingProgress(0);
    addOrder(formattedData);
    setSubmitted(true);

    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5">New Order</Typography>
        {activeStep === 0 && (
          <Button
            size="small"
            onClick={() => navigate("/orders")}
            variant="contained"
            startIcon={<ArrowBackIcon />}
          >
            {downMd ? "Overview" : "Order Overview"}
          </Button>
        )}
      </Box>
      <OrderStepper activeStep={activeStep} steps={steps} downMd={downMd} />
      <NewOrderForm
        submitted={submitted}
        loadingProgress={loadingProgress}
        activeStep={activeStep}
        defaultValues={defaultValues}
        handleBack={handleBack}
        handleNext={handleNext}
        steps={steps}
        onSubmit={handleSubmit}
      />
    </Paper>
  );
};

export default NewOrder;
