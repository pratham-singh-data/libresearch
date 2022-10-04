import { options } from "./options";

export const executeSearch = (type, query) => {
    return fetch(`https://google-search3.p.rapidapi.com/api/v1/${type}/q=${query}&num=500`, options)
	.then(response => response.json())
	.then(response => response)
	.catch(err => console.error(err));
}