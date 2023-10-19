import ITeam from "./team.type.ts";

export default interface IUser {
    id?: number | null,
    username: string,
    email: string,
    password: string,
    roles?: Array<string>
    isTestUser?: boolean | null,
    emailsReceived?: number | null,
    lastLogout?: string | null,
    team?: ITeam | null
}