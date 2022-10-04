import { Avatar, Box, Tab, Tabs, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import LogoIMG from "../assets/logo.png";
import { ImageScroller } from '../components/scrollers/ImageScroller';
import { NewsScroller } from '../components/scrollers/NewsScroller';
import { SearchScroller } from '../components/scrollers/SearchScroller';
import { VideosScroller } from '../components/scrollers/VideosScroller';
import { DataContext } from '../contexts/DataContext';

export const Search = () => {
  const {searchData, setSearchData} = useContext(DataContext);
  const [runSearch, setRunSearch] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", py: "10px"}}>
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", width: {sm: "60%", xs: "100%"}, mx: "10px"}}>
        <Link to="/home" style={{textDecoration: "none"}}>
          <Avatar alt="LibreSearch Logo" src={LogoIMG} sx={{width: "10vh", height: "10vh", mb: "10px", mr: "10px"}} />
        </Link>
        <TextField value={searchData.searchTerm} onKeyDown={(ev) => {
          if(ev.keyCode === 13){
            setIsLoading(true);
            setRunSearch(true);
          }
        }} onChange={(ev) => {
                setSearchData({...searchData, searchTerm: ev.target.value})
        }} placeholder="Search Here..." variant="outlined" sx={{width: "100%"}}/>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", mb: "10px" }}>
        <Tabs value={searchData.page} aria-label="search tabs">
          <Tab label="Search" value={0} onClick={(ev) => {
            setRunSearch(true);
            setIsLoading(true);
            setSearchData({...searchData, page: 0})
          }} />

          <Tab label="Images" value={1} onClick={(ev) => {
            setRunSearch(true);
            setIsLoading(true);
            setSearchData({...searchData, page: 1})
          }} />

          <Tab label="Videos" value={2} onClick={(ev) => {
            setRunSearch(true);
            setIsLoading(true);
            setSearchData({...searchData, page: 2})
          }} />

          <Tab label="News" value={3} onClick={(ev) => {
            setRunSearch(true);
            setIsLoading(true);
            setSearchData({...searchData, page: 3})
          }} />
        </Tabs>
      </Box>

      {searchData.page === 0 && 
        <SearchScroller runSearch={runSearch} setRunSearch={setRunSearch} isLoading={isLoading} setIsLoading={setIsLoading} />
      }

      {searchData.page === 1 && 
        <ImageScroller runSearch={runSearch} setRunSearch={setRunSearch} isLoading={isLoading} setIsLoading={setIsLoading} />
      }

      {searchData.page === 2 && 
        <VideosScroller runSearch={runSearch} setRunSearch={setRunSearch} isLoading={isLoading} setIsLoading={setIsLoading} />
      }

      {searchData.page === 3 && 
        <NewsScroller runSearch={runSearch} setRunSearch={setRunSearch} isLoading={isLoading} setIsLoading={setIsLoading} />
      }
    </Box>
  )
}
