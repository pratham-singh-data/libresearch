import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DataContext } from '../contexts/DataContext'
import { getSessionData } from '../misc/getSessionData'
import { Home } from '../pages/Home'
import { Search } from '../pages/Search'

export const MainPageRouter = () => {
    const [searchData, setSearchData] = useState(getSessionData());

    useEffect(() => {
      sessionStorage.setItem("libresearch", JSON.stringify(searchData));
    }, [searchData])

  return (
    <DataContext.Provider value={{searchData, setSearchData}}>
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    </DataContext.Provider>
  )
}
