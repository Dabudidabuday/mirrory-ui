import { Grid, Box, Typography, Divider } from "@mui/material";
import dayjs from "dayjs";
import { userInfo } from "os";
import React from "react";

export interface HomeGreetingsProps {
  firstName: string;
}

export const HomeGreetings = ({ firstName }: HomeGreetingsProps) => {
  return (
    <>
      <Grid item sx={{ display: "flex", alignItems: "flex-start" }}>
        <Box sx={{ flex: 1, direction: "column" }}>
          <Typography variant="h4" mb={1}>
            Доброго ранку, {firstName}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              letterSpacing: "0.15px",
            }}
          >
            зараз саме час змін ✨
          </Typography>
        </Box>
        <Box sx={{}}>
          <Typography variant="h5">
            {dayjs(new Date()).format("DD dddd, dd")}
          </Typography>
          <Typography>днів підряд: 1</Typography>
        </Box>
      </Grid>

      <Divider
        flexItem
        orientation="horizontal"
        sx={{ marginY: 4, height: "1px" }}
      />
    </>
  );
};
