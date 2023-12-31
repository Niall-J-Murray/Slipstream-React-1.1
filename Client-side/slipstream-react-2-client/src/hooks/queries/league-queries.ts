import {useQuery} from "react-query";
import {
    getAllLeagueTeams,
    getLeagueData,
    getNextUserToPick,
    getOpenLeague,
    getPickNumber
} from "../../services/league.service.ts";

export const useOpenLeague = () =>
    useQuery({
        queryKey: ["openLeague"],
        queryFn: () => getOpenLeague(),
    });

export const useLeagueData = (leagueId: number | null | undefined) =>
    useQuery({
        queryKey: ["leagueData", leagueId],
        queryFn: () => getLeagueData(leagueId),
        enabled: !!leagueId,
    });

export const useAllTeamsInLeague = (leagueId: number | null | undefined) =>
    useQuery({
        queryKey: ["allTeamsInLeague", leagueId],
        queryFn: () => getAllLeagueTeams(leagueId),
        enabled: !!leagueId,
    });

export const useNextPickNumber = (leagueId: number | null | undefined, reFetchToggle: boolean | undefined | null) =>
    useQuery({
        queryKey: ["nextPickNumber", leagueId],
        queryFn: () => getPickNumber(leagueId),
        enabled: !!reFetchToggle,
        refetchInterval: 5000,
    });

export const useNextUserToPick = (leagueId: number | null | undefined) =>
    useQuery({
        queryKey: ["nextUserToPick", leagueId],
        queryFn: () => getNextUserToPick(leagueId),
        enabled: !!leagueId,
    });