import ITeam from "../../../../types/team.type.ts";
import {Fragment, useEffect} from "react";

export default function PreDraftLeagueTable({currentLeague, leagueSize, teamsInLeague, isDraftInProgress}) {
    // const [rankedTeams, setRankedTeams]
    //     = useState<Array<ITeam> | undefined | null>([]);
    // useEffect(() => {
    //     setRankedTeams(sortTeams(teamsInLeague));
    // }, [leagueSize, rankedTeams, teamsInLeague]);
    useEffect(() => {

    }, [leagueSize]);

    function sortTeams(teams: ITeam[]) {
        if (isDraftInProgress) {
            teams?.sort((a: ITeam, b: ITeam) => {
                if (currentLeague.currentPickNumber < 11) {
                    return a.firstPickNumber! - b.firstPickNumber!
                }
                return a.secondPickNumber! - b.secondPickNumber!
            });
        }
        return teams;
    }

    const rankedTeams = sortTeams(teamsInLeague);

    return (
        <>
            <table className="league-table">
                <caption>
                    {isDraftInProgress ?
                        <h3>{currentLeague?.leagueName}</h3>
                        :
                        <h3>{currentLeague?.leagueName} - {leagueSize}/10 full</h3>}
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
                {leagueSize == 0 ?
                    <tr>
                        <td colSpan={4}>Create a team to join this league</td>
                    </tr>
                    :
                    <>
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
                    </>}
                </tbody>
            </table>
        </>
    );
}