import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../contexts/DataContext';
import { executeSearch } from '../../misc/executeSearch';

export const ScholarScroller = ({runSearch, setRunSearch, isLoading, setIsLoading}) => {
  const {searchData} = useContext(DataContext);
  const [searchFullData, setSearchFullData] = useState([]);
  const [displaySearchData, setDisplaySearchData] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(10);
  const [dataLoadingDone, setDataLoadingDone] = useState(false);

  useEffect(() => {
    const worker = async () => {
      setDataLoadingDone(false);
      setDisplaySearchData([]);
      setDisplayLimit(10);
      const data = await executeSearch("scholar", searchData.searchTerm);
      console.log(data);
      setDataLoadingDone(true);
      setSearchFullData(data.image_results);
      setRunSearch(false);
    }

    if(! runSearch){
      return;
    }

    worker();
  }, [searchData, runSearch, setRunSearch]);

  return (
    <Box>
      ScholarScroller
    </Box>
  )
}
