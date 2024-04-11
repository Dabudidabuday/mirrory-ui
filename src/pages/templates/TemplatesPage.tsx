import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { ChevronLeftOutlined } from "@mui/icons-material";
import { ButtonBack } from "../../components/buttons/ButtonBack";

export const TemplatesPage = () => {
  const navigate = useNavigate();
  const [templates, set$templates] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get("template/get");

      set$templates(response.data);
    })();
  }, []);

  return (
    <>
      <ButtonBack />
      <Typography variant="h4" mb="2">
        Шаблони
      </Typography>

      <Divider
        orientation="horizontal"
        sx={{ marginTop: 1, marginBottom: 4 }}
      />
      <Grid container spacing={3}>
        {templates?.map(({ id, name, description }) => (
          <Grid item xs={3} key={id}>
            <Box
              onClick={() => navigate(`${id}`)}
              sx={{
                p: 2,
                borderRadius: "16px",
                background: "#FCFBFA",
                boxShadow: "1px 1px 24px 0px rgba(100, 100, 100, 0.10)",
              }}
            >
              <Typography mb={2}>{name}</Typography>
              <Typography sx={{ fontSize: 12 }} color="#8D8D8D">
                {description}
              </Typography>
            </Box>
          </Grid>
        ))}

        <Grid item xs={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: "16px",
              background: "#FCFBFA",
              boxShadow: "1px 1px 24px 0px rgba(100, 100, 100, 0.10)",
            }}
          >
            <Button
              onClick={() => navigate("add")}
              sx={{ mt: 3, height: "auto" }}
              variant="contained"
            >
              Створити Шаблон
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
