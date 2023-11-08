import axios from "axios";
import authHeader from "./auth-header";
import {postPickDriver} from "./driver.service.ts";


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

export const getPickNumber = async (leagueId: number | null | undefined) => {
    const data = await axios.get(API_DATA_URL + leagueId + "/getPickNumber", {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const getNextPickName = async (leagueId: number | null | undefined) => {
    const data = await axios.get(API_DATA_URL + leagueId + "/getNextPickName", {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const postToggleTestLeague = async (leagueId: number | null | undefined) => {
    const response = await axios
        .post(API_DATA_URL + leagueId + "/toggleTestLeague", {
            // headers: authHeader(),
            leagueId
        });
    if (response.data) {
        console.log("postToggleTestLeague:")
        console.log(response.data)
        return response.data;
    }
};

export const handlePick = (userId: number | null | undefined, driverId: string) => {
    // const {driverId} = formValue;
    console.log("handlePick");
    console.log(userId);
    console.log(driverId);
    // setMessage("");
    // setLoading(true);

    postPickDriver(userId, driverId).then(
        () => {
            window.location.reload();
        },
        (error) => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            // setLoading(false);
            // setMessage(resMessage);
        }
    );
};