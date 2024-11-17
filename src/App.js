import React from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  useMediaQuery,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008080",
    },
  },
  typography: {
    fontFamily: "Thasadith, sans-serif",
    fontSize: 14,
    fontWeightRegular: 700,
  },
});

function Menu() {
  const navigate = useNavigate();
  const isXs = useMediaQuery("(max-width:650px)");

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" }, // Add Services page later
    { name: "Contact", path: "/contact" }, // Add Contact page later
  ];

  return (
    <AppBar position="fixed" sx={{ height: "64px", marginBottom: "64px" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          onClick={() => navigate("/")}
          sx={{ marginRight: 2 }}
        >
          <img
            src="/logo_no_text.svg"
            alt="Logo"
            style={{ width: 40, height: 40 }}
          />
          {!isXs && (
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              sx={{ flexGrow: 1, cursor: "pointer" }}
            >
              Scenic Peaks Counseling
            </Typography>
          )}
        </IconButton>
        <Box>
          {menuItems.map((item) => (
            <Button
              key={item.name}
              component={NavLink}
              to={item.path}
              color="inherit"
              sx={{
                "&.active": {
                  borderBottom: "2px solid #ffffff",
                },
                marginLeft: 2,
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Menu />
        <Box
          sx={{
            maxWidth: "1280px",
            paddingTop: "64px",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginX: "auto",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
