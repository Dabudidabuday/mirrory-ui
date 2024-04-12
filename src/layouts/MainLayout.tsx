import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import dayjs from "dayjs";
import { Quote } from "../components/quote/Quote";
import { Menu } from "../components/sidebar/Menu";

export const MainLayout = () => {
  return (
    <Grid
      container
      sx={{
        height: "100%",
        margin: "auto",
        gap: "64px",
        flexWrap: "nowrap",
      }}
    >
      <Grid item>
        <Menu />
      </Grid>
      <Grid
        item
        xs={8}
        sx={{ maxWidth: "800px", width: "100%", paddingTop: "56px" }}
      >
        <Outlet />
      </Grid>
      <Grid item xs={3} sx={{ paddingTop: "56px" }}>
        {/* <Box
          sx={{
            p: 3,
            borderRadius: "16px",
            background: "#FCFBFA",
            boxShadow: "1px 1px 24px 0px rgba(100, 100, 100, 0.10)",
          }}
        >
          <Typography variant="h5">
            {dayjs(new Date()).format("D MMMM,")}
          </Typography>
          <Typography variant="h6">
            {dayjs(new Date()).format("dddd")}
          </Typography>
        </Box> */}

        <Quote
          quote={{
            text: "Зміни ставлення до речей, які тебе турбують, і ти будеш від них у безпеці.",
            author: "Марк Аврелій",
          }}
        />
      </Grid>
    </Grid>
  );
};
