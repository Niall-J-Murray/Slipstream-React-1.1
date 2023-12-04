import {getDriverData, getDriversInTeam, getUndraftedDrivers, postPickDriver} from "../../services/driver.service.ts";
import {useMutation, useQuery, useQueryClient} from "react-query";

const useGetQueryClient = () => useQueryClient();

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

export const useDriverData = (driverId) => useQuery({
    queryKey: ["driverData", driverId],
    queryFn: (driverId) => getDriverData(driverId),
});

export const usePickDriver = () => useMutation({
    mutationKey: ["createTeam"],
    mutationFn: postPickDriver,
    // onSuccess: (data: any) => {
    //     useGetQueryClient().invalidateQueries()
    //     useGetQueryClient.invalidateQueries("undraftedDrivers")
    //     useGetQueryClient.invalidateQueries("driversInTeam")
    //     console.log("data")
    //     console.log(data)
    // },
})

// export const usePickDriver = () => {
//     return useMutation({
//         mutationKey: ["createTeam"],
//         mutationFn: (userId: number | null | undefined, driverId: string) => {
//             postPickDriver(userId, driverId)
//                 .then(value => console.log(value));
//         },
//     });
// }

// export const usePickDriver = () => useMutation({
//     // mutationKey: ["createTeam"],
//     mutationFn: (userId, driverId) => {
//         postPickDriver(userId, driverId);
//     },
// })
// mutationKey: ["createTeam", userId, driverId],
// () => postPickDriver,
// onSuccess: useLeagueData(leagueId),
// enabled: !!leagueId,


// export const usePickDriver = (userId: number | null | undefined, driverId: string) => {
//
//     return useMutation({
//         mutationKey: ["createTeam", userId, driverId],
//         mutationFn: () => postPickDriver(userId, driverId),
//         // onSuccess: useLeagueData(leagueId),
//         // enabled: !!leagueId,
//     });
// }

// export const usePickDriver = () => {
//     function useMutatePickDriver(userId: number | null | undefined, driverId: number | null | undefined) {
//         useMutation({
//             mutationKey: ["createTeam", userId, driverId],
//             mutationFn: () => postPickDriver(userId, driverId),
//             // onSuccess: useLeagueData(leagueId),
//             // enabled: !!leagueId,
//         });
//     }
//
//     let userId;
//     let driverId;
//     return useMutatePickDriver(userId, driverId);
// }

// export const usePickDriver = () => {
//     return useMutation(["createTeam"],
//         variables => postPickDriver(variables.userId, variables.driverId)
//     )
// }
//             onSuccess: useLeagueData(leagueId),
//             enabled: !!leagueId,
// );

