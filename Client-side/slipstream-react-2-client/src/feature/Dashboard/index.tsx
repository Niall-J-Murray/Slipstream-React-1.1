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
import PracticeDraftOptions from "./PracticeDraftOptions";
import {createTestTeam} from "../../services/team.service.ts";


// interface DashboardParams {
//     user: {
//         authorities: Set<{ Authority: Object }>,
//         email: String,
//         emailsReceived: Number,
//         isTestUser: Boolean,
//         lastLogout: String,
//         password: String,
//         team: {
//             teamId: Number,
//             league: Object,
//             user: { user: Object },
//             firstPickNumber: Number,
//             secondPickNumber: Number,
//             teamName: String,
//             isTestTeam: Boolean,
//             startingPoints: Number,
//             teamPoints: Number,
//             ranking: Number
//             drivers: [object]
//         },
//         userId: Number,
//         username: String
//     };
//     users: [{ user:object }];
// }

export default function Dashboard() {
    const [currentUser, setCurrentUser]
        = useState<IUser | undefined>();
    const [userData, setUserData]
        = useState<IUser | undefined>();
    const [team, setTeam]
        = useState<ITeam | undefined>();
    const [currentLeague, setCurrentLeague]
        = useState<ILeague | undefined>();
    const [leagueTeams, setLeagueTeams]
        = useState<Array<ITeam> | undefined>([]);
    const [openLeague, setOpenLeague]
        = useState<ILeague | undefined>();
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
    const [currentPickNumber, setCurrentPickNumber]
        = useState<number>(0)

    useEffect(() => {
        const user = getCurrentUser();
        setCurrentUser(user);
        const fetchUserData = async () => {
            if (user != null) {
                const userData = await getUserData(user.id);
                setUserData(userData);
                setTeam(userData.team)

                getOpenLeague()
                    .then(function (response) {
                        setOpenLeague(response);
                    })
                if (userData.team.id) {
                    const leagueData = await getTeamLeague(userData.team.id);
                    setCurrentLeague(leagueData);
                    setIsPracticeLeague(leagueData.isPracticeLeague)
                    await getAllLeagueTeams(leagueData.leagueId)
                        .then(function (response) {
                            setLeagueTeams(response)
                        })
                    getIsLeagueActive(leagueData.leagueId)
                        .then(function (response) {
                            setIsLeagueActive(response);
                        })
                    setIsLeagueFull((leagueData.teams.length) >= 10)
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
                } else {
                    await getOpenLeague().then(function (response) {
                        setOpenLeague(response);
                        setCurrentLeague(response);
                        getAllLeagueTeams(response.leagueId)
                            .then(function (response) {
                                setLeagueTeams(response)
                            })
                        getIsLeagueActive(response.leagueId)
                            .then(function (response) {
                                setIsLeagueActive(response);
                            })
                    })
                }
            }
        }
        fetchUserData().catch(console.error);
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
                    console.log("togglePracticeLeague:")
                    console.log(response)
                    setIsPracticeLeague(response);
                })
        } else {
            postToggleTestLeague(currentLeague?.leagueId)
                .then(function (response) {
                    console.log("togglePracticeLeague:")
                    console.log(response)
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

    function checkPickNumber(pickNumber) {
        return pickNumber == currentPickNumber;
    }

    const findNextToPick = () => {
        // leagueTeams?.find(team?.firstPickNumber == currentPickNumber)
       return  leagueTeams?.find(checkPickNumber)?.teamName
    }

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
                            isPracticeLeague={isPracticeLeague}
                            isLeagueFull={isLeagueFull}
                            isDraftInProgress={isDraftInProgress}
                            currentPickNumber={currentPickNumber}
                            findNextToPick={findNextToPick}
                        />
                        <Reminders/>
                        <PracticeDraftOptions
                            currentLeague={currentLeague}
                            isPracticeLeague={isPracticeLeague}
                            isLeagueFull={isLeagueFull}
                            showPracticeOptions={showPracticeOptions}
                            togglePracticeOptions={togglePracticeOptions}
                            togglePracticeLeague={togglePracticeLeague}
                            addTestTeam={addTestTeam}
                        />

                        <Table1
                            isLeagueActive={isLeagueActive}
                            currentLeague={currentLeague}
                            leagueTeams={leagueTeams}
                        />
                        <Table2
                            isLeagueFull={isLeagueFull}
                            isLeagueActive={isLeagueActive}
                            isDraftInProgress={isDraftInProgress}
                        />
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}