import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const ImageCard = ({ data }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#cccccc",
        margin: "10px",
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
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textDecoration: "underline",
              color: "#1938d2",
            }}
          >
            {data.link.title}
          </Typography>
        </a>
      </Box>
    </Box>
  );
};
