import IUser from "./user.type.ts";
import IDriver from "./driver.type.ts";
import ILeague from "./league.type.ts";

export default interface ITeam {
    id?: any | null,
    user: IUser,
    username: string | null,
    teamName: string,
    isTestTeam?: boolean | null,
    firstPickNumber: number | null,
    secondPickNumber: number | null,
    startingPoints?: number | null,
    teamPoints?: number | null,
    ranking?: number | null,
    leagueId?: number | null,
    league?: ILeague | null,
    drivers?: Array<IDriver> | null
}

