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
            <table className="league-table">
                <caption>
                    <h3>{currentLeague ?
                        currentLeague?.leagueName
                        : openLeague?.leagueName}</h3>
                </caption>
                <thead>
                <tr>
                    <th id={"username"}>User Name</th>
                    <th id={"team-name"}>Team Name</th>
                    <th>1st Pick</th>
                    <th>2nd Pick</th>
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
        </>
    );
}