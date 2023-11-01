import {useEffect, useState} from "react";
import {getCurrentUser} from "../../../services/auth.service.ts";
import {getUserData} from "../../../services/user.service.ts";
import {getAllLeagueTeams, getTeamLeague} from "../../../services/league.service.ts";
import IUser from "../../../types/user.type.ts";
import ILeague from "../../../types/league.type.ts";
import ITeam from "../../../types/team.type.ts";


export default function PostDraftLeagueTable({currentLeague,leagueTeams}) {
    // const [currentUser, setCurrentUser]
    //     = useState<IUser | undefined>();
    // const [userData, setUserData]
    //     = useState<IUser | undefined>();
    // const [team, setTeam]
    //     = useState<ITeam | undefined>();
    // const [leagueTeams, setLeagueTeams]
    //     = useState<Array<ITeam> | undefined>([]);
    // const [currentLeague, setCurrentLeague]
    //     = useState<ILeague | undefined>();
    //
    // useEffect(() => {
    //     let user = getCurrentUser();
    //     setCurrentUser(user);
    //     const fetchUserData = async () => {
    //         if (user != null) {
    //             let userData = await getUserData(user.id);
    //             setUserData(userData);
    //             setTeam(userData.team)
    //
    //             let leagueData = await getTeamLeague(userData.team.id);
    //             setCurrentLeague(leagueData);
    //             await getAllLeagueTeams(leagueData.leagueId).then(function (response) {
    //                 setLeagueTeams(response)
    //             })
    //         }
    //     }
    //     fetchUserData().catch(console.error);
    //
    //     // console.log("PostDraftLeagueTable:")
    //     // console.log(currentUser)
    //     // console.log(userData)
    //     // console.log(team)
    // }, []);

return (
    <>
        <div className="col-start-2 col-span-1.5">
            <table className="league-table">
                <caption>
                    <h3>{currentLeague?.leagueName}</h3>
                </caption>
                <thead>
                <tr>
                    <th className={"username"}>Username</th>
                    <th className={"teamname"}>Teamname</th>
                    <th>1st<br/>Pick</th>
                    <th>2nd<br/>Pick</th>
                </tr>
                </thead>
                <tbody>
                {leagueTeams?.map(team => {
                    return (
                        <tr key={team.id}>
                            <td>{team.username}</td>
                            <td>{team.teamName}</td>
                            <td>{team.firstPickNumber}</td>
                            <td>{team.secondPickNumber}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    </>
);
}