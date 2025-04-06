import React from "react";
import { Grid } from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Sync as SyncIcon,
  ShoppingBag as ShoppingBagIcon,
} from "@mui/icons-material";
import { StatsDetail } from "./StatsDetail";

const StatsSummary = ({ orderStats }) => {
  const statsCards = [
    {
      icon: <ShoppingBagIcon color="primary" />,
      title: "Total Orders",
      value: orderStats.totalOrders,
      color: "primary.main",
      progress: 100,
      percentage: "100%",
    },
    {
      icon: <CheckCircleIcon color="success" />,
      title: "Completed",
      value: orderStats.completedOrders,
      color: "success.main",
      progress: orderStats.completionRate,
      percentage: `${orderStats.completionRate}%`,
    },
    {
      icon: <SyncIcon color="info" />,
      title: "Processing",
      value: orderStats.processingOrders,
      color: "info.main",
      progress:
        orderStats.totalOrders > 0
          ? (orderStats.processingOrders / orderStats.totalOrders) * 100
          : 0,
      percentage:
        orderStats.totalOrders > 0
          ? `${Math.round(
              (orderStats.processingOrders / orderStats.totalOrders) * 100
            )}%`
          : "0%",
    },
    {
      icon: <PendingIcon color="warning" />,
      title: "Pending",
      value: orderStats.pendingOrders,
      color: "warning.main",
      progress:
        orderStats.totalOrders > 0
          ? (orderStats.pendingOrders / orderStats.totalOrders) * 100
          : 0,
      percentage:
        orderStats.totalOrders > 0
          ? `${Math.round(
              (orderStats.pendingOrders / orderStats.totalOrders) * 100
            )}%`
          : "0%",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ width: "100%", mb: 3 }}>
      {statsCards.map((card, index) => (
        <Grid size={{ xs: 6, md: 3 }} key={index}>
          <StatsDetail
            icon={card.icon}
            title={card.title}
            value={card.value}
            color={card.color}
            progress={card.progress}
            percentage={card.percentage}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsSummary;
