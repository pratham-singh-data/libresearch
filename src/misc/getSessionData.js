export const getSessionData = () => {
    if(sessionStorage.getItem("libresearch")){
        return JSON.parse(sessionStorage.getItem("libresearch"));
    }

    return {searchTerm: "", page: 0};
}