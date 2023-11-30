import ITeam from "../../../../types/team.type.ts";

export default function PreDraftLeagueTable({currentLeague, teamsInLeague}) {
    // if (isDraftInProgress) {
    teamsInLeague?.sort((a: ITeam, b: ITeam) => {
        if (currentLeague.currentPickNumber < 11) {
            return a.firstPickNumber! - b.firstPickNumber!
        }
        return a.secondPickNumber! - b.secondPickNumber!
    });
    // }
    return (
        <>
            <table className="league-table">
                <caption>
                    <h3>{currentLeague?.leagueName}</h3>
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
                {teamsInLeague?.map((team: ITeam) => {
                    if (teamsInLeague.length != 0) {
                        return (
                            <tr key={team.id}>
                                <td>{team.username}</td>
                                <td>{team.teamName}</td>
                                <td>{team.firstPickNumber}</td>
                                <td>{team.secondPickNumber}</td>
                            </tr>
                        )
                    } else {
                        return (
                            <tr>
                                <td>
                                    No teams yet
                                </td>
                            </tr>

                        )
                    }
                })}
                </tbody>
            </table>
        </>
    );
}