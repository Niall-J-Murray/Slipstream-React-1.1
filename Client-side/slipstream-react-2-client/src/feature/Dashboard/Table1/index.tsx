import PostDraftLeagueTable from "./PostDraftLeagueTable";
import PreDraftLeagueTable from "./PreDraftLeagueTable";
import {useAllTeamsInLeague} from "../../../hooks/queries/league-queries.ts";


export default function Table1({
                                   // openLeague,
                                   // leagueTeams,
                                   isLeagueActive,
                                   currentLeague,
                                   isDraftInProgress
                               }) {

    // const teamsInLeague = useAllTeamsInLeague(currentLeague?.leagueId).data;
    // console.log("teamsInLeague")
    // console.log(teamsInLeague)

    function LeagueTable() {
        console.log("isLeagueActiveT1")
        console.log(isLeagueActive)
        if (isLeagueActive) {
            // return <div className="col-start-2 col-span-3">
            return <PostDraftLeagueTable
                currentLeague={currentLeague}
                // teamsInLeague={teamsInLeague}
            />
            // </div>
        }
        // return <div className="col-start-2 col-span-1.5">
        return <PreDraftLeagueTable
            // openLeague={openLeague}
            currentLeague={currentLeague}
            isDraftInProgress={isDraftInProgress}
            // teamsInLeague={teamsInLeague}
        />
        // </div>
    }

    return (
        <LeagueTable/>
    );
}