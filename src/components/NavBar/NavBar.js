import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  FormatListBulleted as ListIcon,
  Menu as MenuIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import { useBreakpoints } from "../../hooks/useBreakpoints";
import { cyan } from "@mui/material/colors";

const NavBar = ({ darkMode, toggleDarkMode }) => {
  const { downMd } = useBreakpoints();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Orders", icon: <ListIcon />, path: "/orders" },
    { text: "New Order", icon: <ShoppingCartIcon />, path: "/new-order" },
  ];

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const getActiveStyle = (path) => {
    return location.pathname === path
      ? {
          opacity: 1,
          borderBottom: `2px solid ${cyan[500]}`,
          paddingBottom: "3px",
        }
      : {};
  };

  const drawerItems = (
    <Box
      sx={{ width: 250 }}
      alt="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          Navigation
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.text}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.text}
              slotProps={{
                primary: { sx: { color: darkMode ? "white" : "black" } },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backgroundColor: darkMode ? "paper.main" : "white",
        color: darkMode ? "white" : "black",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
          }}
        >
          Order Management
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mr: downMd ? 0 : 2 }}>
          <IconButton
            color="inherit"
            onClick={toggleDarkMode}
            aria-label="toggle dark mode"
            sx={{ ml: 1 }}
          >
            {darkMode ? (
              <LightModeIcon sx={{ color: "orange" }} />
            ) : (
              <DarkModeIcon sx={{ color: "cyan.400" }} />
            )}
          </IconButton>
        </Box>

        {downMd ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerItems}
            </Drawer>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  opacity: 0.9,
                  ...getActiveStyle(item.path),
                }}
              >
                {item.icon} {item.text}
              </Link>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;