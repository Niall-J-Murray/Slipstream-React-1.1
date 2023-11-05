import PostDraftLeagueTable from "./PostDraftLeagueTable";
import PreDraftLeagueTable from "./PreDraftLeagueTable";


export default function Table1({isLeagueActive, currentLeague, leagueTeams}) {
    function LeagueTable() {
        if (isLeagueActive) {
            return <PostDraftLeagueTable currentLeague={currentLeague} leagueTeams={leagueTeams}/>;
        }
        return <PreDraftLeagueTable currentLeague={currentLeague} leagueTeams={leagueTeams}/>;
    }

    return (
        <LeagueTable/>
    );
}