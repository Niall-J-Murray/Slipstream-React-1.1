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

// export const getAllLeagueTeams = async (leagueId: number | null | undefined) => {
//     const data = await axios.get(API_DATA_URL + "league/" + leagueId + "/allTeams", {headers: authHeader()})
//         .then(response => response.data);
//     return data;
// };
//
// export const getTeamLeague = async (teamId: number | null | undefined) => {
//     const data = await axios.get(API_DATA_URL + "league/team/" + teamId, {headers: authHeader()})
//         // .then(response => response.data);
//         .then(response => response.data);
//     return data;
// };

