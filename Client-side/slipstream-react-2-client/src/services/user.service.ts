import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
const API_DATA_URL = "http://localhost:8080/api/";

export const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

export const getUserBoard = () => {
    return axios.get(API_URL + "user", {headers: authHeader()});
};

export const getUserData = async (userId: number | null | undefined) => {

    const data = await axios.get(API_DATA_URL + "user/" + userId, {headers: authHeader()})
        .then(response => response.data);
    // console.log("user service response data")
    // console.log(data)
    // console.log("user service response data.team")
    // console.log(data.team)
    return data;
};

export const getModeratorBoard = () => {
    return axios.get(API_URL + "mod", {headers: authHeader()});
};

export const getAdminBoard = () => {
    return axios.get(API_URL + "admin", {headers: authHeader()});
};