import { Box, Typography } from "@mui/material";
import React from "react";

const Home = () => (
  <Box
    sx={{
      maxWidth: "1280px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginX: "auto",
    }}
  >
    <Typography variant="h4">Scenic Peaks Counseling</Typography>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit...
    </Typography>
  </Box>
);

export default Home;
