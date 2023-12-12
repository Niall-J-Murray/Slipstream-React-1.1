import {
    getAllDrivers,
    getDriverData,
    getDriversInTeam,
    getUndraftedDrivers,
    postPickDriver,
} from "../../services/driver.service.ts";
import {useMutation, useQuery, useQueryClient} from "react-query";

const useGetQueryClient = () =>
    useQueryClient();

export const useDriverStandings = () =>
    useQuery({
        queryKey: ["driverStandings"],
        queryFn: () => getAllDrivers(),
    });

export const useDriverData = (driverId: number | null | undefined) =>
    useQuery({
        queryKey: ["driverData", driverId],
        queryFn: (driverId) => getDriverData(driverId),
    });

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

// export const useDriversInTeam = (teamId: number | null | undefined) =>
//     useQuery({
//         queryKey: ["driversInTeam", teamId],
//         queryFn: () => getDriversInTeam(teamId),
//         enabled: !!teamId,
//     });

export const usePickDriver = () =>
    useMutation({
        mutationKey: ["pickDriver"],
        mutationFn: postPickDriver,
    });



