import {useQuery} from "react-query";
import {getTeam, postCreateTeam, postCreateTestTeam} from "../../services/team.service.ts";

export const useTeamData = (teamId: number | null | undefined) =>
    useQuery({
        queryKey: ["teamData", teamId],
        queryFn: () => getTeam(teamId),
        enabled: !!teamId,
    });

export const useCreateTeam = (userId: number | null | undefined, teamName: string) =>
    useQuery({
        queryKey: ["createTeam", userId, teamName],
        queryFn: () => postCreateTeam(userId, teamName),
        enabled: !!userId,
    });

export const useCreateTestTeam = (leagueId: number | null | undefined) =>
    useQuery({
        queryKey: ["createTestTeam", leagueId],
        queryFn: () => postCreateTestTeam(leagueId),
        enabled: !!leagueId,
    });