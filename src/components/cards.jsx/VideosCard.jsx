import { Box, Typography } from "@mui/material";
import React from "react";

export const VideosCard = ({ data }) => {
  return (
    <a href={data.link} style={{ color: "#000000", textDecoration: "none" }}>
      <Box
        sx={{
          width: "95vw",
          backgroundColor: "#cccccc",
          mb: "10px",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          "&:hover": {
            border: "2px solid #d48b07",
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textDecoration: "underline" }}
        >
          {data.title}
        </Typography>
        <Typography variant="p">{data.description}</Typography>
      </Box>
    </a>
  );
};
