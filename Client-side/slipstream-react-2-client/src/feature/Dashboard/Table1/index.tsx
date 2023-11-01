import IUser from "../../../types/user.type.ts";
import ILeague from "../../../types/league.type.ts";
import {useEffect, useState} from "react";
import {getIsLeagueActive, getOpenLeague, getTeamLeague} from "../../../services/league.service.ts";
import {getUserData} from "../../../services/user.service.ts";
import {getCurrentUser} from "../../../services/auth.service.ts";
import PostDraftLeagueTable from "../PostDraftLeagueTable";
import PreDraftLeagueTable from "../PreDraftLeagueTable";
import ITeam from "../../../types/team.type.ts";

export default function Table1({isLeagueActive,currentLeague,leagueTeams}) {
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
    // const [openLeague, setOpenLeague]
    //     = useState<ILeague | undefined>();
    // const [isLeagueActive, setIsLeagueActive]
    //     = useState<boolean>(false);

    // doSomething()
    //     .then((result) => doSomethingElse(result))
    //     .then((newResult) => doThirdThing(newResult))
    //     .then((finalResult) => {
    //         console.log(`Got the final result: ${finalResult}`);
    //     })
    //     .catch(failureCallback);
    // Important: Always return results,
    // otherwise callbacks won't catch the result of a previous promise
    // (with arrow functions, () => x is short for () => { return x; }).
    // If the previous handler started a promise but did not return it,
    // there's no way to track its settlement anymore,
    // and the promise is said to be "floating".

    // useEffect(() => {
    //     const user = getCurrentUser();
    //     setCurrentUser(user);
    //     const fetchUserData = async () => {
    //         if (user != null) {
    //             const userData = await getUserData(user.id);
    //             setUserData(userData);
    //             setTeam(userData.team)
    //
    //             getOpenLeague().then(function (response) {
    //                 setOpenLeague(response);
    //             })
    //             if (team?.id) {
    //                 // let leagueData = await getTeamLeague(userData.team.id);
    //                 const leagueData = await getTeamLeague(team.id);
    //                 setCurrentLeague(leagueData);
    //                 getIsLeagueActive(leagueData.leagueId).then(function (response) {
    //                     setIsLeagueActive(response);
    //                 })
    //             }
    //         }
    //     }
    //     fetchUserData().catch(console.error);
    // }, []);

    function LeagueTable() {
        if (isLeagueActive) {
            return <PostDraftLeagueTable currentLeague={currentLeague} leagueTeams={leagueTeams}/>;
        }
        return <PreDraftLeagueTable currentLeague={currentLeague} leagueTeams={leagueTeams}/>;
    }

    return (
        <LeagueTable/>
    );
}