import PostDraftLeagueTable from "./PostDraftLeagueTable";
import PreDraftLeagueTable from "./PreDraftLeagueTable";
import {useAllTeamsInLeague} from "../../../hooks/queries/league-queries.ts";
import ITeam from "../../../types/team.type.ts";

export default function Table1({
                                   // openLeague,
                                   // leagueTeams,
                                   isLeagueActive,
                                   currentLeague,
                                   isDraftInProgress
                               }) {
    const rankedTeams: Array<ITeam> | undefined = useAllTeamsInLeague(currentLeague?.leagueId).data;
    // const driversInTeam: Array<IDriver> | undefined = () => useDriversInTeam;

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
        console.log("isLeagueActiveT1")
        console.log(isLeagueActive)
        if (isLeagueActive) {
            // return <div className="col-start-2 col-span-3">
            return <PostDraftLeagueTable
                currentLeague={currentLeague}
                rankedTeams={rankedTeams}
                // teamsInLeague={teamsInLeague}
            />
            // </div>
        }
        // return <div className="col-start-2 col-span-1.5">
        return <PreDraftLeagueTable
            // openLeague={openLeague}
            currentLeague={currentLeague}
            rankedTeams={rankedTeams}
            // isDraftInProgress={isDraftInProgress}
            // teamsInLeague={teamsInLeague}
        />
        // </div>
    }

    return (
        <LeagueTable/>
    );
}