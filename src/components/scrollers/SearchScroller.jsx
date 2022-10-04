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
import { SearchCard } from "../cards.jsx/SearchCard";
import LogoIMG from "../../assets/logo.png";

export const SearchScroller = ({
  runSearch,
  setRunSearch,
  isLoading,
  setIsLoading,
}) => {
  const { searchData } = useContext(DataContext);
  const [searchFullData, setSearchFullData] = useState([]);
  const [displaySearchData, setDisplaySearchData] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(15);
  const [dataLoadingDone, setDataLoadingDone] = useState(false);

  useEffect(() => {
    const worker = async () => {
      // disabled reruns of worker function
      setRunSearch(false);

      // set that we are now loading data
      setDataLoadingDone(false);

      // clear data to display
      setDisplaySearchData([]);

      // 15 entries are to be displayed at once
      setDisplayLimit(15);

      // retrieve results
      const data = await executeSearch("search", searchData.searchTerm);

      // set that we are done loading data; this will tell application if there are no data points to display
      setDataLoadingDone(true);

      // set full display database
      setSearchFullData(data.results);
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
    <Box>
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

      {/* display search cards */}
      {displaySearchData.length !== 0 &&
        displaySearchData.map((entry, index) => (
          <SearchCard data={entry} key={index} />
        ))}

      {/* display circular progress if data is still loading i.e. displaySearchData is empty */}
      {isLoading &&
        (!dataLoadingDone ||
          (dataLoadingDone && searchFullData.length !== 0)) && (
          <CircularProgress />
        )}

      {/* button to increase the displayLimit */}
      {displayLimit < searchFullData.length && !isLoading && (
        <Button
          variant="contained"
          sx={{ width: "95vw", padding: "10px" }}
          onClick={() => {
            setIsLoading(true);
            setDisplayLimit(displayLimit + 15);
          }}
        >
          Load More
        </Button>
      )}
    </Box>
  );
};
