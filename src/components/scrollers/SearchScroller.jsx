import { Avatar, Box, Button, CircularProgress, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { executeSearch } from '../../misc/executeSearch';
import { SearchCard } from '../cards.jsx/SearchCard';
import LogoIMG from "../../assets/logo.png";

export const SearchScroller = ({runSearch, setRunSearch, isLoading, setIsLoading}) => {
  const {searchData} = useContext(DataContext);
  const [searchFullData, setSearchFullData] = useState([]);
  const [displaySearchData, setDisplaySearchData] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(15);
  const [dataLoadingDone, setDataLoadingDone] = useState(false);

  useEffect(() => {
    const worker = async () => {
      setDataLoadingDone(false);
      setDisplaySearchData([]);
      setDisplayLimit(15);
      const data = await executeSearch("search", searchData.searchTerm);
      setDataLoadingDone(true);
      setSearchFullData(data.results);
      setRunSearch(false);
    }

    if(! runSearch){
      return;
    }

    worker();
  }, [searchData, runSearch, setRunSearch]);

  useEffect(() => {
    if(searchFullData.length === 0 || setDisplaySearchData.length === displayLimit){
      return;
    }
    setDisplaySearchData(searchFullData.slice(0, displayLimit));
    setIsLoading(false);
  }, [searchFullData, displayLimit, setIsLoading])

  return (
    <Box>
      {dataLoadingDone && searchFullData.length === 0 &&
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <Avatar alt="LibreSearch Logo" src={LogoIMG} sx={{width: "10vh", height: "10vh", mb: "10px", mr: "10px"}} />
          <Typography>No Data to display</Typography>
        </Box>
      }

      {displaySearchData.length !== 0 &&
        displaySearchData.map((entry, index) => <SearchCard data={entry} key={index}/>)
      }

      {isLoading && (!dataLoadingDone || (dataLoadingDone && searchFullData.length !== 0)) &&
        <CircularProgress/>
      }

      {displayLimit < searchFullData.length && !isLoading &&
        <Button variant="contained" sx={{width: "95vw", padding: "10px"}} onClick={() => {
          setIsLoading(true);
          setDisplayLimit(displayLimit + 15)
        }}>
          Load More
        </Button>
      }
    </Box>
  )
}
