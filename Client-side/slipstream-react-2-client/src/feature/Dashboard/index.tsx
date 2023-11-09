import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import DashTop from "./DashTop";
import Reminders from "./Reminders";
import Table1 from "./Table1";
import Table2 from "./Table2";
import {SetStateAction, useEffect, useState} from "react";
import {
    getAllLeagueTeams,
    getIsDraftInProgress,
    getIsLeagueActive,
    getNextPickName,
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
import {getDriverData, getUndraftedDrivers} from "../../services/driver.service.ts";
import DraftControls from "./DraftControls";

export default function Dashboard() {
    const [currentUser, setCurrentUser]
        = useState<IUser | undefined>();
    const [userData, setUserData]
        = useState<IUser | undefined>();
    const [team, setTeam]
        = useState<ITeam | undefined>();
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
    const [currentPickName, setCurrentPickName]
        = useState<string | undefined>("");
    const [selectedDriver, setSelectedDriver]
        = useState<IDriver | undefined>();
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
    //  Enable draft picking functionality.
    //  Fix so only team owner can add to their team, or test teams.
    //  Check picking function to show driver selected before confirming pick.

    useEffect(() => {
        const user = getCurrentUser();
        setCurrentUser(user);
        const fetchUserData = async () => {
            if (user != null) {
                const userData = await getUserData(user.id);
                setUserData(userData);
                console.log("userData");
                console.log(userData);
                console.log("userData drivers");
                console.log(userData?.team?.drivers);

                if (userData.team) {
                    setTeam(await getTeam(userData?.team?.id));
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
                    getNextPickName(leagueData.leagueId)
                        .then(function (response) {
                            setCurrentPickName(response);
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
                    ;
                    setSelectedDriver(selectedDriver);
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
        }
        fetchUserData().catch(console.error);
    }, []);

    console.log("dash team")
    console.log(team)
    console.log("dash team drivers")
    console.log(team?.drivers)

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
        await createTestTeam(currentLeague?.leagueId);

        getAllLeagueTeams(currentLeague?.leagueId)
            .then((response) => {
                setLeagueTeams(response)
            })
    }

    const handleDriverSelection = (driver) => {
        setSelectedDriver(driver);
    }

    // const handleDriverSelection = (driverId: number | null | undefined) => {
    //     getDriverData(driverId)
    //         .then(function (response) {
    //             setSelectedDriver(response);
    //         })
    // }
    // const handlePick = (driverId: string) => {
    //     // const {driverId} = formValue;
    //     console.log("handlePick");
    //     console.log(currentUser?.id);
    //     console.log(driverId);
    //     setMessage("");
    //     setLoading(true);
    //
    //     postPickDriver(currentUser?.id, driverId).then(
    //         () => {
    //             navigate("/dashboard");
    //             window.location.reload();
    //         },
    //         (error) => {
    //             const resMessage =
    //                 (error.response &&
    //                     error.response.data &&
    //                     error.response.data.message) ||
    //                 error.message ||
    //                 error.toString();
    //
    //             setLoading(false);
    //             setMessage(resMessage);
    //         }
    //     );
    // };

    return (
        <>
            <View>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <DashTop
                            currentUser={currentUser}
                            userData={userData}
                            team={team}
                            openLeague={openLeague}
                            currentLeague={currentLeague}
                            leagueTeams={leagueTeams}
                            isPracticeLeague={isPracticeLeague}
                            isLeagueFull={isLeagueFull}
                            isDraftInProgress={isDraftInProgress}
                            currentPickNumber={currentPickNumber}
                            currentPickName={currentPickName}/>
                        <Reminders/>
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
                            currentPickName={currentPickName}
                            selectedDriver={selectedDriver}/>
                        <Table1
                            isLeagueActive={isLeagueActive}
                            openLeague={openLeague}
                            currentLeague={currentLeague}
                            leagueTeams={leagueTeams}
                            isDraftInProgress={isDraftInProgress}/>
                        <Table2
                            currentUser={currentUser}
                            isLeagueFull={isLeagueFull}
                            isLeagueActive={isLeagueActive}
                            isDraftInProgress={isDraftInProgress}
                            undraftedDrivers={undraftedDrivers}
                            currentPickName={currentPickName}
                            handleDriverSelection={handleDriverSelection}/>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}