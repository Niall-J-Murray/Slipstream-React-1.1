import DashTop from "./DashTop";
import Table1 from "./Table1";
import Table2 from "./Table2";
import {useEffect, useState} from "react";
import {postToggleTestLeague} from "../../services/league.service.ts";
import {postCreateTestTeam} from "../../services/team.service.ts";
import {getDriverData, postPickDriver} from "../../services/driver.service.ts";
import DraftControls from "./DraftControls";
import Reminders from "./Reminders";
import Layout from "../../components/Layout/Layout.tsx";
import IDriver from "../../types/driver.type.ts";
import IUser from "../../types/user.type.ts";
import {useLeagueData, useNextUserToPick, useOpenLeague} from "../../hooks/queries/league-queries.ts";


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
        = useState<boolean | undefined | null>();
    const [isDraftInProgress, setIsDraftInProgress]
        = useState<boolean | undefined | null>();
    const [isLeagueActive, setIsLeagueActive]
        = useState<boolean | undefined | null>();
    const [isUsersTurnToPick, setIsUsersTurnToPick]
        = useState<boolean | undefined | null>(false);
    const [currentPickNumber, setCurrentPickNumber]
        = useState<number | null | undefined>();
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
    const leagueId = userData ? userData?.team?.leagueId : openLeague?.leagueId;
    const teamId = userData ? userData.team?.id : null;
    const nextUserToPick = useNextUserToPick(leagueId).data;

    const {
        data: leagueData,
        isLoading: leagueDataLoading,
        // status: statLeagueData,
        error: errLeagueData,
    } = useLeagueData(leagueId);


    // function useLeagueBooleans(league) {
    useEffect(() => {

        setCurrentPickNumber(leagueData?.currentPickNumber);
        console.log("leagueData")
        console.log(leagueData)
        console.log(leagueData?.teams?.length)
        if (leagueData?.teams?.length < 10) {
            setIsLeagueFull(false);
            setIsDraftInProgress(false);
        } else {
            setIsLeagueFull(true);
            setIsDraftInProgress(true);
        }

        if (nextUserToPick?.isTestUser) {
            setIsUsersTurnToPick(true);
        }

        if (leagueData?.currentPickNumber == userData?.team?.firstPickNumber
            || leagueData?.currentPickNumber == userData?.team?.secondPickNumber) {
            setIsUsersTurnToPick(true);
        }

        if (leagueData?.isActive) {
            setIsLeagueActive(true);
        }
    }, []);
// }

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

    const addTestTeam = async () => {
        await postCreateTestTeam(leagueId);
    }

    const handleDriverSelection = (driverId: number | null | undefined) => {
        getDriverData(driverId)
            .then(function (response) {
                setSelectedDriver(response);
            })
        return driverId;
    }

    const handlePick = async (driverId: number | null | undefined) => {
        await postPickDriver(userData?.id, driverId)
            .then(async () => await getDriverData(driverId)
                .then(res => {
                    setLastDriverPicked(res)
                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);
                    setLastPickTime(today);
                }));
    };

    return (
        <>
            <Layout>
                {/*<ErrorBoundary fallback={<p>Something went wrong</p>}>*/}
                <div className="grid grid-cols-5 gap-2">
                    <div className="col-start-2 col-span-1">
                        <DashTop
                            userData={userData}
                            currentLeague={leagueData}
                            isPracticeLeague={isPracticeLeague}
                            isDraftInProgress={isDraftInProgress}
                            isLeagueFull={isLeagueFull}
                            isLeagueActive={isLeagueActive}
                            // driversInTeam={driversInTeam}
                            // currentUser={currentUser}
                            // team={team}
                            // openLeague={openLeague}
                            // leagueTeams={leagueTeams}
                            // currentPickNumber={currentPickNumber}
                            // currentPick={isUsersTurnToPick}
                        />
                    </div>
                    <div className="col-start-3 col-span-2">
                        <Reminders/>
                    </div>
                    {/*<div className="col-start-2 col-span-3">*/}
                    {/*    <div className="grid grid-cols-5">*/}
                    {/*        <div className="col-start-1 col-span-1">*/}
                    {/*            <br/>1.{currentUser?.username}*/}
                    {/*            <br/>2.{team?.teamName}*/}
                    {/*            <br/>3.{team?.leagueId}*/}
                    {/*            <br/>4.{currentLeague?.leagueName}*/}
                    {/*            <br/>5.{currentLeague?.teams?.length}*/}
                    {/*            <br/>6.{openLeague?.leagueName}*/}
                    {/*            <br/>7.{isLeagueActive ? "LA" : "LNA"}*/}
                    {/*            <br/>8.{isLeagueFull ? "LF" : "LNF"}*/}
                    {/*            <br/>9.{isPracticeLeague ? "PL" : "NPL"}*/}
                    {/*            <br/>10.{showPracticeOptions ? "PO" : "NP0"}*/}
                    {/*            <br/>11.{isDraftInProgress ? "DIP" : "NIP"}*/}
                    {/*        </div>*/}
                    {/*        <div className="col-start-2 col-span-1">*/}
                    {/*            <br/>12.{currentPickNumber}*/}
                    {/*            <br/>13.{nextUserToPick?.username}*/}
                    {/*            <br/>14.{isUsersTurnToPick ? "pick" : "no pick"}*/}
                    {/*            <br/>15.{selectedDriver?.surname}*/}
                    {/*            <br/>16.{lastDriverPicked?.surname}*/}
                    {/*            <br/>17.{lastPickTime?.getTime()}*/}
                    {/*        </div>*/}
                    {/*        <div className="col-start-3 col-span-1">*/}
                    {/*            <br/>18.{leagueTeams?.map((team: ITeam) => {*/}
                    {/*            return <div key={team.id}>{team.teamName}</div>*/}
                    {/*        })}*/}
                    {/*        </div>*/}
                    {/*        <div className="col-start-4 col-span-1">*/}
                    {/*            19.{driversInTeam?.map((driver: IDriver) => {*/}
                    {/*            return <div key={driver.driverId}>{driver.surname}</div>*/}
                    {/*        })}*/}
                    {/*        </div>*/}
                    {/*        <div className="col-start-5 col-span-1">*/}
                    {/*            20.{undraftedDrivers?.map((driver: IDriver) => {*/}
                    {/*            return <div key={driver.driverId}>{driver.surname}</div>*/}
                    {/*        })}*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
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
                            nextUserToPick={isUsersTurnToPick}
                        />
                    </div>
                    {isLeagueActive ?
                        <>
                            <div className="col-start-2 col-span-3">
                                <Table1
                                    currentLeague={leagueData}
                                    isDraftInProgress={isDraftInProgress}
                                    isLeagueActive={isLeagueActive}
                                    // openLeague={openLeague}
                                    // leagueTeams={leagueTeams}
                                />
                            </div>
                            <div className="col-start-2 col-span-3">
                                <Table2
                                    leagueId={leagueId}
                                    isDraftInProgress={isDraftInProgress}
                                    handleDriverSelection={handleDriverSelection}
                                    handlePick={handlePick}
                                    isLeagueActive={isLeagueActive}
                                    isUsersTurnToPick={isUsersTurnToPick}
                                    // isLeagueFull={isLeagueFull}
                                    // currentUser={currentUser}
                                    // undraftedDrivers={undraftedDrivers}
                                    // nextUserToPick={nextUserToPick}
                                />
                            </div>
                        </>
                        :
                        <>
                            <div className="col-start-2 col-span-1"><Table1
                                currentLeague={leagueData}
                                isDraftInProgress={isDraftInProgress}
                                isLeagueActive={isLeagueActive}
                                // openLeague={openLeague}
                                // leagueTeams={leagueTeams}
                            />

                            </div>
                            <div className="col-start-3 col-span-2">
                                <Table2
                                    leagueId={leagueId}
                                    isDraftInProgress={isDraftInProgress}
                                    handleDriverSelection={handleDriverSelection}
                                    handlePick={handlePick}
                                    isLeagueActive={isLeagueActive}
                                    isUsersTurnToPick={isUsersTurnToPick}
                                    // isLeagueFull={isLeagueFull}
                                    // undraftedDrivers={undraftedDrivers}
                                    // currentUser={currentUser}
                                    // nextUserToPick={nextUserToPick}
                                />
                            </div>
                        </>
                    }
                </div>
                {/*</ErrorBoundary>*/}
            </Layout>
        </>
    );
}

//     return (
//         <>
//             <View loading={loading}>
//                 <BackgroundImage>
//                     <Navbar/>
//                     <Body>
//                         <div className="grid grid-cols-5 gap-2">
//                             <div className="col-start-2 col-span-1">
//                                 <DashTop
//                                     currentUser={currentUser}
//                                     // userData={userData}
//                                     team={team}
//                                     driversInTeam={driversInTeam}
//                                     openLeague={openLeague}
//                                     currentLeague={currentLeague}
//                                     leagueTeams={leagueTeams}
//                                     isPracticeLeague={isPracticeLeague}
//                                     isLeagueFull={isLeagueFull}
//                                     isDraftInProgress={isDraftInProgress}
//                                     currentPickNumber={currentPickNumber}
//                                     currentPick={isUsersTurnToPick}
//                                     isLeagueActive={isLeagueActive}/>
//                             </div>
//                             <div className="col-start-3 col-span-2">
//                                 <Reminders/>
//                             </div>
//                             <div className="col-start-2 col-span-3">
//                                 <div className="grid grid-cols-5">
//                                     <div className="col-start-1 col-span-1">
//                                         <br/>1.{currentUser?.username}
//                                         <br/>2.{team?.teamName}
//                                         <br/>3.{team?.leagueId}
//                                         <br/>4.{currentLeague?.leagueName}
//                                         <br/>5.{currentLeague?.teams?.length}
//                                         <br/>6.{openLeague?.leagueName}
//                                         <br/>7.{isLeagueActive ? "LA" : "LNA"}
//                                         <br/>8.{isLeagueFull ? "LF" : "LNF"}
//                                         <br/>9.{isPracticeLeague ? "PL" : "NPL"}
//                                         <br/>10.{showPracticeOptions ? "PO" : "NP0"}
//                                         <br/>11.{isDraftInProgress ? "DIP" : "NIP"}
//                                     </div>
//                                     <div className="col-start-2 col-span-1">
//                                         <br/>12.{currentPickNumber}
//                                         <br/>13.{nextUserToPick?.username}
//                                         <br/>14.{isUsersTurnToPick ? "pick" : "no pick"}
//                                         <br/>15.{selectedDriver?.surname}
//                                         <br/>16.{lastDriverPicked?.surname}
//                                         <br/>17.{lastPickTime?.getTime()}
//                                     </div>
//                                     <div className="col-start-3 col-span-1">
//                                         <br/>18.{leagueTeams?.map((team: ITeam) => {
//                                         return <div key={team.id}>{team.teamName}</div>
//                                     })}
//                                     </div>
//                                     <div className="col-start-4 col-span-1">
//                                         19.{driversInTeam?.map((driver: IDriver) => {
//                                         return <div key={driver.driverId}>{driver.surname}</div>
//                                     })}
//                                     </div>
//                                     <div className="col-start-5 col-span-1">
//                                         20.{undraftedDrivers?.map((driver: IDriver) => {
//                                         return <div key={driver.driverId}>{driver.surname}</div>
//                                     })}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-start-2 col-span-3">
//                                 <DraftControls
//                                     currentLeague={currentLeague}
//                                     isPracticeLeague={isPracticeLeague}
//                                     isLeagueFull={isLeagueFull}
//                                     showPracticeOptions={showPracticeOptions}
//                                     togglePracticeOptions={togglePracticeOptions}
//                                     togglePracticeLeague={togglePracticeLeague}
//                                     addTestTeam={addTestTeam}
//                                     currentUser={currentUser}
//                                     isDraftInProgress={isDraftInProgress}
//                                     currentPickNumber={currentPickNumber}
//                                     isUsersTurnToPick={isUsersTurnToPick}
//                                     nextUserToPick={isUsersTurnToPick}
//                                     selectedDriver={selectedDriver}
//                                     lastDriverPicked={lastDriverPicked}
//                                     lastPickTime={lastPickTime}
//                                     isLeagueActive={isLeagueActive}/>
//                             </div>
//                             {isLeagueActive ?
//                                 <>
//                                     <div className="col-start-2 col-span-3">
//                                         <Table1
//                                             isLeagueActive={isLeagueActive}
//                                             openLeague={openLeague}
//                                             currentLeague={currentLeague}
//                                             leagueTeams={leagueTeams}
//                                             isDraftInProgress={isDraftInProgress}/>
//                                     </div>
//                                     <div className="col-start-2 col-span-3">
//                                         <Table2
//                                             currentUser={currentUser}
//                                             isLeagueFull={isLeagueFull}
//                                             isLeagueActive={isLeagueActive}
//                                             isDraftInProgress={isDraftInProgress}
//                                             undraftedDrivers={undraftedDrivers}
//                                             isUsersTurnToPick={isUsersTurnToPick}
//                                             nextUserToPick={nextUserToPick}
//                                             handleDriverSelection={handleDriverSelection}
//                                             handlePick={handlePick}/>
//                                     </div>
//                                 </>
//                                 :
//                                 <>
//                                     <div className="col-start-2 col-span-1"><Table1
//                                         isLeagueActive={isLeagueActive}
//                                         openLeague={openLeague}
//                                         currentLeague={currentLeague}
//                                         leagueTeams={leagueTeams}
//                                         isDraftInProgress={isDraftInProgress}/>
//                                     </div>
//                                     <div className="col-start-3 col-span-2">
//                                         <Table2
//                                             currentUser={currentUser}
//                                             isLeagueFull={isLeagueFull}
//                                             isLeagueActive={isLeagueActive}
//                                             isDraftInProgress={isDraftInProgress}
//                                             undraftedDrivers={undraftedDrivers}
//                                             isUsersTurnToPick={isUsersTurnToPick}
//                                             nextUserToPick={nextUserToPick}
//                                             handleDriverSelection={handleDriverSelection}
//                                             handlePick={handlePick}/>
//                                     </div>
//                                 </>
//                             }
//                         </div>
//                     </Body>
//                 </BackgroundImage>
//             </View>
//         </>
//     )
//         ;
// }

// useEffect(() => {
//     const user = getCurrentUser();
//     setCurrentUser(user);
//     const fetchUserData = async () => {
//         // toggleLoading(true);
//         if (user != null) {
//             const userData = await getUserData(user.id);
//             setUserData(userData);
//
//             if (userData.team) {
//                 setTeam(await getTeam(userData?.team?.id))
//             }
//             getOpenLeague()
//                 .then(function (response) {
//                     setOpenLeague(response);
//                 })
//             if (userData.team) {
//                 const leagueData = await getTeamLeague(userData.team.id);
//                 await getAllLeagueTeams(leagueData.leagueId)
//                     .then(function (response) {
//                         setLeagueTeams(response)
//                     })
//                 getDriversInTeam(userData.team.id)
//                     .then(function (response) {
//                         setDriversInTeam(response);
//                     })
//                 getIsLeagueActive(leagueData.leagueId)
//                     .then(function (response) {
//                         setIsLeagueActive(response);
//                     })
//                 getIsLeagueActive(leagueData.leagueId)
//                     .then(function (response) {
//                         setIsLeagueActive(response);
//                     })
//                 getIsDraftInProgress(leagueData.leagueId)
//                     .then(function (response) {
//                         setIsDraftInProgress(response);
//                     })
//                 getPickNumber(leagueData.leagueId)
//                     .then(function (response) {
//                         setCurrentPickNumber(response);
//                     })
//                 getNextPick(leagueData.leagueId)
//                     .then(function (response) {
//                         setCurrentPick(response);
//                     })
//                 getUndraftedDrivers(leagueData.leagueId)
//                     .then(function (response) {
//                         setUndraftedDrivers(response);
//                     })
//                 setCurrentLeague(leagueData);
//                 setIsPracticeLeague(leagueData.isPracticeLeague);
//                 if (leagueData.teams.length >= 10) {
//                     setIsLeagueFull(true)
//                 }
//             } else {
//                 await getOpenLeague()
//                     .then(function (response) {
//                         setOpenLeague(response);
//                         setCurrentLeague(response);
//                         getIsLeagueActive(response.leagueId)
//                             .then(function (response) {
//                                 setIsLeagueActive(response);
//                             })
//                         getAllLeagueTeams(response.leagueId)
//                             .then(function (response) {
//                                 console.log("getAllLeagueTeams(response.leagueId)")
//                                 console.log(response)
//                                 setLeagueTeams(response)
//                             })
//                     })
//             }
//         }
//         setTimeout(toggleLoading(false), 5000);
//     }
//
//     let ignore = false;
//     fetchUserData().catch(console.error);
//     return () => {
//         ignore = true;
//     }
//
//     // toggleLoading(false);
// }, []);
// const [userData, setUserData]
//     = useState<IUser | undefined | null>();
// const [currentUser, setCurrentUser]
//     = useState<IUser | undefined | null>();
// const [team, setTeam]
//     = useState<ITeam | undefined | null>();
// const [driversInTeam, setDriversInTeam]
//     = useState<Array<IDriver> | undefined | []>();
// const [openLeague, setOpenLeague]
//     = useState<ILeague | undefined | null>();
// const [currentLeague, setCurrentLeague]
//     = useState<ILeague | undefined | null>();
// const [leagueTeams, setLeagueTeams]
//     = useState<Array<ITeam> | undefined | null | []>();
// const [isLeagueActive, setIsLeagueActive]
//     = useState<boolean | undefined | null>();
// const [isLeagueFull, setIsLeagueFull]
//     = useState<boolean | undefined | null>(true);
// const [showPracticeOptions, setShowPracticeOptions]
//     = useState<boolean | undefined | null>();
// const [isPracticeLeague, setIsPracticeLeague]
//     = useState<boolean | undefined | null>();
// const [isDraftInProgress, setIsDraftInProgress]
//     = useState<boolean | undefined | null>(true);
// const [undraftedDrivers, setUndraftedDrivers]
//     = useState<Array<IDriver> | undefined | null>();
// const [currentPickNumber, setCurrentPickNumber]
//     = useState<number | undefined | null>();
// const [nextUserToPick, setNextUserToPick]
//     = useState<IUser | undefined | null>();
// const [isUsersTurnToPick, setIsUsersTurnToPick]
//     = useState<boolean | undefined | null>();
// const [selectedDriver, setSelectedDriver]
//     = useState<IDriver | undefined | null>();
// const [lastDriverPicked, setLastDriverPicked]
//     = useState<IDriver | undefined | null>();
// const [lastPickTime, setLastPickTime]
//     = useState<Date | undefined | null>();

// doSomething()
//     .then((result) => doSomethingElse(result))
//     .then((newResult) => doThirdThing(newResult))
//     .then((finalResult) => {
//         console.log(`Got the final result: ${finalResult}`);
//     })
//     .catch(failureCallback);
// Important: Always return results,
// otherwise callbacks won't catch the result of a previous promise
// (with arrow functions, () => x is short for () => { return x; }).
// If the previous handler started a promise but did not return it,
// there's no way to track its settlement anymore,
// and the promise is said to be "floating".

// export default function Page() {
//     const [person, setPerson] = useState('Alice');
//     const [bio, setBio] = useState(null);
//     useEffect(() => {
//         async function startFetching() {
//             setBio(null);
//             const result = await fetchBio(person);
//             if (!ignore) {
//                 setBio(result);
//             }
//         }
//
//         let ignore = false;
//         startFetching();
//         return () => {
//             ignore = true;
//         }
//     }, [person]);
//
//     return (
//         <>.....

// //user + team
// useEffect(() => {
//     toggleLoading();
//
//     async function fetchUserData() {
//         // setCurrentUser(null)
//         const user = await getCurrentUser();
//         setCurrentUser(user);
//         if (!ignore) {
//             await getUserData(user.id)
//                 .then(res => {
//                     setCurrentUser(res);
//                     setUserData(res)
//                     setTeam(res.team);
//                 });
//         }
//     }
//
//     // setTimeout(
//     //     toggleLoading()
//     //     , 5000)
//     let ignore = false;
//     fetchUserData()
//         .then(() => {
//                 ignore = true;
//             }
//         );
//
// }, [toggleLoading]);
// // }, [currentUser, userData, team]);
//
// //league
// useEffect(() => {
//     async function fetchLeagueData() {
//         setOpenLeague(null);
//         setCurrentLeague(null);
//         if (!ignore) {
//             await getUserData(getCurrentUser().id)
//                 .then(async res => {
//                     if (res.team) {
//                         await getTeamLeague(res.team.id)
//                             .then(async res => {
//                                 setCurrentLeague(res);
//                                 setLeagueTeams(await getAllLeagueTeams(res.leagueId));
//                                 setIsPracticeLeague(res.isPracticeLeague);
//                                 // setIsLeagueFull(currentLeague?.teams?.length >= 10);
//                                 if (res.teams?.length) {
//                                     if (res.teams?.length >= 10) {
//                                         setIsLeagueFull(true)
//                                     }
//                                 }
//                                 setIsLeagueActive(await getIsLeagueActive(res.leagueId));
//                             })
//                             .then(async () => setOpenLeague(await getOpenLeague()));
//                     } else {
//                         await getOpenLeague()
//                             .then(async res => {
//                                 setOpenLeague(res);
//                                 setCurrentLeague(res);
//                                 setLeagueTeams(await getAllLeagueTeams(res.leagueId))
//                                 setIsLeagueActive(await getIsLeagueActive(res.leagueId));
//                             });
//                     }
//                 })
//         }
//     }
//
//
//     let ignore = false;
//     fetchLeagueData()
//         .then(() => {
//                 ignore = true;
//                 toggleLoading();
//             }
//         );
// }, [toggleLoading]);
// // }, [openLeague, currentLeague, leagueTeams, isPracticeLeague, isLeagueFull, isLeagueActive]);
//
// //drivers
// useEffect(() => {
//     async function fetchDriverData() {
//         setDriversInTeam([]);
//         setUndraftedDrivers([]);
//         if (!ignore) {
//             if (team) {
//                 setDriversInTeam(await getDriversInTeam(team.id));
//                 setUndraftedDrivers(await getUndraftedDrivers(currentLeague?.leagueId));
//             }
//         }
//     }
//
//     let ignore = false;
//     fetchDriverData()
//         .then(() => {
//                 ignore = true;
//                 toggleLoading();
//             }
//         );
// }, [toggleLoading]);
// // }, [driversInTeam, undraftedDrivers]);
//
//
// //draft
// useEffect(() => {
//     async function fetchDraftData() {
//         // setIsDraftInProgress(null);
//         if (!ignore) {
//             if (currentLeague?.leagueId) {
//                 await getIsDraftInProgress(currentLeague.leagueId)
//                     .then(res => {
//                         setIsDraftInProgress(res);
//                         console.log("1" + isDraftInProgress)
//                     });
//                 await getPickNumber(currentLeague.leagueId)
//                     .then(res => {
//                         setCurrentPickNumber(res);
//                     });
//                 await getNextPick(currentLeague.leagueId)
//                     .then(res => {
//                         setCurrentPick(res);
//                     });
//             }
//         }
//     }
//
//     let ignore = false;
//     fetchDraftData()
//         .then(() => {
//                 ignore = true;
//                 toggleLoading();
//             }
//         );
// }, [toggleLoading]);
//
// // }, [isDraftInProgress, currentPickNumber, isUsersTurnToPick]);

// useEffect(() => {
//     let active = true;
//     toggleLoading(true);
//     const fetchUser = () => {
//         getUserData(getUserFromLocalStorage().id)
//             .then((res: IUser) => {
//                 // console.log("getUserData res")
//                 // console.log(res)
//                 if (active) {
//                     setCurrentUser(res)
//                     if (res.team) {
//                         setTeam(res.team)
//                         getDriversInTeam(res.team.id)
//                             .then(res => {
//                                 setDriversInTeam(res);
//                             })
//                         getLeagueData(res.team.leagueId)
//                             .then((res: ILeague) => {
//                                 setCurrentLeague(res)
//                                 setLeagueTeams(res.teams)
//                                 setIsPracticeLeague(res.isPracticeLeague)
//                                 setIsLeagueActive(res.isActive)
//                                 setCurrentPickNumber(res.currentPickNumber)
//                             });
//                         getUndraftedDrivers(res.team.leagueId)
//                             .then(res => {
//                                 setUndraftedDrivers(res);
//                             })
//                         console.log("getLeagueData")
//                         console.log(res.team.leagueId)
//                         getNextUserToPick(res.team.leagueId)
//                             .then((res2: IUser) => {
//                                 setNextUserToPick(res2);
//                             })
//                             .then(() => {
//                                 if (nextUserToPick.isTestUser) {
//                                     setIsUsersTurnToPick(true);
//                                 }
//                                 console.log("nextUserToPick")
//                                 console.log(nextUserToPick)
//                                 if (res === nextUserToPick || res === nextUserToPick) {
//                                     setIsUsersTurnToPick(true);
//                                 }
//                                 console.log("currentPickNumber")
//                                 console.log(currentPickNumber)
//                                 if (res.team?.firstPickNumber === currentPickNumber || res.team?.secondPickNumber === currentPickNumber) {
//                                     setIsUsersTurnToPick(true);
//                                 }
//                             })
//                     } else {
//                         getOpenLeague()
//                             .then((res: ILeague) => {
//                                 setCurrentLeague(res);
//                                 setLeagueTeams(res.teams);
//                             })
//                     }
//                 }
//             })
//         // .then(() => {
//         //     console.log("getUserData 1")
//         //     console.log(currentUser)
//         //     console.log(team)
//         //     console.log(currentLeague)
//         // })
//     }
//     fetchUser()
//     //     .then(() => {
//     //         console.log("getUserData 2")
//     //         console.log(currentUser)
//     //         console.log(team)
//     //         console.log(currentLeague?.leagueName)
//     //     }).finally(() => {
//     //         console.log("getUserData 3")
//     //         console.log(currentUser)
//     //         console.log(team)
//     //         console.log(currentLeague?.leagueName)
//     //     }
//     // )
//     // console.log("after-after-after  userData")
//     // console.log(currentUser)
//     // console.log(currentLeague)
//     getLeagueSize();
//     toggleLoading(false);
//     return () => {
//         active = false;
//     };
// }, []);
// console.log("getUserData 4")
// console.log(currentUser)
// console.log(team)
// console.log(currentLeague?.leagueName)

// useEffect(() => {
//     toggleLoading(true);
//     const fetchLeague = () => {
//         // if (currentLeague) {
//         getLeagueData(currentLeague.leagueId)
//             .then(() => {
//                 // .then(async res => {
//                 //     console.log("teams length")
//                 //     console.log(res.teams.length)
//                 //     if (res.teams.length >= 10) {
//                 //         setIsLeagueFull(true)
//                 //     }
//                 // setIsPracticeLeague()
//                 // setIsLeagueActive()
//                 getUndraftedDrivers(currentLeague.leagueId)
//                     .then(res => {
//                         setUndraftedDrivers(res);
//                     })
//                 console.log("getLeagueData")
//                 console.log(currentLeague.leagueId)
//                 getNextUserToPick(currentLeague.leagueId)
//                     .then(res => {
//                         setNextUserToPick(res)
//                     })
//                 // setLastDriverPicked()
//                 // setLastPickTime()
//                 // setSelectedDriver()
//             });
//         // }
//         // else {
//         //     getOpenLeague()
//         //         .then(res => {
//         //             setOpenLeague(res);
//         //         })
//         // }
//
//     }
//     fetchLeague();
//     // .then(() => {
//     //     console.log("fetchLeague 1")
//     //     console.log(openLeague)
//     //     console.log(currentLeague)
//     //     console.log(isUsersTurnToPick)
//     //     console.log(undraftedDrivers)
//     //     console.log(isLeagueFull)
//     // })
//     getLeagueSize();
//     checkIfTimeToPick(currentLeague);
//     toggleLoading(false);
// }, [isLeagueFull]);

// console.log("fetchLeague 2")
// console.log(openLeague)
// console.log(currentLeague)
// console.log(isUsersTurnToPick)
// console.log(undraftedDrivers)
// console.log(isLeagueFull)
// useEffect(() => {
//     // const user = getUserFromLocalStorage();
//     // setCurrentUser(user);
//     const fetchUserData = async () => {
//         // toggleLoading(true);
//         if (getUserFromLocalStorage() != null) {
//             const userData = await getUserData(getUserFromLocalStorage().id);
//             if (userData.team) {
//                 setTeam(await getTeam(userData?.team?.id))
//             }
//             await getOpenLeague()
//                 .then(function (response) {
//                     setOpenLeague(response);
//                 })
//             if (userData.team) {
//                 const leagueData = await getTeamLeague(userData.team.id);
//                 await getAllLeagueTeams(leagueData.leagueId)
//                     .then(function (response) {
//                         setLeagueTeams(response)
//                     })
//                 await getDriversInTeam(userData.team.id)
//                     .then(function (response) {
//                         setDriversInTeam(response);
//                     })
//                 await getIsLeagueActive(leagueData.leagueId)
//                     .then(function (response) {
//                         setIsLeagueActive(response);
//                     })
//                 await getIsDraftInProgress(leagueData.leagueId)
//                     .then(function (response) {
//                         setIsDraftInProgress(response);
//                     })
//                 await getPickNumber(leagueData.leagueId)
//                     .then(function (response) {
//                         setCurrentPickNumber(response);
//                     })
//                 await getNextPick(leagueData.leagueId)
//                     .then(function (response) {
//                         setNextUserToPick(response);
//                     })
//                 await getUndraftedDrivers(leagueData.leagueId)
//                     .then(function (response) {
//                         setUndraftedDrivers(response);
//                     })
//                 setCurrentLeague(leagueData);
//                 setIsPracticeLeague(leagueData.isPracticeLeague);
//                 if (leagueData.teams.length >= 10) {
//                     setIsLeagueFull(true)
//                 }
//             } else {
//                 await getOpenLeague()
//                     .then(async function (response) {
//                         setOpenLeague(response);
//                         setCurrentLeague(response);
//                         getIsLeagueActive(response.leagueId)
//                             .then(function (response) {
//                                 setIsLeagueActive(response);
//                             })
//                         await getAllLeagueTeams(response.leagueId)
//                             .then(function (response) {
//                                 setLeagueTeams(response)
//                             })
//                     })
//             }
//         }
//     }
//     fetchUserData().catch(console.error)
//         .then(toggleLoading);
// }, []);
//
// useEffect(() => {
//     const fetchNextPick = async () => {
//         console.log("currentLeague")
//         console.log(currentLeague)
//         await getTeamLeague(currentUser?.team?.id)
//             .then(async res => {
//                 console.log("getTeamLeague")
//                 console.log(res)
//                 await getNextPick(res.leagueId)
//                     .then(function (response) {
//                         console.log("getNextPick")
//                         console.log(response)
//                         setCurrentPick(response);
//                     })
//             })
//     }
//     fetchNextPick();
// }, []);