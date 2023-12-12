import PostDraftLeagueTable from "./PostDraftLeagueTable";
import PreDraftLeagueTable from "./PreDraftLeagueTable";
import ILeague from "../../../types/league.type.ts";
import ITeam from "../../../types/team.type.ts";
import IUser from "../../../types/user.type.ts";
import IDriver from "../../../types/driver.type.ts";
import {UseQueryResult} from "react-query";

interface Table1Props {
    currentLeague: ILeague | undefined,
    leagueTeams: Array<ITeam> | undefined | null,
    leagueSize: number | undefined | null,
    isDraftInProgress: boolean | undefined | null,
    nextUserToPick: IUser | undefined | null,
    isLeagueActive: boolean | undefined | null,
    driversInTeam: (teamId: (number | null | undefined)) => UseQueryResult<IDriver[], unknown>,
}

export default function LeagueTable({
                                        currentLeague,
                                        leagueTeams,
                                        leagueSize,
                                        isDraftInProgress,
                                        nextUserToPick,
                                        isLeagueActive,
                                        driversInTeam,
                                    }: Table1Props) {

    if (isLeagueActive) {
        return (
            <PostDraftLeagueTable
                currentLeague={currentLeague}
                leagueTeams={leagueTeams}
                driversInTeam={driversInTeam}
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