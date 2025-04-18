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
  Tooltip,
  alpha,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined as DashboardIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
  FormatListBulleted as ListIcon,
  Menu as MenuIcon,
  DarkModeOutlined as DarkModeIcon,
  LightModeOutlined as LightModeIcon,
} from "@mui/icons-material";
import { useBreakpoints } from "../../hooks/useBreakpoints";
import { blue } from "@mui/material/colors";

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

  const getActiveStyle = (path) =>
    location.pathname === path
      ? {
          background: alpha(darkMode ? blue[800] : blue[100], 0.3),
          fontWeight: 600,
        }
      : {};

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
      <List sx={{ p: 1 }}>
        {navItems.map((item) => (
          <ListItem
            component={Link}
            to={item.path}
            key={item.text}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              ...getActiveStyle(item.path),
            }}
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

        <Tooltip
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <IconButton
            color="inherit"
            onClick={toggleDarkMode}
            aria-label="toggle dark mode"
            sx={{ mr: 2 }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>

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
              gap: 2,
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
                  fontSize: 14,
                  padding: "6px 12px",
                  borderRadius: 8,
                  ...getActiveStyle(item.path),
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 6,
                  }}
                >
                  {item.icon}
                </span>
                {item.text}
              </Link>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
