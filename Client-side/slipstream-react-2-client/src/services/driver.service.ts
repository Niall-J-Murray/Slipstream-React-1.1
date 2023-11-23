import axios from "axios";
import authHeader from "./auth-header";
import IDriver from "../types/driver.type.ts";

const API_URL = "http://localhost:8080/api/test/";
const API_DATA_URL = "http://localhost:8080/api/driver";

export const getUserBoard = () => {
    return axios.get(API_URL + "driver", {headers: authHeader()});
};

export const getDriverData = async (driverId: number | null | undefined) => {
    const data = await axios.get(API_DATA_URL + "/" + driverId, {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getAllDrivers = async () => {
    const data = await axios.get(API_DATA_URL + "/allDrivers", {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getDriversInTeam = async (teamId: number | null | undefined): Promise<Array<IDriver>> => {
    const data = await axios.get(API_DATA_URL + "/driversInTeam/" + teamId, {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getUndraftedDrivers = async (leagueId: number | null | undefined) => {
    const data = await axios.get(API_DATA_URL + "/undraftedDrivers/" + leagueId, {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const postPickDriver = async (userId: number | null | undefined, driverId: string | number | null | undefined) => {
    const response = await axios
        .post(API_DATA_URL + "/pick/" + userId,
            {

                driverId: driverId,
            });
    if (response.data) {
        return response.data;
    }
};