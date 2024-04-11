import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import star from "../../assets/star.png";

export const Complete = () => {
  return (
    <Container
      sx={{
        width: "100%",
        // height: "100%",
        backgroundColor: "#F3EEE5",
        borderRadius: "16px",
        padding: "45px",
      }}
    >
      <Box
        sx={{
          maxWidth: "270px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          textAlign: "center",
        }}
      >
        <img src={star} width={100} style={{ alignSelf: "center" }} />
        <Typography variant="h6" sx={{ marginBottom: "72px", marginTop: 3 }}>
          Рефлексія завершена!
        </Typography>

        <Button size="large" variant="contained" sx={{ marginBottom: 2 }}>
          Сформувати план дій
        </Button>
        <Button size="large" variant="outlined">
          Вийти
        </Button>
      </Box>
    </Container>
  );
};
