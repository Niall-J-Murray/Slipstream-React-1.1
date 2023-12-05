import PostDraftLeagueTable from "./PostDraftLeagueTable";
import PreDraftLeagueTable from "./PreDraftLeagueTable";
import {useAllTeamsInLeague} from "../../../hooks/queries/league-queries.ts";
import ITeam from "../../../types/team.type.ts";
import {useEffect} from "react";

export default function Table1({isLeagueActive, currentLeague, isDraftInProgress}) {
    // const [rankedTeams, setRankedTeams]
    //     = useState<Array<ITeam> | undefined | null>([]);
    const teamsInLeague: Array<ITeam> | undefined | null = useAllTeamsInLeague(currentLeague?.leagueId).data;
    // useEffect(() => {
    //
    // }, [teamsInLeague]);

    function LeagueTable() {
        if (isLeagueActive) {
            return <PostDraftLeagueTable
                currentLeague={currentLeague}
                teamsInLeague={teamsInLeague}
                isDraftInProgress={isDraftInProgress}
            />
        }
        return <PreDraftLeagueTable
            currentLeague={currentLeague}
            teamsInLeague={teamsInLeague}
            isDraftInProgress={isDraftInProgress}
        />
    }

    return (
        <LeagueTable/>
    );
}