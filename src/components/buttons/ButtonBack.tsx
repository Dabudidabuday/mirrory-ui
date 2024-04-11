import React from "react";
import { ChevronLeftOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={
        <ChevronLeftOutlined
          sx={{
            backgroundColor: "#FCFBFA",
            padding: 1,
            borderRadius: "8px",
          }}
        />
      }
      onClick={() => {
        navigate(-1);
      }}
    >
      Назад
    </Button>
  );
};
