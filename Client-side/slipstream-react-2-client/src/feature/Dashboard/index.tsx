import DashTop from "./DashTop";
import Table1 from "./Table1";
import Table2 from "./Table2";
import {useEffect, useState} from "react";
import {postToggleTestLeague} from "../../services/league.service.ts";
import DraftControls from "./DraftControls";
import Reminders from "./Reminders";
import Layout from "../../components/Layout/Layout.tsx";
import IDriver from "../../types/driver.type.ts";
import IUser from "../../types/user.type.ts";
import {
    useLeagueData,
    useNextPickNumber,
    useNextUserToPick,
    useOpenLeague
} from "../../hooks/queries/league-queries.ts";
import {useCreateTestTeam} from "../../hooks/queries/team-queries.ts";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";
import {useDriverData, usePickDriver} from "../../hooks/queries/driver-queries.ts";


// Todo Display correct info and options in dash-top depending on users team/league status.
//  ---
//  Check draft add test team and draft picking functions after dashboard refactor.
//  Fix draft instructions to display according to user status.
//  Finish loading spinner graphic, and pause page loading until all data is fetched.
//  Fix data missing data on page reloads.
//  Check test teams disappearing mid-draft after user logout.
//  Add toggles to show/hide certain boxes.
//  Fix layouts for consistency.

// export default function Dashboard({loading, toggleLoading}) {
interface DashboardProps {
    userData: undefined | IUser
}

export default function Dashboard({userData}: DashboardProps) {
    // const [openLeague, setOpenLeague]
    //     = useState<ILeague | undefined | null>();
    const [showPracticeOptions, setShowPracticeOptions]
        = useState<boolean | undefined | null>();
    const [isPracticeLeague, setIsPracticeLeague]
        = useState<boolean | undefined | null>();
    const [isLeagueFull, setIsLeagueFull]
        = useState<boolean | undefined | null>(false);
    const [isDraftInProgress, setIsDraftInProgress]
        = useState<boolean | undefined | null>(false);
    const [isLeagueActive, setIsLeagueActive]
        = useState<boolean | undefined | null>();
    const [isUsersTurnToPick, setIsUsersTurnToPick]
        = useState<boolean | undefined | null>(false);
    // const [currentPickNumber, setCurrentPickNumber]
    //     = useState<number | null | undefined>();
    // const [nextToPick, setNextToPick]
    //     = useState<IUser | undefined>();
    const [selectedDriver, setSelectedDriver]
        = useState<IDriver | undefined | null>();
    const [lastDriverPicked, setLastDriverPicked]
        = useState<IDriver | undefined | null>();
    const [lastPickTime, setLastPickTime]
        = useState<Date | undefined | null>();

    const {
        data: openLeague,
        isLoading: openLeagueLoading,
        // status: openLeagueData,
        error: erropenLeague,
    } = useOpenLeague();

    const userId = userData ? userData?.id : null;
    const teamId = userData?.team ? userData.team?.id : null;
    const leagueId = userData?.team ? userData?.team?.leagueId : openLeague?.leagueId;
    const currentPickNumber = useNextPickNumber(leagueId).data;
    const nextUserToPick = useNextUserToPick(leagueId).data;


    const {
        data: leagueData,
        isLoading: leagueDataLoading,
        // status: statLeagueData,
        error: errLeagueData,
    } = useLeagueData(leagueId);

    // const {
    //     mutateAsync: mutateTestTeam,
    //     // data: addTestTeam,
    //     isLoading: mutateTestTeamLoading,
    //     // status: addTestTeamStatus,
    //     error: mutateTestTeamError,
    // } = useCreateTestTeam(leagueId);

    // const {
    //     mutateAsync: pickDriver,
    //     // data: addTestTeam,
    //     isLoading: pickDriverStatus,
    //     // status: addTestTeamStatus,
    //     error: pickDriverError,
    // } = usePickDriver({userId}, {driverId});

    // console.log("leagueData1")
    // console.log(leagueData)
    // function useLeagueBooleans(league) {
    const redirect = useNavigate();
    useEffect(() => {
        if (!userData) {
            redirect("/login");
        }
        // setNextToPick(nextUserToPick);
        // setCurrentPickNumber(leagueData?.currentPickNumber);
        setIsPracticeLeague(leagueData?.isPracticeLeague);
        console.log("leagueData2")
        console.log(leagueData)
        console.log(leagueData?.teams?.length)
        if (leagueData?.teams?.length
            && leagueData?.teams?.length >= 10) {
            setIsLeagueFull(true);
            if (!leagueData?.isActive) {
                setIsDraftInProgress(true);
            }
        }
        // else {
        //     setIsLeagueFull(true);
        //     setIsDraftInProgress(true);
        // }

        if (nextUserToPick?.isTestUser) {
            setIsUsersTurnToPick(true);
        }

        if (leagueData?.currentPickNumber == userData?.team?.firstPickNumber
            || leagueData?.currentPickNumber == userData?.team?.secondPickNumber) {
            setIsUsersTurnToPick(true);
        }

        if (leagueData?.isActive) {
            setIsDraftInProgress(false);
            setIsLeagueActive(true);
        }
    }, [isDraftInProgress, isLeagueActive, leagueData, leagueId, leagueData?.currentPickNumber, nextUserToPick, nextUserToPick?.isTestUser, userData?.team?.firstPickNumber, userData?.team?.secondPickNumber]);

    console.log("isLeagueFull")
    console.log(isLeagueFull)

    function togglePracticeOptions() {
        if (showPracticeOptions) {
            setShowPracticeOptions(false);
        } else {
            setShowPracticeOptions(true);
        }
    }

    function togglePracticeLeague() {
        if (isPracticeLeague) {
            postToggleTestLeague(leagueId)
                .then(res => {
                    setIsPracticeLeague(res);
                })
        } else {
            postToggleTestLeague(leagueId)
                .then(res => {
                    setIsPracticeLeague(res);
                })
        }
    }

    const queryClient = useQueryClient();
    const mutateTestTeam = useCreateTestTeam(leagueId);

    const addTestTeam = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        mutateTestTeam.mutateAsync()
            .then(() => {
                    if (mutateTestTeam.isSuccess) {
                        queryClient.invalidateQueries();
                    }
                }
            )
        // .then(() => {
        //     queryClient.invalidateQueries();
        //     // queryClient.invalidateQueries("leagueData")
        //     // queryClient.invalidateQueries(["allTeamsInLeague", leagueId])
        //     // queryClient.invalidateQueries("undraftedDrivers")
        //     // queryClient.invalidateQueries("driversInTeam")
        //     // queryClient.invalidateQueries("nextPickNumber")
        //     // queryClient.invalidateQueries("nextUserToPick")
        // })
    }
    const driverData = useDriverData().data;

    const handleDriverSelection = (driverId: number | null | undefined) => {
        if (driverData) {
            driverData(driverId)
                .then(res => setSelectedDriver(res));
        }
        // getDriverData(driverId)
        //     .then(function (response) {
        //         setSelectedDriver(response);
        //     })
        return driverId;
    }

    const pickDriver = usePickDriver();

    const handlePick = (e: { preventDefault: () => void; }, driverId: number | string | undefined) => {
        e.preventDefault();
        pickDriver.mutateAsync({
            userId: userId,
            driverId: driverId,
        })
            .then(() => {
                queryClient.invalidateQueries("leagueData")
                queryClient.invalidateQueries("undraftedDrivers")
                queryClient.invalidateQueries("driversInTeam")
                queryClient.invalidateQueries("nextPickNumber")
                queryClient.invalidateQueries("nextUserToPick")
                // queryClient.invalidateQueries("allTeamsInLeague")
            })
    }

// const handlePick = (driverId: number | string | null | undefined) => {
//     pickDriver.mutate({
//      userId, driverId
//     });
// }
//     // usePickDriver(userData?.id, driverId);
//     // const userId = userData?.id;
//     // pickDriver(userId, driverId);
//
//     // await postPickDriver(userData?.id, driverId)
//     //     .then(async () => await getDriverData(driverId)
//     //         .then(res => {
//     //             setLastDriverPicked(res)
//     //             const timeElapsed = Date.now();
//     //             const today = new Date(timeElapsed);
//     //             setLastPickTime(today);
//     //         }));
// };
// const {
// mutateAsync: pickDriver,
// // data: addTestTeam,
// isLoading: pickDriverStatus,
// // status: addTestTeamStatus,
// error: pickDriverError,
// } =


    return (
        <>
            <Layout>
                <div className="grid grid-cols-5 gap-2">
                    <div className="col-start-2 col-span-1">
                        <DashTop
                            userData={userData}
                            currentLeague={leagueData}
                            isPracticeLeague={isPracticeLeague}
                            isDraftInProgress={isDraftInProgress}
                            isLeagueFull={isLeagueFull}
                            isLeagueActive={isLeagueActive}
                        />
                    </div>
                    <div className="col-start-3 col-span-2">
                        <Reminders/>
                    </div>
                    <div className="col-start-2 col-span-3">
                        <DraftControls
                            currentUser={userData}
                            togglePracticeOptions={togglePracticeOptions}
                            togglePracticeLeague={togglePracticeLeague}
                            addTestTeam={addTestTeam}
                            currentLeague={leagueData}
                            isPracticeLeague={isPracticeLeague}
                            isLeagueFull={isLeagueFull}
                            showPracticeOptions={showPracticeOptions}
                            isDraftInProgress={isDraftInProgress}
                            selectedDriver={selectedDriver}
                            lastDriverPicked={lastDriverPicked}
                            lastPickTime={lastPickTime}
                            isLeagueActive={isLeagueActive}
                            currentPickNumber={currentPickNumber}
                            isUsersTurnToPick={isUsersTurnToPick}
                            nextUserToPick={nextUserToPick}
                        />
                    </div>
                    {isLeagueActive ?
                        <>
                            <div className="col-start-2 col-span-3">
                                <Table1
                                    currentLeague={leagueData}
                                    isDraftInProgress={isDraftInProgress}
                                    isLeagueActive={isLeagueActive}
                                />
                            </div>
                            <div className="col-start-2 col-span-3">
                                <Table2
                                    leagueId={leagueId}
                                    isDraftInProgress={isDraftInProgress}
                                    isUsersTurnToPick={isUsersTurnToPick}
                                    selectedDriver={selectedDriver}
                                    handleDriverSelection={handleDriverSelection}
                                    handlePick={handlePick}
                                />
                            </div>
                        </>
                        :
                        <>
                            <div className="col-start-2 col-span-1">
                                <Table1
                                    currentLeague={leagueData}
                                    isDraftInProgress={isDraftInProgress}
                                    isLeagueActive={isLeagueActive}
                                />

                            </div>
                            <div className="col-start-3 col-span-2">
                                <Table2
                                    leagueId={leagueId}
                                    isDraftInProgress={isDraftInProgress}
                                    isUsersTurnToPick={isUsersTurnToPick}
                                    selectedDriver={selectedDriver}
                                    handleDriverSelection={handleDriverSelection}
                                    handlePick={handlePick}
                                />
                            </div>
                        </>
                    }
                </div>
            </Layout>
        </>
    );
}


// for testing dashboard UI
{/*<div className="col-start-2 col-span-3">*/
}
{/*    <div className="grid grid-cols-5">*/
}
{/*        <div className="col-start-1 col-span-1">*/
}
{/*            <br/>1.{currentUser?.username}*/
}
{/*            <br/>2.{team?.teamName}*/
}
{/*            <br/>3.{team?.leagueId}*/
}
{/*            <br/>4.{currentLeague?.leagueName}*/
}
{/*            <br/>5.{currentLeague?.teams?.length}*/
}
{/*            <br/>6.{openLeague?.leagueName}*/
}
{/*            <br/>7.{isLeagueActive ? "LA" : "LNA"}*/
}
{/*            <br/>8.{isLeagueFull ? "LF" : "LNF"}*/
}
{/*            <br/>9.{isPracticeLeague ? "PL" : "NPL"}*/
}
{/*            <br/>10.{showPracticeOptions ? "PO" : "NP0"}*/
}
{/*            <br/>11.{isDraftInProgress ? "DIP" : "NIP"}*/
}
{/*        </div>*/
}
{/*        <div className="col-start-2 col-span-1">*/
}
{/*            <br/>12.{currentPickNumber}*/
}
{/*            <br/>13.{nextUserToPick?.username}*/
}
{/*            <br/>14.{isUsersTurnToPick ? "pick" : "no pick"}*/
}
{/*            <br/>15.{selectedDriver?.surname}*/
}
{/*            <br/>16.{lastDriverPicked?.surname}*/
}
{/*            <br/>17.{lastPickTime?.getTime()}*/
}
{/*        </div>*/
}
{/*        <div className="col-start-3 col-span-1">*/
}
{/*            <br/>18.{leagueTeams?.map((team: ITeam) => {*/
}
{/*            return <div key={team.id}>{team.teamName}</div>*/
}
{/*        })}*/
}
{/*        </div>*/
}
{/*        <div className="col-start-4 col-span-1">*/
}
{/*            19.{driversInTeam?.map((driver: IDriver) => {*/
}
{/*            return <div key={driver.driverId}>{driver.surname}</div>*/
}
{/*        })}*/
}
{/*        </div>*/
}
{/*        <div className="col-start-5 col-span-1">*/
}
{/*            20.{undraftedDrivers?.map((driver: IDriver) => {*/
}
{/*            return <div key={driver.driverId}>{driver.surname}</div>*/
}
{/*        })}*/
}
{/*        </div>*/
}
{/*    </div>*/
}
{/*</div>*/
}