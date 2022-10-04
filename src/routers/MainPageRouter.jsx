import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";
import { getSessionData } from "../misc/getSessionData";
import { Home } from "../pages/Home";
import { Search } from "../pages/Search";

export const MainPageRouter = () => {
  const [searchData, setSearchData] = useState(getSessionData());

  useEffect(() => {
    // once the searchData is alterred save it in session storage
    sessionStorage.setItem("libresearch", JSON.stringify(searchData));
  }, [searchData]);

  return (
    <DataContext.Provider value={{ searchData, setSearchData }}>
      <Routes>
        <Route path="/libresearch/home" element={<Home />} />
        <Route path="/libresearch/search" element={<Search />} />
        {/* default path */}
        <Route
          path="/libresearch/*"
          element={<Navigate to="/libresearch/home" />}
        />
      </Routes>
    </DataContext.Provider>
  );
};
