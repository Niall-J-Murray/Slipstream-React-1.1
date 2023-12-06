import {useMutation, useQuery} from "react-query";
import {getTeam, postCreateTeam, postCreateTestTeam, postDeleteTestTeams} from "../../services/team.service.ts";

export const useTeamData = (teamId: number | null | undefined) =>
    useQuery({
        queryKey: ["teamData", teamId],
        queryFn: () => getTeam(teamId),
        enabled: !!teamId,
    });

export const useCreateTeam = (userId: number | null | undefined, teamName: string) =>
    useMutation({
        mutationKey: ["createTeam", userId],
        mutationFn: () => postCreateTeam(userId, teamName),
    });

export const useCreateTestTeam = (leagueId: number | null | undefined) =>
    useMutation({
        mutationKey: ["createTestTeam", leagueId],
        mutationFn: () => postCreateTestTeam(leagueId),
    });

export const useDeleteTestTeams = (leagueId: number | null | undefined) =>
    useMutation({
        mutationKey: ["deleteTestTeams", leagueId],
        mutationFn: () => postDeleteTestTeams(leagueId),
    });