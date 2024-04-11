import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
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
          gridTemplateRows: "auto 1fr 1fr",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Grid item>
          <Typography variant="h4" mb={1}>
            Доброго ранку, {userInfo?.first_name}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              marginBottom: "40px",
              letterSpacing: "0.15px",
            }}
          >
            Пора втілити у життя заплановане ✨
          </Typography>
        </Grid>

        <Grid item>
          {notes?.map((note, index) => (
            <Box
              key={`${note}-${index}`}
              sx={{
                p: "24px",
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#FCFBFA",
                borderRadius: "16px",
                boxShadow: "1px 1px 24px 0px rgba(100, 100, 100, 0.10)",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/notes/${note.id}`)}
            >
              <Typography>🌝 {note.template.name}</Typography>
              <Typography>{note.template.description}</Typography>
              <Typography>{dayjs(new Date()).format("DD.MM.YYYY")}</Typography>
            </Box>
          ))}
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
            <Typography variant="h4">Для щоденних записів</Typography>
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
              <Grid item xs={3} key={id}>
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
