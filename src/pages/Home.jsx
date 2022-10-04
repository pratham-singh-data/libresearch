import { Avatar, Box, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LogoIMG from "../assets/logo.png";
import { DataContext } from "../contexts/DataContext";

export const Home = () => {
  const { searchData, setSearchData } = useContext(DataContext);
  const [searchEnterred, setSearchEnterred] = useState(false);

  // if searchTerm is empty then set SearchEnterred to false otherwise search will be immediately executed on entry of any charachter
  useEffect(() => {
    if (searchData.searchTerm === "") {
      setSearchEnterred(false);
    }
  }, [searchData, searchEnterred]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "90vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: { sm: "60%", xs: "100%" },
          px: "20px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          alt="LibreSearch Logo"
          src={LogoIMG}
          sx={{ width: "25vh", height: "25vh", mb: "10px" }}
        />
        <TextField
          value={searchData.searchTerm}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              setSearchEnterred(true);
            }
          }}
          onChange={(ev) => {
            setSearchData({ ...searchData, searchTerm: ev.target.value });
          }}
          placeholder="Search Here..."
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </Box>

      {/* navigate to search page only if a search value is enterred */}
      {searchEnterred && searchData.searchTerm !== "" && (
        <Navigate to="/search" />
      )}
    </Box>
  );
};
