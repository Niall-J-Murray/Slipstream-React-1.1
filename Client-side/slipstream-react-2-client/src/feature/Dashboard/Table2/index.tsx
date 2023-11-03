import {useEffect, useState} from "react";
import IUser from "../../../types/user.type.ts";
import {getIsDraftInProgress, getTeamLeague} from "../../../services/league.service.ts";
import {getUserData} from "../../../services/user.service.ts";
import ILeague from "../../../types/league.type.ts";
import {getCurrentUser} from "../../../services/auth.service.ts";
import DriverDraftTable from "./DriverDraftTable";
import DriverStandingsTable from "./DriverStandingsTable";
import ITeam from "../../../types/team.type.ts";


export default function Table2({isLeagueFull,isLeagueActive,isDraftInProgress}) {
    // const [currentUser, setCurrentUser]
    //     = useState<IUser | undefined>();
    // const [userData, setUserData]
    //     = useState<IUser | undefined>();
    // const [team, setTeam]
    //     = useState<ITeam | undefined>();
    // const [currentLeague, setCurrentLeague]
    //     = useState<ILeague | undefined>();
    // const [draftInProgress, setDraftInProgress]
    //     = useState<boolean>(false);

    // useEffect(() => {
    //     const user = getCurrentUser();
    //     setCurrentUser(user);
    //     const fetchUserData = async () => {
    //         if (user != null) {
    //             const userData = await getUserData(user.id);
    //             setUserData(userData);
    //             setTeam(userData.team)
    //
    //             if (team?.id) {
    //                 const leagueData = await getTeamLeague(team.id);
    //                 setCurrentLeague(leagueData);
    //                 getIsDraftInProgress(leagueData.leagueId).then(function (response) {
    //                     setDraftInProgress(response);
    //                 })
    //             }
    //         }
    //     }
    //     fetchUserData().catch(console.error);
    // }, []);

    function DriverTable() {
        console.log(isDraftInProgress)
        if (isDraftInProgress) {
            return <DriverDraftTable/>;
        }
        return <DriverStandingsTable/>;
    }

    return (
        <DriverTable/>
    );
}