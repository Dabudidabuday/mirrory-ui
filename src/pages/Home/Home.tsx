import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  LinearProgress,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { ChevronRightOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useQuery } from "react-query";
import { HomeGreetings } from "./components/Greetings";
import { Quote } from "../../components/quote/Quote";

export const Home = () => {
  const navigate = useNavigate();
  const [userInfo, set$userInfo] = useState();

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

  if (!userInfo) {
    return <></>;
  }

  return (
    <>
      <Grid
        container
        flexDirection="column"
        sx={{
          display: "grid",
          // gridTemplateRows: "auto auto auto auto",
          flexDirection: "column",
          height: "100%",
          marginTop: 2,
        }}
      >
        <HomeGreetings firstName={userInfo.first_name} />

        <Box sx={{ display: "flex", gap: "24px", marginBottom: 5 }}>
          <Grid item sx={{ width: "100%" }}>
            <Typography sx={{ textTransform: "uppercase", marginBottom: 3 }}>
              Мій поточний спринт
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "16px 24px",
                borderRadius: "16px",
                background: "#F3EEE5",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 4 }}
              >
                <Icon sx={{ width: 42, height: 42 }}>📝</Icon>
                <Box sx={{ justifySelf: "flex-start" }}>
                  <Typography sx={{ marginBottom: 1 }}>Стоїцизм</Typography>
                  <Typography>День 3. Негативна візуалізація</Typography>
                </Box>
                <Button sx={{ marginLeft: "auto" }} variant="contained">
                  Продовжити
                </Button>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LinearProgress
                  variant="determinate"
                  value={30}
                  sx={{
                    width: 175,
                    border: "1px solid grey",
                    borderRadius: "16px",
                    height: "12px",
                    background: "#F9F7F3",
                    marginRight: 1,
                  }}
                />
                <Typography variant="body2">2/10 завершено</Typography>
              </Box>
            </Box>
          </Grid>
          <Quote
            quote={{
              text: "Зміни ставлення до речей, які тебе турбують, і ти будеш від них у безпеці.",
              author: "Марк Аврелій",
            }}
          />
        </Box>

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
