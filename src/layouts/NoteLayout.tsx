import React from "react";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Menu } from "../components/sidebar/Menu";

export const NoteLayout = () => {
  return (
    <Grid
      container
      sx={{
        paddingTop: "56px",
        paddingX: "32px",
        maxWidth: "1340px",
        height: "100%",
        margin: "auto",
        gap: "64px",
        flexWrap: "nowrap",
      }}
    >
      <Grid item sx={{ width: "72px" }}>
        <Menu />
      </Grid>
      <Grid item xs={11} sx={{ maxWidth: "800px", width: "100%" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};
