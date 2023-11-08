import ITeam from "../../../../types/team.type.ts";

export default function PreDraftLeagueTable({openLeague, currentLeague, leagueTeams, isDraftInProgress}) {
    const rankedTeams: ITeam[] = leagueTeams;
    if (isDraftInProgress) {
        rankedTeams.sort((a, b) => {
            return a.ranking - b.ranking
        });
    }

    return (
        <>
            <div className="col-start-2 col-span-1.5">
                <table className="league-table">
                    <caption>
                        <h3>{currentLeague ?
                            currentLeague?.leagueName
                            : openLeague?.leagueName}</h3>
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
                    {rankedTeams?.map((team: ITeam) => {
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