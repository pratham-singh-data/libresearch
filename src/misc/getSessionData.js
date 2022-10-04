export const getSessionData = () => {
  // retrive the session data of libreSearch
  if (sessionStorage.getItem("libresearch")) {
    return JSON.parse(sessionStorage.getItem("libresearch"));
  }

  // return the default object if no data has been saved
  return { searchTerm: "", page: 0 };
};
