import ITeam from "./team.type.ts";

export default interface ILeague {
    leagueId: number | null,
    leagueName?: string | null,
    creationTimestamp?: string | null,
    activeTimestamp?: string | null,
    isActive?: boolean | null,
    isTestLeague?: boolean | null,
    teams?: Array<ITeam> | null
}

