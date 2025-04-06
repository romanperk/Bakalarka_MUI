import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Container,
} from "@mui/material";
import Dashboard from "./pages/Dashboard";
import OrdersOverview from "./pages/OrdersOverview";
import { OrderProvider } from "./context/ordersContext";
import NewOrder from "./pages/NewOrder";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#90caf9",
          },
          secondary: {
            main: "#f48fb1",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OrderProvider>
        <BrowserRouter>
          <NavBar />
          <Container
            sx={{
              mt: 4,
              mb: 4,
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<OrdersOverview />} />
              <Route path="/new-order" element={<NewOrder />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </OrderProvider>
    </ThemeProvider>
  );
}

export default App;
