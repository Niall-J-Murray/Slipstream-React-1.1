import PostDraftLeagueTable from "./PostDraftLeagueTable";
import PreDraftLeagueTable from "./PreDraftLeagueTable";
import ILeague from "../../../types/league.type.ts";
import ITeam from "../../../types/team.type.ts";
import IUser from "../../../types/user.type.ts";

interface Table1Props {
    currentLeague: ILeague | undefined,
    leagueTeams: Array<ITeam> | undefined | null,
    leagueSize: number | undefined | null,
    isDraftInProgress: boolean | undefined | null,
    nextUserToPick: IUser | undefined | null,
    isLeagueActive: boolean | undefined | null
}

export default function LeagueTable({currentLeague, leagueTeams, leagueSize, isDraftInProgress, nextUserToPick, isLeagueActive}: Table1Props) {
    
    if (isLeagueActive) {
        return (
            <PostDraftLeagueTable
                currentLeague={currentLeague}
                leagueTeams={leagueTeams}
                isDraftInProgress={isDraftInProgress}
            />)
    }
    return (
        <PreDraftLeagueTable
            currentLeague={currentLeague}
            leagueSize={leagueSize}
            leagueTeams={leagueTeams}
            nextUserToPick={nextUserToPick}
            isDraftInProgress={isDraftInProgress}
        />)
}