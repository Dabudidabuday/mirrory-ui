import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ paddingTop: "200px", textAlign: "center" }}>
      <Typography variant="h3" sx={{ marginBottom: 4 }}>
        Сторінки не існує
      </Typography>

      <Button variant="contained" onClick={() => navigate("/")}>
        Домашня сторінка
      </Button>
    </Box>
  );
};
