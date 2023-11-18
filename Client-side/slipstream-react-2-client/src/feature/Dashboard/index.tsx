import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import DashTop from "./DashTop";
import Reminders from "./Reminders";
import Table1 from "./Table1";
import Table2 from "./Table2";
import {useEffect, useState} from "react";
import {
    getAllLeagueTeams,
    getIsDraftInProgress,
    getNextPick,
    postToggleTestLeague
} from "../../services/league.service.ts";
import {getUserFromLocalStorage} from "../../services/auth.service.ts";
import {getUserData} from "../../services/user.service.ts";
import IUser from "../../types/user.type.ts";
import ITeam from "../../types/team.type.ts";
import ILeague from "../../types/league.type.ts";
import {createTestTeam} from "../../services/team.service.ts";
import IDriver from "../../types/driver.type.ts";
import {getDriverData, postPickDriver} from "../../services/driver.service.ts";
import DraftControls from "./DraftControls";


// Todo Display correct info and options in dash-top depending on users team/league status.
//  ---
//  Check draft add test team and draft picking functions after dashboard refactor.
//  Fix draft instructions to display according to user status.
//  Finish loading spinner graphic, and pause page loading until all data is fetched.
//  Fix data missing data on page reloads.
//  Check test teams disappearing mid-draft after user logout.
//  Add toggles to show/hide certain boxes.
//  Fix layouts for consistency.

export default function Dashboard({loading, toggleLoading}) {
    const [currentUser, setCurrentUser]
        = useState<IUser | undefined | null>();
    // const [userData, setUserData]
    //     = useState<IUser | undefined | null>();
    const [team, setTeam]
        = useState<ITeam | undefined | null>();
    const [driversInTeam, setDriversInTeam]
        = useState<Array<IDriver> | undefined | []>();
    const [openLeague, setOpenLeague]
        = useState<ILeague | undefined | null>();
    const [currentLeague, setCurrentLeague]
        = useState<ILeague | undefined | null>();
    const [leagueTeams, setLeagueTeams]
        = useState<Array<ITeam> | undefined | []>();
    const [isLeagueActive, setIsLeagueActive]
        = useState<boolean | undefined | null>();
    const [isLeagueFull, setIsLeagueFull]
        = useState<boolean | undefined | null>();
    const [showPracticeOptions, setShowPracticeOptions]
        = useState<boolean | undefined | null>();
    const [isPracticeLeague, setIsPracticeLeague]
        = useState<boolean | undefined | null>();
    const [isDraftInProgress, setIsDraftInProgress]
        = useState<boolean | undefined | null>();
    const [undraftedDrivers, setUndraftedDrivers]
        = useState<Array<IDriver> | undefined | null>();
    const [currentPickNumber, setCurrentPickNumber]
        = useState<number | undefined | null>();
    const [currentPick, setCurrentPick]
        = useState<IUser | undefined | null>();
    const [selectedDriver, setSelectedDriver]
        = useState<IDriver | undefined | null>();
    const [lastDriverPicked, setLastDriverPicked]
        = useState<IDriver | undefined | null>();
    const [lastPickTime, setLastPickTime]
        = useState<Date | undefined | null>();

    // const navigate: NavigateFunction = useNavigate();
    // const [loading, setLoading]
    //     = useState<boolean>(false);
    // const [message, setMessage]
    //     = useState<string>("");

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
    // // }, [isDraftInProgress, currentPickNumber, currentPick]);


    useEffect(() => {
        const fetchUser = async () => {
            await getUserData(getUserFromLocalStorage().id)
                .then(res => {
                    console.log("userDate res")
                    console.log(res)
                    setCurrentUser(res)
                    setTeam(res.team)
                    console.log(res.team.leagueId)
                    setCurrentLeague(res.team.leagueId)
                })
                .then(() => {
                    console.log("after userData")
                    console.log(currentUser)
                    console.log(currentLeague)
                })
        }
        fetchUser()
            .then(() => {
                console.log("after-after  userData")
                console.log(currentUser)
                console.log(currentLeague)
            })
        // console.log("after-after-after  userData")
        // console.log(currentUser)
        // console.log(currentLeague)
    }, [])

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
    //                         setCurrentPick(response);
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


    function togglePracticeOptions() {
        if (showPracticeOptions) {
            setShowPracticeOptions(false);
        } else {
            setShowPracticeOptions(true);
        }
    }

    function togglePracticeLeague() {
        if (isPracticeLeague) {
            postToggleTestLeague(currentLeague?.leagueId)
                .then(function (response) {
                    setIsPracticeLeague(response);
                })
        } else {
            postToggleTestLeague(currentLeague?.leagueId)
                .then(function (response) {
                    setIsPracticeLeague(response);
                })
        }
    }

    const addTestTeam = async () => {
        await createTestTeam(currentLeague?.leagueId)
            .then(async () => {
                await getAllLeagueTeams(currentLeague?.leagueId)
                    .then(async (res) => {
                        setLeagueTeams(res)
                        if (res.length >= 10) {
                            await getIsDraftInProgress(currentLeague?.leagueId)
                                .then(res => {
                                    setIsDraftInProgress(res);
                                    setIsLeagueFull(true);
                                    console.log("2" + isDraftInProgress)
                                })
                        }
                    })
            });
    }

    const handleDriverSelection = (driverId: number | null | undefined) => {
        getDriverData(driverId)
            .then(function (response) {
                setSelectedDriver(response);
            })
        return driverId;
    }

    const handlePick = async (driverId: number | null | undefined) => {
        await postPickDriver(currentUser?.id, driverId)
            .then(async () => await getDriverData(driverId)
                .then(res => {
                    setLastDriverPicked(res)
                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);
                    setLastPickTime(today);
                    getNextPick(currentUser?.team?.league?.leagueId)
                        .then(res => {
                            setCurrentPick(res);
                        })


                    console.log(res)
                    console.log("lastDriverPicked")
                    console.log(lastDriverPicked)
                    console.log("lastPickTime")
                    console.log(lastPickTime)
                }));
        //     .then(response => {
        //         console.log("postPickDriver")
        //         console.log(response)
        //         setLastDriverPicked(response);
        //         const timeElapsed = Date.now();
        //         const today = new Date(timeElapsed);
        //         setLastPickTime(today);
        //     })
        // // getDriverData(driverId)
        // //     .then(function (response) {
        // //         setLastDriverPicked(response);
        // //     })
        //
        // const timeElapsed = Date.now();
        // const today = new Date(timeElapsed);
        // setLastPickTime(today);
        //
        // console.log("lastDriverPicked")
        // console.log(lastDriverPicked)
        // console.log("lastPickTime")
        // console.log(lastPickTime)

    };
    console.log("lastDriverPicked")
    console.log(lastDriverPicked)
    console.log("lastPickTime")
    console.log(lastPickTime)

    return (
        <>
            <View loading={loading}>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="col-start-2 col-span-1">
                                <DashTop
                                    currentUser={currentUser}
                                    // userData={userData}
                                    team={team}
                                    driversInTeam={driversInTeam}
                                    openLeague={openLeague}
                                    currentLeague={currentLeague}
                                    leagueTeams={leagueTeams}
                                    isPracticeLeague={isPracticeLeague}
                                    isLeagueFull={isLeagueFull}
                                    isDraftInProgress={isDraftInProgress}
                                    currentPickNumber={currentPickNumber}
                                    currentPick={currentPick}
                                    isLeagueActive={isLeagueActive}/>
                            </div>
                            <div className="col-start-3 col-span-2">
                                <Reminders/>
                            </div>
                            <div className="col-start-2 col-span-3">
                                <DraftControls
                                    currentLeague={currentLeague}
                                    isPracticeLeague={isPracticeLeague}
                                    isLeagueFull={isLeagueFull}
                                    showPracticeOptions={showPracticeOptions}
                                    togglePracticeOptions={togglePracticeOptions}
                                    togglePracticeLeague={togglePracticeLeague}
                                    addTestTeam={addTestTeam}
                                    currentUser={currentUser}
                                    isDraftInProgress={isDraftInProgress}
                                    currentPickNumber={currentPickNumber}
                                    currentPick={currentPick}
                                    selectedDriver={selectedDriver}
                                    lastDriverPicked={lastDriverPicked}
                                    lastPickTime={lastPickTime}
                                    isLeagueActive={isLeagueActive}/>
                            </div>
                            {isLeagueActive ?
                                <>
                                    <div className="col-start-2 col-span-3">
                                        <Table1
                                            isLeagueActive={isLeagueActive}
                                            openLeague={openLeague}
                                            currentLeague={currentLeague}
                                            leagueTeams={leagueTeams}
                                            isDraftInProgress={isDraftInProgress}/>
                                    </div>
                                    <div className="col-start-2 col-span-3">
                                        <Table2
                                            currentUser={currentUser}
                                            isLeagueFull={isLeagueFull}
                                            isLeagueActive={isLeagueActive}
                                            isDraftInProgress={isDraftInProgress}
                                            undraftedDrivers={undraftedDrivers}
                                            currentPick={currentPick}
                                            handleDriverSelection={handleDriverSelection}
                                            handlePick={handlePick}/>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-start-2 col-span-1"><Table1
                                        isLeagueActive={isLeagueActive}
                                        openLeague={openLeague}
                                        currentLeague={currentLeague}
                                        leagueTeams={leagueTeams}
                                        isDraftInProgress={isDraftInProgress}/>
                                    </div>
                                    <div className="col-start-3 col-span-2">
                                        <Table2
                                            currentUser={currentUser}
                                            isLeagueFull={isLeagueFull}
                                            isLeagueActive={isLeagueActive}
                                            isDraftInProgress={isDraftInProgress}
                                            undraftedDrivers={undraftedDrivers}
                                            currentPick={currentPick}
                                            handleDriverSelection={handleDriverSelection}
                                            handlePick={handlePick}/>
                                    </div>
                                </>
                            }
                        </div>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    )
        ;
}

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