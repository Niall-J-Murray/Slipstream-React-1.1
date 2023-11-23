import {getDriversInTeam, getUndraftedDrivers} from "../../services/driver.service.ts";
import {useQuery} from "react-query";

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