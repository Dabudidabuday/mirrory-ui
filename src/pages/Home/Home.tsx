import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { ChevronRightOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useQuery } from "react-query";

export const Home = () => {
  const navigate = useNavigate();
  // const [userInfo, set$userInfo] = useState();

  const { data: notes, isLoading } = useQuery({
    queryKey: ["my notes"],
    queryFn: async () => {
      const response = await api.post("notes/my");

      return response.data;
    },
  });

  const { data: userInfo, isLoading: loadingUser } = useQuery({
    queryKey: ["user info"],
    queryFn: async () => {
      const userResponse = await api.get("/user");

      return userResponse.data;
    },
  });

  const { data: templates, isLoading: loadingTemplates } = useQuery({
    queryKey: ["templates info"],
    queryFn: async () => {
      const templatesResponse = await api.get("template/get");

      return templatesResponse.data;
    },
  });

  return (
    <>
      <Grid
        container
        flexDirection="column"
        sx={{
          display: "grid",
          gridTemplateRows: "auto auto auto auto",
          flexDirection: "column",
          height: "100%",
          marginTop: 2,
        }}
      >
        <Grid item sx={{ display: "flex", alignItems: "flex-start" }}>
          <Box sx={{ flex: 1, direction: "column" }}>
            <Typography variant="h4" mb={1}>
              Доброго ранку, {userInfo?.first_name}
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
              {dayjs(new Date()).format("D MMMM,")}
            </Typography>
            <Typography variant="h6">
              {dayjs(new Date()).format("dddd")}
            </Typography>
          </Box>
        </Grid>

        <Divider
          flexItem
          orientation="horizontal"
          sx={{ marginY: 4, height: "1px" }}
        />

        <Grid item>
          <Typography sx={{ textTransform: "uppercase" }}>
            Мій поточний спринт
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: 2,
              background: "#F3EEE5",
            }}
          >
            <Box>
              <Typography>📝 Стоїцизм</Typography>
              <Typography>День 3. Негативна візуалізація</Typography>
              <LinearProgress variant="determinate" value={30} />
            </Box>
            <Button variant="contained">Продовжити</Button>
          </Box>
        </Grid>

        <Grid item>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "auto",
              mb: 3,
            }}
          >
            <Typography variant="h4">Щоденні активності</Typography>
            <Button
              endIcon={
                <ChevronRightOutlined
                  sx={{
                    backgroundColor: "#FCFBFA",
                    padding: 1,
                    borderRadius: "8px",
                  }}
                />
              }
              onClick={() => navigate("/templates")}
            >
              Всі шаблони
            </Button>
          </Box>

          <Grid container sx={{ display: "flex" }} spacing={3}>
            {templates?.map(({ id, name, description }) => (
              <Grid item xs={6} key={id}>
                <Box
                  onClick={() => navigate(`/templates/${id}`)}
                  sx={{
                    p: 2,
                    borderRadius: "16px",
                    background: "#FCFBFA",
                    boxShadow: "1px 1px 24px 0px rgba(100, 100, 100, 0.10)",
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <Typography mb={2}>{name}</Typography>
                  <Typography sx={{ fontSize: 12, mb: 2 }} color="#8D8D8D">
                    {description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
