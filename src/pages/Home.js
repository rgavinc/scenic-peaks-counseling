import { Typography, Box } from "@mui/material";
import React from "react";

const Home = () => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      backgroundImage: "url('/IMG_0888.jpg')",
      backgroundSize: "cover", // Ensures the image covers the entire Box
      backgroundPosition: "center", // Centers the image
      backgroundRepeat: "no-repeat", // Prevents tiling of the image
    }}
  >
    <Typography
      variant="h3"
      color="white"
      sx={{ textAlign: "center", paddingTop: "100px" }}
    >
      Your Content Here
    </Typography>
  </Box>
);

export default Home;
