import React from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { ButtonBack } from "../../components/buttons/ButtonBack";

export const MyNotes = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["my notes"],
    queryFn: async () => {
      const response = await api.post(`notes/my`);

      return response.data;
    },
  });

  if (isLoading) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  return (
    <>
      <ButtonBack />
      <Typography variant="h3">Мої записи</Typography>

      <Grid container sx={{ gap: 3 }}>
        {data.map(
          ({ template: { name, description, question, id }, id: note_id }) => (
            <Grid
              item
              xs={4}
              sx={{
                marginTop: 4,
                padding: 3,
                borderRadius: "16px",
                background: "#FCFBFA",
                boxShadow: "1px 1px 24px 0px rgba(100, 100, 100, 0.10)",
              }}
              key={note_id}
            >
              <Box>📝</Box>

              <Typography variant="h5">{name}</Typography>
              {/* <Typography variant="h6">{description}</Typography> */}

              {question
                ?.sort((a, b) => a.order - b.order)
                .map(({ name, answer }) => (
                  <Box key={name}>
                    <Typography>{name}</Typography>

                    {answer.map(({ text }) => (
                      <Typography
                        key={text}
                        sx={{ marginBottom: 1, fontWeight: 700 }}
                      >
                        {text}
                      </Typography>
                    ))}
                  </Box>
                ))}

              <Button
                variant="contained"
                sx={{ marginTop: 2 }}
                onClick={() => navigate(note_id)}
              >
                Почати процес
              </Button>
            </Grid>
          )
        )}
      </Grid>
    </>
  );
};
