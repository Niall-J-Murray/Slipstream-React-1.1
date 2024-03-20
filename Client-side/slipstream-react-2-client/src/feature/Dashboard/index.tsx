import DashTop from "./DashTop";
import DriverTable from "./DriverTable";
import {useEffect, useState} from "react";
import {Toaster} from 'react-hot-toast';
import {postToggleTestLeague} from "../../services/league.service.ts";
import DraftControls from "./DraftControls";
import DraftPickTips from "./DraftPickTips";
import Layout from "../../components/Layout/Layout.tsx";
import IDriver from "../../types/driver.type.ts";
import IUser from "../../types/user.type.ts";
import {
    useAllTeamsInLeague,
    useLeagueData,
    useNextPickNumber,
    useNextUserToPick,
    useOpenLeague
} from "../../hooks/queries/league-queries.ts";
import {useCreateTeam, useCreateTestTeam, useDeleteTeam, useDeleteTestTeams} from "../../hooks/queries/team-queries.ts";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";
import {useDriversInTeam, usePickDriver, useUndraftedDrivers} from "../../hooks/queries/driver-queries.ts";
import ITeam from "../../types/team.type.ts";
import ActiveLeagueInfo from "./ActiveLeagueInfo";
import * as Yup from "yup";
import PostDraftLeagueTable from "./LeagueTable/PostDraftLeagueTable";
import PreDraftLeagueTable from "./LeagueTable/PreDraftLeagueTable";
import {hideLoader, showLoader} from "../../services/loading.service.ts";
import Login from "../Login";

import {Debugout} from 'debugout.js';

interface DashboardProps {
    userData: undefined | IUser
}

// Todo Display correct info and options in dash-top depending on users team/league status.
//  ---
//  Finish driver picking UX
//  Tweak query refetch logic & finish websocket integration
//  ---
//  Check draft add test team and draft picking functions after dashboard refactor.
//  Finish loading spinner graphic, and pause page loading until all data is fetched.
//  Fix data missing data on page reloads.
//  Check test teams disappearing mid-draft after user logout.
//  Add toggles to show/hide certain boxes.
//  Change "Register" to "Sign Up", "Login" to "Sign In" and "Log Out"...

export default function Dashboard({userData}: DashboardProps) {

    const bugout = new Debugout();
    const [showDraftPickTips, setShowDraftPickTips]
        = useState<boolean | undefined>(true);
    const [isPracticeLeague, setIsPracticeLeague]
        = useState<boolean | undefined | null>();
    const [isLeagueFull, setIsLeagueFull]
        = useState<boolean | undefined | null>(false);
    const [isDraftInProgress, setIsDraftInProgress]
        = useState<boolean | undefined>();
    // const [currentPickNumber, setCurrentPickNumber]
    //     = useState<number | undefined | null>();
    const [isLeagueActive, setIsLeagueActive]
        = useState<boolean | undefined | null>();
    const [isUsersTurnToPick, setIsUsersTurnToPick]
        = useState<boolean>(false);
    // const [isWaitingForPick, setIsWaitingForPick]
    //     = useState<boolean | undefined | null>();
    const [leagueSize, setLeagueSize]
        = useState<number | undefined | null>(0);
    const [leagueTeams, setLeagueTeams]
        = useState<Array<ITeam> | undefined | null>([])
    const [selectedDriver, setSelectedDriver]
        = useState<IDriver | undefined | null>();
    const [lastDriverPicked, setLastDriverPicked]
        = useState<string | undefined | null>();
    const [lastPickTime, setLastPickTime]
        = useState<Date | string | undefined | null>();

    const [loading, setLoading]
        = useState<boolean>(false);
    const [message, setMessage]
        = useState<string>("");

    // const [listening, setListening]
    //     = useState(false);
    // const [data, setData] = useState<any[]>([]);
    // let eventSource: EventSource | undefined = undefined;

    // useEffect(() => {
    //     if (!listening) {
    //         eventSource = new EventSource("http://localhost:8080/api/sse/test-pick-made");
    //
    //         eventSource.onopen = (event) => {
    //             console.log("connection opened")
    //             console.log("event.type")
    //             console.log(event.type)
    //             console.log("event.target")
    //             console.log(event.target)
    //         }
    //
    //
    //         eventSource.addEventListener("message", (event) => {
    //             console.log("eventData1")
    //             console.log(event.data)
    //             data.push(event.data)
    //             setData(data)
    //         });
    //         // if (event.data && event.data !== userId) {
    //         //     navigate("/dashboard");
    //         // }
    //
    //
    //         // eventSource.onmessage = (event) => {
    //         //     console.log("message received")
    //         //     console.log("result", event.data);
    //         //     console.log(event.type);
    //         //     // setData(old => [...old, event.data])
    //         //     data.push(event.data)
    //         //     setData(data)
    //         //     // console.log("data")
    //         //     // console.log(data)
    //         // }
    //
    //         eventSource.onerror = (event) => {
    //             console.log("event.target.readyState")
    //             console.log(event.target)
    //             // if (event.target.readyState === EventSource.CLOSED) {
    //             //     console.log('eventsource closed (' + event.target.readyState + ')')
    //             // }
    //             // if (event.target === EventSource.CLOSED) {
    //             //     console.log('eventsource closed (' + event + ')')
    //             // }
    //             eventSource?.close();
    //         }
    //
    //         setListening(true);
    //     }
    //
    //     return () => {
    //         eventSource?.close();
    //         console.log("eventsource closed")
    //     }
    //
    // }, [])

    // if (data.length) {
    //     console.log("data")
    //     console.log(data)
    // }
    // const [toggleNextToPickQuery, setToggleNextToPickQuery]
    //     = useState<boolean | undefined>(false);


    const initialValues: {
        teamName: string;
    } = {
        teamName: "",
    };


    const validationSchema: Yup.ObjectSchema<object> = Yup.object().shape({
        teamName: Yup.string()
            .test(
                "length",
                "Team name must be between 3 and 20 characters",
                (val: any) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
            )
            .required("Please enter a valid team name"),
    });

    const navigate: NavigateFunction = useNavigate();
    // const eventSource = new EventSource("http://localhost:8080/api/sse/eventEmitter");

    const {
        data: openLeague,
        isLoading: loadingOpenLeague,
        error: errOpenLeague,
    } = useOpenLeague();

    const userId = userData ? userData?.id : null;
    const leagueId = userData?.team ? (userData?.team?.leagueNumber) : openLeague?.id;
    const teamsInLeague: Array<ITeam> | undefined | null = useAllTeamsInLeague(leagueId).data;


    const {
        data: leagueData,
        isLoading: loadingLeagueData,
        error: errLeagueData,
    } = useLeagueData(leagueId);
    // } = useLeagueData(leagueId, toggleNextToPickQuery);

    // let currentPickNumber: undefined | number | null;
    // let nextUserToPick: undefined | IUser;
    // if (!isUsersTurnToPick){
    //   currentPickNumber = useNextPickNumber(leagueId).data;
    //     nextUserToPick = useNextUserToPick(leagueId).data;
    // }

    const queryClient = useQueryClient();
    const driversInTeam = useDriversInTeam;
    // const currentPickNumber = useNextPickNumber(leagueId, toggleNextToPickQuery).data;
    // const nextUserToPick = useNextUserToPick(leagueId, toggleNextToPickQuery).data;
    // const undraftedDrivers = useUndraftedDrivers(leagueId, toggleNextToPickQuery).data;

    const currentPickNumber = useNextPickNumber(leagueId).data;
    const nextUserToPick = useNextUserToPick(leagueId).data;
    const undraftedDrivers = useUndraftedDrivers(leagueId).data;
    // const pickNumber = useNextPickNumber(leagueId).data;
    // const pickNumberRef = useRef(currentPickNumber);
    const pickDriver = usePickDriver();

    const createTeam = useCreateTeam();
    const deleteTeam = useDeleteTeam(userId);
    const createTestTeam = useCreateTestTeam(leagueId);
    const deleteTestTeams = useDeleteTestTeams(leagueId);

    // const handleServerEvents = () => {
    //     // const data = null;
    //     const data = new FormData();
    //     const source = new EventSource("http://localhost:8080/api/sse/eventEmitter");
    //     let guidValue = null;
    //
    //     source.addEventListener("GUI_ID", (event) => {
    //         guidValue = JSON.parse(event.data);
    //         console.log(`Guid from server: ${guidValue}`);
    //         data.append("guid", guidValue);
    //         source.addEventListener(guidValue, (event) => {
    //             const result = JSON.parse(event.data);
    //             console.log("result")
    //             console.log(result)
    //         })
    //     });
    // }

    // const eventSource = new EventSource("http://localhost:8080/api/sse/pick-made");
    // eventSource.addEventListener("pick_made", (event) => {
    //     console.log("eventData1")
    //     console.log(event.data)
    //     if (event.data && event.data !== userId) {
    //         navigate("/dashboard");
    //     }
    // });
    // let data = "";
    // let eventData: null = null;

    // const handleServerPickEvents = () => {
    //     // let data = "";
    //     // let eventData: null = null;
    //     const eventSource = new EventSource("http://localhost:8080/api/sse/pick-made");
    //
    //     if (!listening) {
    //         bugout.log('listening:');
    //         eventSource.addEventListener("pick_made", (event) => {
    //             bugout.log("eventData1")
    //             bugout.log(event.data)
    //             eventData = event.data
    //             data = JSON.stringify(eventData)
    //             if (event.data &&
    //                 event.data != userId) {
    //                 navigate("/home");
    //             } else {
    //                 navigate("/logout");
    //             }
    //         });
    //         bugout.log(eventData)
    //         bugout.log(data)
    //         bugout.downloadLog()
    //         eventSource?.close();
    //     }
    //     setListening(true);
    //     return () => {
    //         eventSource?.close();
    //         console.log("eventsource closed")
    //         console.log("data2")
    //         console.log(data)
    //         console.log("eventData2")
    //         console.log(eventData)
    //
    //     }
    // }


    // eventSource.addEventListener("pick_made", (event) => {
    //     data = event.type;
    //     eventData = event.data;
    //     // eventData = JSON.parse(event.data);
    //     // console.log("data1")
    //     // console.log(data)
    //     console.log("eventData2")
    //     // console.log(event)
    //     console.log(event.timeStamp)
    //     console.log(data)
    //     console.log(eventData)
    //     queryClient.invalidateQueries()
    //         .then(() => {
    //                 if (data) {
    //                     console.log("refresh")
    //                     // window.location.reload();
    //                     navigate("/home");
    //                 }
    //             }
    //         );
    // });
    const [listening, setListening] = useState(false);
    const [data, setData] = useState([]);
    let eventSource = undefined;

    const handleServerEvents = () => {
        if (!listening) {
            // eventSource = new EventSource("http://localhost:8080/api/sse/time");
            eventSource = new EventSource("http://localhost:8080/api/sse/pick-made-test");

            eventSource.onopen = (event) => {
                console.log("connection opened")
            }

            eventSource.onmessage = (event) => {
                console.log("result", event.data);
                setData(old => [...old, event.data])
            }

            eventSource.onerror = (event) => {
                console.log(event.target.readyState)
                if (event.target.readyState === EventSource.CLOSED) {
                    console.log('eventsource closed (' + event.target.readyState + ')')
                }
                eventSource.close();
            }

            setListening(true);
        }
        console.log("pick made")
        return () => {
            eventSource.close();
            console.log("eventsource closed")
        }
    };


    // useEffect(() => {
    //     if (!listening) {
    //         // eventSource = new EventSource("http://localhost:8080/api/sse/time");
    //         eventSource = new EventSource("http://localhost:8080/api/sse/pick-made-test");
    //
    //         eventSource.onopen = (event) => {
    //             console.log("connection opened")
    //         }
    //
    //         eventSource.onmessage = (event) => {
    //             console.log("result", event.data);
    //             setData(old => [...old, event.data])
    //         }
    //
    //         eventSource.onerror = (event) => {
    //             console.log(event.target.readyState)
    //             if (event.target.readyState === EventSource.CLOSED) {
    //                 console.log('eventsource closed (' + event.target.readyState + ')')
    //             }
    //             eventSource.close();
    //         }
    //
    //         setListening(true);
    //     }
    //
    //     return () => {
    //         eventSource.close();
    //         console.log("eventsource closed")
    //     }
    //
    // }, [])


    useEffect(() => {
        if (!userData) {
            navigate("/login");
        }

        // console.log("isDraftInProgress")
        // console.log(isDraftInProgress)
        // if (isDraftInProgress && !isUsersTurnToPick) {
        //     setToggleNextToPickQuery(true);
        // }
        // if (isDraftInProgress) {
        //     handleServerEvents()
        // }

        if (userData?.id == nextUserToPick?.id || nextUserToPick?.isTestUser) {
            setIsUsersTurnToPick(true);
        }
        // else
        // {
        //     console.log("is pick source")
        //     const source = new EventSource("http://localhost:8080/api/sse/test-pick-made");
        //     source.onmessage = function (event) {
        //         console.log("event.data");
        //         console.log(event.data);
        //     };
        // }

        setLeagueTeams(teamsInLeague);
        setLeagueSize(leagueTeams?.length);
        setIsPracticeLeague(leagueData?.isPracticeLeague);
        setShowDraftPickTips(!leagueData?.isPracticeLeague);

        if (leagueSize
            && leagueSize >= 10) {
            setIsLeagueFull(true);
            if (!leagueData?.isActive) {
                setIsDraftInProgress(true);
                setShowDraftPickTips(false);
                // setToggleNextToPickQuery(true);
            }
        }

        // if (isDraftInProgress) {
        //     setToggle(prevState => !prevState);
        // }

        setLastDriverPicked(leagueData?.lastDriverPickedName)
        setLastPickTime(leagueData?.lastPickTime);

        setSelectedDriver(undraftedDrivers?.find((driver: IDriver) =>
            driver !== undefined));

        if ((currentPickNumber && currentPickNumber > 20)
            || leagueData?.isActive) {
            setIsDraftInProgress(false);
            setIsLeagueActive(true);
        }

        // handleServerPickEvents();
    }, [userData, loadingLeagueData, leagueData, isLeagueFull, isPracticeLeague, isDraftInProgress, isUsersTurnToPick, isLeagueActive, nextUserToPick, undraftedDrivers, currentPickNumber, lastDriverPicked]);

    const handleCreateTeam = (formValue: { teamName: string }) => {
        const {teamName} = formValue;

        setMessage("");
        setLoading(true);

        createTeam.mutateAsync({userId, teamName})
            .then(() => {
                    queryClient.invalidateQueries()
                        .then(() => {
                            if (leagueSize === 10) {
                                window.location.reload();
                            }
                        })
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            )
    };

    const handleDeleteUserTeam = () => {
        // postDeleteUserTeam(userData?.id)
        // postDeleteUserTeam(userData?.id)
        // alert("Are you sure you want to delete your team?")
        // toast("Are you sure you want to delete your team?")
        if (confirm("Are you sure you want to delete your team?")) {

            deleteTeam.mutateAsync()
                .then(() => {
                    // if (deleteTeam.isSuccess) {
                    queryClient.invalidateQueries()
                        .then(() => {
                            navigate("/home")
                            // queryClient.invalidateQueries("leagueData")
                            // queryClient.invalidateQueries("allTeamsInLeague")
                        });
                    // }
                });
            // setToggle(prevState => !prevState);
        }

    }


    function togglePracticeOptions() {
        if (showDraftPickTips) {
            setShowDraftPickTips(false);
        } else {
            setShowDraftPickTips(true);
        }
    }

    function togglePracticeLeague() {
        if (isPracticeLeague) {
            postToggleTestLeague(leagueId)
                .then(res => {
                    setIsPracticeLeague(res);
                })
                .then(() => navigate("/dashboard"))
        } else {
            postToggleTestLeague(leagueId)
                .then(res => {
                    setIsPracticeLeague(res);
                })
                .then(() => window.location.reload())
        }
    }

    const addTestTeam = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        createTestTeam.mutateAsync()
            .then(() => {
                queryClient.invalidateQueries("allTeamsInLeague")
                    .then(() => {
                            setLeagueTeams(teamsInLeague);
                            setLeagueSize(leagueTeams?.length);
                        }
                    )
                    .then(() => {
                        if (isLeagueFull) {
                            window.location.reload();
                        }
                    })
            })
        // window.location.reload();
        console.log(leagueTeams?.length)
        if (leagueTeams && leagueTeams.length >= 9) {
            window.location.reload();
        }
    }

    const handleDeleteTestTeams = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        deleteTestTeams.mutateAsync()
            .then(() => {
                queryClient.invalidateQueries("allTeamsInLeague")
                    .then(() => {
                            setLeagueTeams(teamsInLeague);
                            setLeagueSize(leagueTeams?.length);
                            setIsPracticeLeague(false);
                        }
                    )
            })
            .then(() => window.location.reload());
        window.location.reload();
    }

    const handleDriverSelection = (driver: IDriver) => {
        setSelectedDriver(driver)
        return driver;
    }

    const handlePick = (e: { preventDefault: () => void; },
                        driverId: number | undefined | null) => {
        // driverId: number | string | undefined) => {
        e.preventDefault();
        pickDriver.mutateAsync({
            userId: userId,
            driverId: driverId,
        })
            // .then(() => queryClient.invalidateQueries(["leagueData","nextPickNumber","nextUserToPick"]))
            .then(() => queryClient.invalidateQueries())
            .then(() => setIsUsersTurnToPick(false))
        // .then(() => setToggleNextToPickQuery(true));
        // setIsUsersTurnToPick(false);
        // window.location.reload();

        // handleServerPickEvents();

        handleServerEvents()

        // console.log("pick made")
    }

    const isLoading = loadingOpenLeague || loadingLeagueData;
    const error = errOpenLeague || errLeagueData;

    if (isLoading) {
        return <>{showLoader()}</>
        // showLoader();
    } else {
        hideLoader();
    }

    if (error) {
        return (<Login userData={userData} error={error}/>);
    }

    // bugout.log('test log2:', data.toString(), eventData);
// bugout.downloadLog()
// const PreDraftDashboard = () => {

    function PreDraftDashboard() {
        return (
            <>
                <div className="col-start-3 col-span-3 h-75 box-shadow">
                    <DashTop
                        userData={userData}
                        leagueData={leagueData}
                        leagueSize={leagueSize}
                        isPracticeLeague={isPracticeLeague}
                        isLeagueFull={isLeagueFull}
                        isLeagueActive={isLeagueActive}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        loading={loading}
                        message={message}
                        driversInTeam={driversInTeam}
                        handleCreateTeam={handleCreateTeam}
                        handleDeleteUserTeam={handleDeleteUserTeam}
                    />
                </div>
                {/*<div id="practice-draft-options" className="col-start-3 col-span-2 h-125 box-shadow">*/}
                <div className="col-start-6 col-span-5 h-75 box-shadow">
                    {showDraftPickTips ?
                        <DraftPickTips
                            isPracticeLeague={isPracticeLeague}
                            showDraftPickTips={showDraftPickTips}
                            togglePracticeOptions={togglePracticeOptions}
                        />
                        :
                        <>
                            <DraftControls
                                userData={userData}
                                leagueData={leagueData}
                                isPracticeLeague={isPracticeLeague}
                                isLeagueFull={isLeagueFull}
                                showDraftPickTips={showDraftPickTips}
                                selectedDriver={selectedDriver}
                                lastPickTime={lastPickTime}
                                lastDriverPicked={lastDriverPicked}
                                isLeagueActive={isLeagueActive}
                                currentPickNumber={currentPickNumber}
                                isUsersTurnToPick={isUsersTurnToPick}
                                nextUserToPick={nextUserToPick}
                                togglePracticeOptions={togglePracticeOptions}
                                togglePracticeLeague={togglePracticeLeague}
                                addTestTeam={addTestTeam}
                                handlePick={handlePick}/>
                            <hr/>
                            <div className="App">
                                <header className="App-header">
                                    Received Data
                                    {data.map(d =>
                                        <div key={d}>{d}</div>
                                    )}
                                </header>
                            </div>
                        </>
                    }
                </div>
                <div className="col-start-3 col-span-3">
                    <PreDraftLeagueTable
                        leagueData={leagueData}
                        leagueSize={leagueSize}
                        leagueTeams={leagueTeams}
                        nextUserToPick={nextUserToPick}
                        isDraftInProgress={isDraftInProgress}
                    />
                </div>
                <div className="col-start-6 col-span-5">
                    <DriverTable
                        isDraftInProgress={isDraftInProgress}
                        isUsersTurnToPick={isUsersTurnToPick}
                        selectedDriver={selectedDriver}
                        undraftedDrivers={undraftedDrivers}
                        handleDriverSelection={handleDriverSelection}
                    />
                </div>
            </>
        );
    }

    function PostDraftDashboard() {
        if (!leagueData?.activeTimestamp) {
            window.location.reload();
        }
        return (
            <>
                <div className="col-start-3 col-span-3 h-125 box-shadow">
                    <DashTop
                        userData={userData}
                        leagueData={leagueData}
                        leagueSize={leagueSize}
                        isPracticeLeague={isPracticeLeague}
                        isLeagueFull={isLeagueFull}
                        isLeagueActive={isLeagueActive}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        loading={loading}
                        message={message}
                        driversInTeam={driversInTeam}
                        handleCreateTeam={handleCreateTeam}
                        handleDeleteUserTeam={handleDeleteUserTeam}
                    />
                    <Toaster/>
                </div>
                {/*<div id="practice-draft-options" className="col-start-3 col-span-2 h-125 box-shadow">*/}
                <div className="col-start-6 col-span-5 125 box-shadow">
                    <PostDraftLeagueTable
                        leagueData={leagueData}
                        leagueTeams={leagueTeams}
                        driversInTeam={driversInTeam}
                    />
                    <ActiveLeagueInfo
                        isPracticeLeague={isPracticeLeague}
                        undraftedDrivers={undraftedDrivers}
                        handleDeleteTestTeams={handleDeleteTestTeams}
                    />
                </div>
                <div className="col-start-4 col-span-6">
                    <DriverTable
                        isDraftInProgress={isDraftInProgress}
                        isUsersTurnToPick={isUsersTurnToPick}
                        selectedDriver={selectedDriver}
                        undraftedDrivers={undraftedDrivers}
                        handleDriverSelection={handleDriverSelection}
                    />
                </div>
            </>
        );
    }

    return (
        <>
            <Layout>
                <div className="grid grid-cols-12 gap-2">
                    {isLeagueActive ?
                        <PostDraftDashboard/>
                        :
                        <PreDraftDashboard/>}
                </div>
            </Layout>
        </>
    )
}

//     return (
//         <>
//             <Layout>
//                 <div className="grid grid-cols-5 gap-2">
//                     <div className="col-start-2 col-span-1">
//                         <DashTop
//                             userData={userData}
//                             leagueData={leagueData}
//                             leagueSize={leagueSize}
//                             isPracticeLeague={isPracticeLeague}
//                             isLeagueFull={isLeagueFull}
//                             isLeagueActive={isLeagueActive}
//                             initialValues={initialValues}
//                             validationSchema={validationSchema}
//                             loading={loading}
//                             message={message}
//                             driversInTeam={driversInTeam}
//                             handleCreateTeam={handleCreateTeam}
//                             handleDeleteUserTeam={handleDeleteUserTeam}
//                         />
//                     </div>
//                     <div id="practice-draft-options" className="col-start-3 col-span-2">
//                         {!isLeagueActive ?
//                             <>
//                                 {showDraftPickTips ?
//                                     <DraftPickTips
//                                         isPracticeLeague={isPracticeLeague}
//                                         showDraftPickTips={showDraftPickTips}
//                                         togglePracticeOptions={togglePracticeOptions}
//                                     />
//                                     :
//                                     <>
//                                         <div className={"box-shadow"}>
//                                             <div className={"toggle-span"}>
//                                                 Draft Controls
//                                                 <PracticeOptionsToggle
//                                                     isPracticeLeague={isPracticeLeague}
//                                                     showDraftPickTips={showDraftPickTips}
//                                                     togglePracticeOptions={togglePracticeOptions}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <DraftControls
//                                             userData={userData}
//                                             leagueData={leagueData}
//                                             isPracticeLeague={isPracticeLeague}
//                                             isLeagueFull={isLeagueFull}
//                                             showDraftPickTips={showDraftPickTips}
//                                             selectedDriver={selectedDriver}
//                                             lastPickTime={lastPickTime}
//                                             isLeagueActive={isLeagueActive}
//                                             currentPickNumber={currentPickNumber}
//                                             isUsersTurnToPick={isUsersTurnToPick}
//                                             nextUserToPick={nextUserToPick}
//                                             togglePracticeOptions={togglePracticeOptions}
//                                             togglePracticeLeague={togglePracticeLeague}
//                                             addTestTeam={addTestTeam}
//                                             handlePick={handlePick}
//                                         />
//                                     </>
//                                 }
//                             </>
//                             :
//                             <></>
//                         }
//                     </div>
//                     {/*<div className="col-start-2 col-span-3">*/}
//                     {/*    <DraftControls*/}
//                     {/*        currentUser={userData}*/}
//                     {/*        leagueData={leagueData}*/}
//                     {/*        isPracticeLeague={isPracticeLeague}*/}
//                     {/*        isLeagueFull={isLeagueFull}*/}
//                     {/*        showDraftPickTips={showDraftPickTips}*/}
//                     {/*        isDraftInProgress={isDraftInProgress}*/}
//                     {/*        selectedDriver={selectedDriver}*/}
//                     {/*        lastDriverPicked={lastDriverPicked}*/}
//                     {/*        lastPickTime={lastPickTime}*/}
//                     {/*        isLeagueActive={isLeagueActive}*/}
//                     {/*        currentPickNumber={currentPickNumber}*/}
//                     {/*        isUsersTurnToPick={isUsersTurnToPick}*/}
//                     {/*        nextUserToPick={nextUserToPick}*/}
//                     {/*        togglePracticeOptions={togglePracticeOptions}*/}
//                     {/*        togglePracticeLeague={togglePracticeLeague}*/}
//                     {/*        addTestTeam={addTestTeam}*/}
//                     {/*        handlePick={handlePick}*/}
//                     {/*    />*/}
//                     {/*</div>*/}
//                     {isLeagueActive ?
//                         <>
//                             <div className="col-start-2 col-span-2">
//                                 <LeagueTable
//                                     currentLeague={leagueData}
//                                     leagueSize={leagueSize}
//                                     leagueTeams={leagueTeams}
//                                     isDraftInProgress={isDraftInProgress}
//                                     nextUserToPick={nextUserToPick}
//                                     isLeagueActive={isLeagueActive}
//                                 />
//                             </div>
//                             <div className="col-start-4 col-span-1">
//                                 <ActiveLeagueInfo
//                                     isPracticeLeague={isPracticeLeague}
//                                     undraftedDrivers={undraftedDrivers}
//                                     handleDeleteTestTeams={handleDeleteTestTeams}
//                                 />
//                             </div>
//                             <div className="col-start-2 col-span-3">
//                                 <DriverTable
//                                     isDraftInProgress={isDraftInProgress}
//                                     isUsersTurnToPick={isUsersTurnToPick}
//                                     selectedDriver={selectedDriver}
//                                     undraftedDrivers={undraftedDrivers}
//                                     handleDriverSelection={handleDriverSelection}
//                                 />
//                             </div>
//                         </>
//                         :
//                         <>
//                             <div className="col-start-2 col-span-1">
//                                 <LeagueTable
//                                     currentLeague={leagueData}
//                                     leagueSize={leagueSize}
//                                     leagueTeams={leagueTeams}
//                                     isDraftInProgress={isDraftInProgress}
//                                     nextUserToPick={nextUserToPick}
//                                     isLeagueActive={isLeagueActive}
//                                 />
//
//                             </div>
//                             <div className="col-start-3 col-span-2">
//                                 <DriverTable
//                                     isDraftInProgress={isDraftInProgress}
//                                     isUsersTurnToPick={isUsersTurnToPick}
//                                     selectedDriver={selectedDriver}
//                                     undraftedDrivers={undraftedDrivers}
//                                     handleDriverSelection={handleDriverSelection}
//                                 />
//                             </div>
//                         </>
//                     }
//                 </div>
//             </Layout>
//         </>
//     );
// }


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