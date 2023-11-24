import ITeam from "../../../../types/team.type.ts";
import {useAllTeamsInLeague} from "../../../../hooks/queries/league-queries.ts";

export default function PreDraftLeagueTable({
                                                currentLeague,
                                                isDraftInProgress,
                                                // openLeague,
                                                // teamsInLeague,
                                            }) {
    const rankedTeams: undefined | Array<ITeam> = useAllTeamsInLeague(currentLeague?.leagueId).data;
    if (isDraftInProgress) {
        rankedTeams?.sort((a, b) => {
            if (currentLeague.currentPickNumber < 11) {
                return a.firstPickNumber! - b.firstPickNumber!
            }
            return a.secondPickNumber! - b.secondPickNumber!
        });
    }

    return (
        <>
            <table className="league-table">
                <caption>
                    <h3>{currentLeague?.leagueName}</h3>
                    {/*<h3>{currentLeague ?*/}
                    {/*    currentLeague?.leagueName*/}
                    {/*    : openLeague?.leagueName}*/}
                    {/*</h3>*/}
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