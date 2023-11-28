import ITeam from "../../../../types/team.type.ts";
import {useDriversInTeam} from "../../../../hooks/queries/driver-queries.ts";
import IDriver from "../../../../types/driver.type.ts";


export default function PostDraftLeagueTable({currentLeague, rankedTeams}) {

    //  const rankedTeams: ITeam[] = leagueTeams;
    // let rankedTeams: ITeam[] = [];
    // getAllLeagueTeams(currentLeague?.leagueId)
    //     .then(res =>
    //         rankedTeams = res);
    // const rankedTeams = teamsInLeague;
    // console.log("rankedTeams")
    // console.log(rankedTeams)
    // const rankedTeams: Array<ITeam> | undefined = useAllTeamsInLeague(currentLeague?.leagueId).data;
    //
    //
    // function formatLeagueTable() {
    //     // rankedTeams?.map((team: ITeam) => {
    //     // team.drivers = useDriversInTeam(team.id).data;
    //     //     getDriversInTeam(team.id)
    //     //         .then(res =>
    //     //             team.drivers = res)
    //     //     console.log(team.drivers)
    //     // })
    //     rankedTeams?.sort((a, b) => {
    //         return a.ranking! - b.ranking!
    //     });
    // }
    // formatLeagueTable();

    // const driversInTeam = (teamId) => useDriversInTeam(teamId);
    const driversInTeam = useDriversInTeam;
    // function driversInTeam() {
    //     useDriversInTeam2().data;
    // }


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
                    team.drivers = driversInTeam(team.id).data
                    return (
                        <tr key={team.id}>
                            <td>{team.ranking}</td>
                            <td>{team.username}</td>
                            <td>{team.teamName}</td>
                            <td>{team.teamPoints}</td>
                            {/*<td>{driversInTeam(team.id) ? driversInTeam[0]?.shortName : "d1"}</td>*/}
                            {/*<td>{driversInTeam(team.id) ? driversInTeam[1]?.shortName : "d2"}</td>*/}
                            {/*<td>{driversInTeam[0].shortName}</td>*/}
                            {/*<td>{driversInTeam[1].shortName}</td>*/}
                            {/*{team.drivers = driversInTeam(team.id)}*/}
                            {/*<td>{team.drivers[0].surname} ({team.drivers[0].points} - {team.firstPickStartingPoints})</td>*/}

                            {team.drivers?.map((driver: IDriver, i: number) => {
                                return (
                                    <td key={driver.driverId}>
                                        {i==0?
                                            {{team.drivers[i].surname} - {team.drivers[i].points} - {team.firstPickStartingPoints}}
                                            :
                                            {{team.drivers[i].surname} - {team.drivers[i].points} - {team.secondPickStartingPoints}}
                                        }
                                        )
                                        {/*<td>{team.drivers[i].surname} ({team.drivers[i].points} - {team.secondPickStartingPoints})</td>*/}
                                    </td>
                                )
                            })} {/*<td>{team.drivers[1].surname} ({team.drivers[1].points} - {team.firstPickStartingPoints})</td>*/}
                            {/*{team.drivers?.map((driver: IDriver,i: number) => {*/}
                            {/*    return (*/}
                            {/*        <td key={driver.driverId}>*/}
                            {/*            {driver.surname} ({driver.points})*/}
                            {/*        </td>*/}
                            {/*    )*/}
                            {/*})}*/}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    );
}