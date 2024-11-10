import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
