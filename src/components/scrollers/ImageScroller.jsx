import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { executeSearch } from "../../misc/executeSearch";
import LogoIMG from "../../assets/logo.png";
import { ImageCard } from "../cards.jsx/ImageCard";

export const ImageScroller = ({
  runSearch,
  setRunSearch,
  isLoading,
  setIsLoading,
}) => {
  const { searchData } = useContext(DataContext);
  const [searchFullData, setSearchFullData] = useState([]);
  const [displaySearchData, setDisplaySearchData] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(10);
  const [dataLoadingDone, setDataLoadingDone] = useState(false);

  useEffect(() => {
    const worker = async () => {
      // disabled reruns of worker function
      setRunSearch(false);

      // set that we are now loading data
      setDataLoadingDone(false);

      // clear data to display
      setDisplaySearchData([]);

      // 10 entries are to be displayed at once
      setDisplayLimit(10);

      // retrieve results
      const data = await executeSearch("image", searchData.searchTerm);

      // set that we are done loading data; this will tell application if there are no data points to display
      setDataLoadingDone(true);

      // set full display database
      setSearchFullData(data.image_results);
    };

    // only run the worker function if enter is pressed
    if (!runSearch) {
      // necessary as otherwise the useEffect will cause an infinite loop
      return;
    }

    worker();
  }, [searchData, runSearch, setRunSearch]);

  useEffect(() => {
    // do not execute if we have either displayed the full dataset or already displaying upto the display limit
    if (
      searchFullData.length === 0 ||
      setDisplaySearchData.length === displayLimit
    ) {
      return;
    }

    // slice the datatset to display only data from 0 to displayLimit
    setDisplaySearchData(searchFullData.slice(0, displayLimit));

    // set that we are done loading
    setIsLoading(false);
  }, [searchFullData, displayLimit, setIsLoading]);

  return (
    <Box sx={{ width: "95vw", padding: "10px" }}>
      {/* this will be shown if after loading the full dataset we retrieved no data from the API */}
      {dataLoadingDone && searchFullData.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="LibreSearch Logo"
            src={LogoIMG}
            sx={{ width: "10vh", height: "10vh", mb: "10px", mr: "10px" }}
          />
          <Typography>No Data to display</Typography>
        </Box>
      )}

      {/* display image cards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {displaySearchData.length !== 0 &&
          displaySearchData.map((entry, index) => (
            <ImageCard data={entry} key={index} />
          ))}
      </Box>

      {/* display circular progress if data is still loading i.e. displaySearchData is empty */}
      {isLoading &&
        (!dataLoadingDone ||
          (dataLoadingDone && searchFullData.length !== 0)) && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}

      {/* button to increase the displayLimit */}
      {displayLimit < searchFullData.length && !isLoading && (
        <Button
          variant="contained"
          sx={{ width: "95vw", padding: "10px" }}
          onClick={() => {
            setIsLoading(true);
            setDisplayLimit(displayLimit + 10);
          }}
        >
          Load More
        </Button>
      )}
    </Box>
  );
};
