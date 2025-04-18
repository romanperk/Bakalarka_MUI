import React, { useMemo, useState } from "react";
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
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => setDarkMode((prev) => !prev);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          secondary: {
            main: "#f48fb1",
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: "none",
              },
            },
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OrderProvider>
        <BrowserRouter>
          <NavBar darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />
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
