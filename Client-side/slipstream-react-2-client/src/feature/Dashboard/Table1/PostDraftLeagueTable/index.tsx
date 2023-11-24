import ITeam from "../../../../types/team.type.ts";
import IDriver from "../../../../types/driver.type.ts";
import {getDriversInTeam} from "../../../../services/driver.service.ts";
import {useAllTeamsInLeague} from "../../../../hooks/queries/league-queries.ts";
import {useDriversInTeam} from "../../../../hooks/queries/driver-queries.ts";
import {getAllLeagueTeams} from "../../../../services/league.service.ts";


export default function PostDraftLeagueTable(currentLeague, teamsInLeague) {

    //  const rankedTeams: ITeam[] = leagueTeams;
    // let rankedTeams: ITeam[] = [];
    // getAllLeagueTeams(currentLeague?.leagueId)
    //     .then(res =>
    //         rankedTeams = res);
    // const rankedTeams = teamsInLeague;
    // console.log("rankedTeams")
    // console.log(rankedTeams)
    const rankedTeams: Array<ITeam> | undefined = useAllTeamsInLeague(currentLeague?.leagueId).data;


    function formatLeagueTable() {
        // rankedTeams?.map((team: ITeam) => {
        // team.drivers = useDriversInTeam(team.id).data;
        //     getDriversInTeam(team.id)
        //         .then(res =>
        //             team.drivers = res)
        //     console.log(team.drivers)
        // })
        rankedTeams?.sort((a, b) => {
            return a.ranking! - b.ranking!
        });
    }

    formatLeagueTable();

    return (
        <>
            <table className="league-table">
                <caption>
                    <h3>{currentLeague?.leagueName}</h3>
                    {/*<h3>{currentLeague?.isActive ? "League is active" : "League not active"}</h3>*/}
                </caption>
                <thead>
                <tr>
                    {/*<th className={"ranking"}>#</th>*/}
                    {/*<th className={"username"}>Username</th>*/}
                    {/*<th className={"teamname"}>Teamname</th>*/}
                    {/*<th className={"points"}>Points</th>*/}
                    {/*<th className={"drivers"} colSpan={2}>Drivers</th>*/}
                    <th>Rank</th>
                    <th className={"username"}>Username</th>
                    <th>Teamname</th>
                    <th>Points</th>
                    <th colSpan={2}>Drivers</th>
                </tr>
                </thead>
                <tbody>
                {rankedTeams?.map((team: ITeam) => {
                    return (
                        <tr key={team.id}>
                            <td>{team.ranking}</td>
                            <td>{team.username}</td>
                            <td>{team.teamName}</td>
                            <td>{team.teamPoints}</td>
                            {team.drivers?.map((driver: IDriver) => {
                                return (
                                    <td key={driver.driverId}>
                                        {driver.surname}
                                        {/*<td>{driver.shortName}</td>*/}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    );
}