import PostDraftLeagueTable from "./PostDraftLeagueTable";
import PreDraftLeagueTable from "./PreDraftLeagueTable";


export default function Table1({isLeagueActive, openLeague, currentLeague, leagueTeams, isDraftInProgress}) {
    function LeagueTable() {
        if (isLeagueActive) {
            // return <div className="col-start-2 col-span-3">
            return <PostDraftLeagueTable
                currentLeague={currentLeague}
                leagueTeams={leagueTeams}/>
            // </div>
        }
        // return <div className="col-start-2 col-span-1.5">
        return <PreDraftLeagueTable
            openLeague={openLeague}
            currentLeague={currentLeague}
            leagueTeams={leagueTeams}
            isDraftInProgress={isDraftInProgress}
        />
        // </div>
    }

    return (
        <LeagueTable/>
    );
}