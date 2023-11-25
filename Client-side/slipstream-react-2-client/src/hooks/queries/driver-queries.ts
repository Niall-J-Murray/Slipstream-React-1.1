import {getDriversInTeam, getUndraftedDrivers, postPickDriver} from "../../services/driver.service.ts";
import {useMutation, useQuery} from "react-query";

export const useUndraftedDrivers = (leagueId: number | null | undefined) =>
    useQuery({
        queryKey: ["undraftedDrivers", leagueId],
        queryFn: () => getUndraftedDrivers(leagueId),
        enabled: !!leagueId,
    });

export const useDriversInTeam = (teamId: number | null | undefined) =>
    useQuery({
        queryKey: ["driversInTeam", teamId],
        queryFn: () => getDriversInTeam(teamId),
        enabled: !!teamId,
    });

export const usePickDriver = (userId: number | null | undefined, driverId: string) =>
    useMutation({
        mutationKey: ["createTeam", userId, driverId],
        mutationFn: () => postPickDriver(userId, ),
        // onSuccess: useLeagueData(leagueId),
        // enabled: !!leagueId,
    });

// export const getTeamDrivers =useDriversInTeam().data;
