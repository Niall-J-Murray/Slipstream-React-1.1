import ITeam from "../../../../types/team.type.ts";
import IDriver from "../../../../types/driver.type.ts";


export default function PostDraftLeagueTable({currentLeague, leagueTeams}) {

    const rankedTeams: ITeam[] = leagueTeams;
    rankedTeams.sort((a, b) => {
        return a.ranking - b.ranking
    });


    // function getDrivers(team:ITeam){
    //    teamDrivers = team.drivers;
    //     console.log(teamDrivers);
    //     return teamDrivers;
    // }

    // let teamDrivers = getDrivers();
    return (
        <>
            <div className="col-start-2 col-span-1.5">
                <table className="league-table">
                    <caption>
                        <h3>{currentLeague?.leagueName}</h3>
                    </caption>
                    <thead>
                    <tr>
                        <th className={"ranking"}>#</th>
                        <th className={"username"}>Username</th>
                        <th className={"teamname"}>Teamname</th>
                        <th className={"points"}>Points</th>
                        <th className={"drivers"}>Drivers</th>
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
                                        <tr key={driver.driverId}>
                                            <td>{driver ? driver.shortName:""}</td>
                                        </tr>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
}