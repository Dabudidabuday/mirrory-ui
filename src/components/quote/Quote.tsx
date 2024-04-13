import React from "react";
import { Box, Typography } from "@mui/material";

interface Quote {
  text: string;
  author: string;
}

export const Quote = ({ quote }: any) => {
  return (
    <>
      <Box>
        <Typography sx={{ textTransform: "uppercase" }}>Цитата дня</Typography>

        <Box
          sx={{
            mt: 2,
          }}
        >
          <Typography mb={3}>{quote.text}</Typography>
          <Typography
            sx={{
              fontFamily: "Caveat, serif",
              fontSize: 20,
              textAlign: "right",
            }}
          >
            {quote.author}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
