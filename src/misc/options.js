// data retrieved from RapidAPI
export const options = {
  method: "GET",
  headers: {
    "X-User-Agent": "desktop",
    "X-Proxy-Location": "EU",
    "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
    "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
  },
};
