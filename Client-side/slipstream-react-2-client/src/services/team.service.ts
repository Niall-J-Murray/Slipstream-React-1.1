import axios from "axios";
import authHeader from "./auth-header.ts";

const API_DATA_URL = "http://localhost:8080/api/team/";

export const getTeam = async (teamId: number | null | undefined) => {
    const data = await axios.get(API_DATA_URL + teamId, {headers: authHeader()})
        .then(response => response.data);
    return data;
};

export const postCreateTeam = async (userId: number | null | undefined, teamName: string) => {
    const response = await axios
        .post(API_DATA_URL + userId, {
            // headers: authHeader(),
            teamName,
        });
    if (response.data) {
        return response.data;
    }
};

export const postCreateTestTeam = async (leagueId: number | null | undefined) => {
    const response = await axios
        .post(API_DATA_URL + leagueId + "/createTestTeam", {
            // headers: authHeader(),
            leagueId,
        })
     
    if (response.data) {
        return response.data;
    }
};