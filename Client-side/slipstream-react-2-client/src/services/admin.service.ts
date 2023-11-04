import axios from "axios";
import authHeader from "./auth-header";

const API_DATA_URL = "http://localhost:8080/api/admin";

export const getAllUsers = async () => {
    return await axios.get(API_DATA_URL + "/allUsers", {headers: authHeader()})
        .then(response => response.data);
};

export const getAddDrivers = async () => {
    return await axios.get(API_DATA_URL + "/addDrivers", {headers: authHeader()})
        .then(response => response.data);
};

export const getUpdateStandings = async () => {
    return await axios.get(API_DATA_URL + "/updateStandings", {headers: authHeader()})
        .then(response => response.data);
};