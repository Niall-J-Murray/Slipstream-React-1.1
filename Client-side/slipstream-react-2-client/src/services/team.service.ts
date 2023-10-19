import axios from "axios";
import authHeader from "./auth-header.ts";

const API_URL = "http://localhost:8080/api/test/";
const API_DATA_URL = "http://localhost:8080/api/team/";

// export const validateTeam = () => {
//     const teamName = document.getElementById('teamName');
//     const teamNameMessage = document.getElementById('team-name-message');
//
//     if (teamName.value.trim() === "") {
//         teamNameMessage.innerText = "Please choose a team name";
//         teamName.focus();
//         return false;
//     }
//
//     if (!teamIsValid(teamName.value)) {
//         teamNameMessage.innerText = "Please choose a team name";
//         teamName.focus();
//         return false;
//     }
//
//     return true;
// }

// const teamIsValid = team => {
//     return /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(team);
// }

export const getUserBoard = () => {
    return axios.get(API_URL + "league", {headers: authHeader()});
};

export const getTeamLeague = async (teamId: number | null | undefined) => {
    const data = await axios.get(API_DATA_URL + "team/" + teamId, {headers: authHeader()})
        .then(response => response.data);
    return data;
};

// export const createTeam = async (userId: number | null | undefined) => {
//     const data = await axios.post(API_DATA_URL + "team/" + userId, {headers: authHeader()})
//         .then(response => response.data);
//     return data;
// };

export const createTeam = async (userId: number | null| undefined, teamName: string) => {
    const response = await axios
        .post(API_DATA_URL + "team/" + userId, {
            // headers: authHeader(),
            teamName,
        });
    if (response.data) {
        return response.data;
    }
};