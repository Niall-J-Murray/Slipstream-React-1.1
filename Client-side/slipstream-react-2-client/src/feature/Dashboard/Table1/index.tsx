import PostDraftLeagueTable from "./PostDraftLeagueTable";
import PreDraftLeagueTable from "./PreDraftLeagueTable";
import {useAllTeamsInLeague} from "../../../hooks/queries/league-queries.ts";
import ITeam from "../../../types/team.type.ts";
import {useEffect} from "react";

export default function Table1({isLeagueActive, currentLeague, isDraftInProgress}) {
    const rankedTeams: Array<ITeam> | undefined = useAllTeamsInLeague(currentLeague?.leagueId).data;

    useEffect(() => {

    }, [rankedTeams]);

    if (isDraftInProgress) {
        rankedTeams?.sort((a, b) => {
            if (currentLeague.currentPickNumber < 11) {
                return a.firstPickNumber! - b.firstPickNumber!
            }
            return a.secondPickNumber! - b.secondPickNumber!
        });
    } else {
        rankedTeams?.sort((a, b) => {
            return a.ranking! - b.ranking!
        });
    }

    function LeagueTable() {
        if (isLeagueActive) {
            return <PostDraftLeagueTable
                currentLeague={currentLeague}
                rankedTeams={rankedTeams}/>
        }
        return <PreDraftLeagueTable
            currentLeague={currentLeague}
            rankedTeams={rankedTeams}/>
    }

    return (
        <LeagueTable/>
    );
}