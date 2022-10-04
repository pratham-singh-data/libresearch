import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const ImageCard = ({ data }) => {
  return (
    <Box>
      <Avatar
        alt="LibreSearch Logo"
        src={data.image.src}
        variant="square"
        sx={{ width: "40vh", height: "40vh", mb: "10px", mr: "10px" }}
      />
      <Box sx={{ width: "40vh" }}>
        <a
          href={data.link.href}
          style={{ color: "#000000", textDecoration: "underline" }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {data.link.title}
          </Typography>
        </a>
      </Box>
    </Box>
  );
};
