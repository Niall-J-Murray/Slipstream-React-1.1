import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
const API_DATA_URL = "http://localhost:8080/api/league/";

export const getUserBoard = () => {
    return axios.get(API_URL + "league", {headers: authHeader()});
};

export const getOpenLeague = async () => {
    const data = await axios.get(API_DATA_URL + "openLeague", {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getLeagueData = async (leagueId: number | null | undefined) => {
    const data = await axios.get(API_DATA_URL + leagueId, {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getAllLeagueTeams = async (leagueId: number | null | undefined) => {
    const data = await axios.get(API_DATA_URL + leagueId + "/allTeams", {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getTeamLeague = async (teamId: number | null | undefined) => {
    const data = await axios.get(API_DATA_URL + "team/" + teamId, {headers: authHeader()})
        .then(response => response.data);
    console.log("getTeamLeague")
    console.log(data)
    return data;
};

export const getIsDraftInProgress = async (leagueId: number | null | undefined) => {
    const data = await axios.get(API_DATA_URL + leagueId + "/isDraftInProgress", {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getIsLeagueActive = async (leagueId: number | null | undefined) => {
    const data = await axios.get(API_DATA_URL + leagueId + "/isLeagueActive", {headers: authHeader()})
        .then(response => response.data);
    return data;
};
