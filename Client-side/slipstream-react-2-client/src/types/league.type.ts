import ITeam from "./team.type.ts";

export default interface ILeague {
    id: number | null,
    leagueName?: string | null,
    creationTimestamp?: string | null,
    isPracticeLeague?: boolean | null,
    currentPickNumber: number | null,
    isActive?: boolean | null,
    activeTimestamp?: string | null,
    teams?: Array<ITeam> | null
}

