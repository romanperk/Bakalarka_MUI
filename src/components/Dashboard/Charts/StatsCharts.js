import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import {
  CreditCard as CreditCardIcon,
  LocalShipping as LocalShippingIcon,
} from "@mui/icons-material";
import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const StatsCharts = ({ orderStats, theme, downMd }) => {
  const PAYMENT_COLORS = [
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.success.light,
    theme.palette.warning.light,
  ];
  const DELIVERY_COLORS = [
    theme.palette.info.light,
    theme.palette.success.light,
    theme.palette.warning.light,
  ];

  return (
    <Stack
      direction={downMd ? "column" : "row"}
      spacing={3}
      sx={{ width: "100%" }}
      justifyContent="space-between"
      alignItems="stretch"
    >
      <Card elevation={2} sx={{ borderRadius: 2, width: "100%" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <CreditCardIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="medium">
              Payment Method Distribution
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={orderStats.paymentMethodDistribution}
                outerRadius="60%"
                innerRadius="30%"
                labelLine={false}
                label={({ name, percent }) =>
                  downMd ? null : `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {orderStats.paymentMethodDistribution.map((_entry, index) => (
                  <Cell
                    key={`payment-cell-${index}`}
                    fill={PAYMENT_COLORS[index % PAYMENT_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              {downMd && <Legend verticalAlign="bottom" height={36} />}
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card elevation={2} sx={{ borderRadius: 2, width: "100%" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LocalShippingIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="medium">
              Delivery Method Distribution
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={orderStats.deliveryMethodDistribution}
                outerRadius="60%"
                innerRadius="30%"
                labelLine={false}
                label={({ name, percent }) =>
                  downMd ? null : `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {orderStats.deliveryMethodDistribution.map((_entry, index) => (
                  <Cell
                    key={`delivery-cell-${index}`}
                    fill={DELIVERY_COLORS[index % DELIVERY_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              {downMd && <Legend verticalAlign="bottom" height={36} />}
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default StatsCharts;
