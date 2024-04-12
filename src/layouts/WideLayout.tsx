import React from "react";
import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Menu } from "../components/sidebar/Menu";
import { Navbar } from "../components/navbar/Navbar";

export const WideLayout = () => {
  return (
    <Grid
      container
      sx={{
        height: "100%",
        flexWrap: "nowrap",
        overflow: "hidden",
      }}
    >
      <Grid item>
        <Menu />
      </Grid>
      <Grid item sx={{ width: "100%", height: "100%" }}>
        <Navbar />
        <Box sx={{ marginX: "140px" }}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};
