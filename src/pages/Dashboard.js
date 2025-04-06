import React from "react";
import { Box, useTheme } from "@mui/material";
import { useBreakpoints } from "../hooks/useBreakpoints";
import StatsSummary from "../components/Dashboard/Stats/StatsSummary";
import { DashboardHeader } from "../components/Dashboard/Header/Header";
import { useGetOrderStats } from "../hooks/useGetOrderStats";
import StatsCharts from "../components/Dashboard/Charts/StatsCharts";

const Dashboard = () => {
  const theme = useTheme();
  const { downMd } = useBreakpoints();
  const orderStats = useGetOrderStats();

  return (
    <Box>
      <DashboardHeader theme={theme} />
      <StatsSummary orderStats={orderStats} />
      <StatsCharts orderStats={orderStats} theme={theme} downMd={downMd} />
    </Box>
  );
};

export default Dashboard;
