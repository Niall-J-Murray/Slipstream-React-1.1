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
    getIsLeagueActive,
    getNextPick,
    getOpenLeague,
    getPickNumber,
    getTeamLeague,
    postToggleTestLeague
} from "../../services/league.service.ts";
import {getCurrentUser} from "../../services/auth.service.ts";
import {getUserData} from "../../services/user.service.ts";
import IUser from "../../types/user.type.ts";
import ITeam from "../../types/team.type.ts";
import ILeague from "../../types/league.type.ts";
import {createTestTeam, getTeam} from "../../services/team.service.ts";
import IDriver from "../../types/driver.type.ts";
import {getDriverData, getDriversInTeam, getUndraftedDrivers, postPickDriver} from "../../services/driver.service.ts";
import DraftControls from "./DraftControls";

export default function Dashboard({loading, toggleLoading}) {
    const [currentUser, setCurrentUser]
        = useState<IUser | undefined>();
    const [userData, setUserData]
        = useState<IUser | undefined>();
    const [team, setTeam]
        = useState<ITeam | undefined>();
    const [driversInTeam, setDriversInTeam]
        = useState<Array<IDriver> | undefined>();
    const [openLeague, setOpenLeague]
        = useState<ILeague | undefined>();
    const [currentLeague, setCurrentLeague]
        = useState<ILeague | undefined>();
    const [leagueTeams, setLeagueTeams]
        = useState<Array<ITeam> | undefined>([]);
    const [isLeagueActive, setIsLeagueActive]
        = useState<boolean>(false);
    const [isLeagueFull, setIsLeagueFull]
        = useState<boolean>(false);
    const [showPracticeOptions, setShowPracticeOptions]
        = useState<boolean>(false);
    const [isPracticeLeague, setIsPracticeLeague]
        = useState<boolean>();
    const [isDraftInProgress, setIsDraftInProgress]
        = useState<boolean>(false);
    const [undraftedDrivers, setUndraftedDrivers]
        = useState<Array<IDriver> | undefined>([]);
    const [currentPickNumber, setCurrentPickNumber]
        = useState<number>(0)
    const [currentPick, setCurrentPick]
        = useState<IUser | undefined>("");
    const [selectedDriver, setSelectedDriver]
        = useState<IDriver | undefined>();
    const [lastDriverPicked, setLastDriverPicked]
        = useState<IDriver | undefined>();
    const [lastPickTime, setLastPickTime]
        = useState<Date>();
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

    // Todo Display correct info and options in dash-top depending on users team/league status.
    //  ---
    //  Add toggles to show/hide certain boxes.
    //  Fix layouts for consistency.
    //  Fix draft instructions to display according to user status.
    //  Finish loading spinner graphic, and pause page loading until all data is fetched.
    //  Fix data missing data on page reloads.
    //  Check test teams disappearing mid-draft after user logout.

    useEffect(() => {
        const user = getCurrentUser();
        setCurrentUser(user);
        const fetchUserData = async () => {
            // toggleLoading(true);
            if (user != null) {
                const userData = await getUserData(user.id);
                setUserData(userData);

                if (userData.team) {
                    setTeam(await getTeam(userData?.team?.id))
                }
                getOpenLeague()
                    .then(function (response) {
                        setOpenLeague(response);
                    })
                if (userData.team) {
                    const leagueData = await getTeamLeague(userData.team.id);
                    await getAllLeagueTeams(leagueData.leagueId)
                        .then(function (response) {
                            setLeagueTeams(response)
                        })
                    getDriversInTeam(userData.team.id)
                        .then(function (response) {
                            setDriversInTeam(response);
                        })
                    getIsLeagueActive(leagueData.leagueId)
                        .then(function (response) {
                            setIsLeagueActive(response);
                        })
                    getIsLeagueActive(leagueData.leagueId)
                        .then(function (response) {
                            setIsLeagueActive(response);
                        })
                    getIsDraftInProgress(leagueData.leagueId)
                        .then(function (response) {
                            setIsDraftInProgress(response);
                        })
                    getPickNumber(leagueData.leagueId)
                        .then(function (response) {
                            setCurrentPickNumber(response);
                        })
                    getNextPick(leagueData.leagueId)
                        .then(function (response) {
                            setCurrentPick(response);
                        })
                    getUndraftedDrivers(leagueData.leagueId)
                        .then(function (response) {
                            setUndraftedDrivers(response);
                        })
                    setCurrentLeague(leagueData);
                    setIsPracticeLeague(leagueData.isPracticeLeague);
                    if (leagueData.teams.length >= 10) {
                        setIsLeagueFull(true)
                    }
                } else {
                    await getOpenLeague()
                        .then(function (response) {
                            setOpenLeague(response);
                            setCurrentLeague(response);
                            getIsLeagueActive(response.leagueId)
                                .then(function (response) {
                                    setIsLeagueActive(response);
                                })
                            getAllLeagueTeams(response.leagueId)
                                .then(function (response) {
                                    console.log("getAllLeagueTeams(response.leagueId)")
                                    console.log(response)
                                    setLeagueTeams(response)
                                })
                        })
                }
            }
            setTimeout(toggleLoading(false), 5000);
        }
        fetchUserData().catch(console.error);

        // toggleLoading(false);
    }, []);

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
            .then(() => {
                    if (currentLeague?.teams?.length >= 10) {
                        setIsLeagueFull(true);
                    }
                }
            )


        // getAllLeagueTeams(currentLeague?.leagueId)
        //     .then((response) => {
        //         setLeagueTeams(response)
        //     })
        //     .then(() => {
        //         if (currentLeague?.teams?.length >= 10) {
        //             setIsLeagueFull(true);
        //         }
        //     });
    }

    // const handleDriverSelection = (driver) => {
    //     setSelectedDriver(driver);
    // }

    const handleDriverSelection = (driverId: number | null | undefined) => {
        getDriverData(driverId)
            .then(function (response) {
                setSelectedDriver(response);
            })
        return driverId;
    }

    const handlePick = (driverId: number | null | undefined) => {
        postPickDriver(currentUser?.id, driverId)
            .then(function (response) {
                console.log(response)
                setLastDriverPicked(response);
                const timeElapsed = Date.now();
                const today = new Date(timeElapsed);
                setLastPickTime(today);
            })

        console.log(lastDriverPicked)
        console.log(lastPickTime)
    };

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
                                    userData={userData}
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