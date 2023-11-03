import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
const API_DATA_URL = "http://localhost:8080/api/";

export const getUserBoard = () => {
    return axios.get(API_URL + "driver", {headers: authHeader()});
};

export const getDriverData = async (driverId: number | null | undefined) => {
    const data = await axios.get(API_DATA_URL + "driver/" + driverId, {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getAllDrivers = async () => {
    const data = await axios.get(API_DATA_URL + "driver/allDrivers", {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getUndraftedDrivers = async (leagueId: number | null | undefined) => {
    const data = await axios.get(API_DATA_URL + "driver/undraftedDrivers/" + leagueId, {headers: authHeader()})
        .then(response => response.data);
    return data;
};



export const postPickDriver = async (userId: number | null | undefined, driverId: string | number | null | undefined) => {
    const response = await axios
        .post(API_DATA_URL + "driver/pick/" + userId,
            {
                // headers: authHeader(),
                userId,
                driverId,
            });
    // .then(response => response.data);
    if (response.data) {
        console.log("postPickDriver:")
        console.log(response.data)
        return response.data;
    }
};