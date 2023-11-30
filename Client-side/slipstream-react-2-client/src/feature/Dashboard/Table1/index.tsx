import PostDraftLeagueTable from "./PostDraftLeagueTable";
import PreDraftLeagueTable from "./PreDraftLeagueTable";
import {useAllTeamsInLeague} from "../../../hooks/queries/league-queries.ts";
import ITeam from "../../../types/team.type.ts";

export default function Table1({isLeagueActive, currentLeague, isDraftInProgress}) {
    // const [rankedTeams, setRankedTeams]
    //     = useState<Array<ITeam> | undefined | null>([]);
    const teamsInLeague: Array<ITeam> | undefined | null = useAllTeamsInLeague(currentLeague?.leagueId).data;

    // useEffect(() => {
    //     setRankedTeams(sortTeams(teamsInLeague))
    // }, [teamsInLeague]);

    // function sortTeams(teams: Array<ITeam> | undefined | null) {
    // if (isDraftInProgress) {
    //     teams?.sort((a, b) => {
    //         if (currentLeague.currentPickNumber < 11) {
    //             return a.firstPickNumber! - b.firstPickNumber!
    //         }
    //         return a.secondPickNumber! - b.secondPickNumber!
    //     });
    // } else {
    //     teams?.sort((a, b) => {
    //         return a.ranking! - b.ranking!
    //     });
    // }
    //     return teams;
    // }

    function LeagueTable() {
        if (isLeagueActive) {
            return <PostDraftLeagueTable
                currentLeague={currentLeague}
                // rankedTeams={rankedTeams}
                teamsInLeague={teamsInLeague}
            />
        }
        return <PreDraftLeagueTable
            currentLeague={currentLeague}
            // rankedTeams={rankedTeams}
            teamsInLeague={teamsInLeague}
        />
    }

    return (
        <LeagueTable/>
    );
}