import {useMutation, useQuery, useQueryClient} from "react-query";
import {getTeam, postCreateTeam, postCreateTestTeam} from "../../services/team.service.ts";
import {useLeagueData} from "./league-queries.ts";

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
        // onSuccess: useLeagueData(leagueId),
        // enabled: !!leagueId,
    });

export const useCreateTestTeam = (leagueId: number | null | undefined) =>
    useMutation({
        mutationKey: ["createTestTeam", leagueId],
        mutationFn: () => postCreateTestTeam(leagueId),
        // onSuccess: ()=> {useLeagueData(leagueId)},
        // onSuccess: () => {
        //     useQueryClient()
        //         .invalidateQueries("leagueData");
        // }
        // onSuccess: useLeagueData(leagueId),
        // enabled: !!leagueId,
    });