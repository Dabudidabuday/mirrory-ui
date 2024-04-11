import React from "react";
import { Box, Typography } from "@mui/material";

interface Quote {
  text: string;
  author: string;
}

export const Quote = ({ quote }: any) => {
  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        borderRadius: "16px",
        background: "#FCFBFA",
        boxShadow: "1px 1px 24px 0px rgba(100, 100, 100, 0.10)",
      }}
    >
      <Typography mb={5}>{quote.text}</Typography>
      <Typography
        sx={{
          fontFamily: "Caveat, serif",
          fontSize: 20,
        }}
      >
        {quote.author}
      </Typography>
    </Box>
  );
};
