import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import DashTop from "./DashTop";
import Reminders from "./Reminders";
import PracticeDraft from "./PracticeDraft";
import Table1 from "./Table1";
import Table2 from "./Table2";
import {useEffect, useState} from "react";
import {getIsLeagueActive, getOpenLeague, getTeamLeague, postToggleTestLeague} from "../../services/league.service.ts";
import {getCurrentUser} from "../../services/auth.service.ts";
import {getUserData} from "../../services/user.service.ts";
import IUser from "../../types/user.type.ts";
import ITeam from "../../types/team.type.ts";
import ILeague from "../../types/league.type.ts";


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

    useEffect(() => {
        const user = getCurrentUser();
        setCurrentUser(user);
        const fetchUserData = async () => {
            if (user != null) {
                const userData = await getUserData(user.id);
                setUserData(userData);
                setTeam(userData.team)

                getOpenLeague().then(function (response) {
                    setOpenLeague(response);
                })
                if (userData.team.id) {
                    const leagueData = await getTeamLeague(userData.team.id);
                    setCurrentLeague(leagueData);
                    console.log("league size:")
                    console.log(leagueData.teams.length)
                    setIsLeagueFull((leagueData.teams.length) >= 10)
                    getIsLeagueActive(leagueData.leagueId).then(function (response) {
                        setIsLeagueActive(response);
                    })
                }
            }
        }
        fetchUserData().catch(console.error);
    }, []);

    function TogglePracticeOptions() {
        if (showPracticeOptions) {
            setShowPracticeOptions(false);
        } else {
            setShowPracticeOptions(true);
        }
    }

    function PracticeOptionsToggle() {
        return <>
            <div className="form-check form-switch">
                <input className="form-check-input"
                       id="testBoxToggleOff" onChange={TogglePracticeOptions} role="switch"
                       type="checkbox" checked={showPracticeOptions}/>
                <label className="form-check-label" htmlFor="testBoxToggleOff">Show/Hide
                    Practice Options</label>
            </div>
        </>
    }

    function TogglePracticeLeague() {
        if (isPracticeLeague) {
            postToggleTestLeague(currentLeague?.leagueId)
                .then(function (response) {
                    console.log("TogglePracticeLeague:")
                    console.log(response)
                    setIsPracticeLeague(response);
                })
            // setIsPracticeLeague(false);
        } else {
            postToggleTestLeague(currentLeague?.leagueId)
                .then(function (response) {
                    console.log("TogglePracticeLeague:")
                    console.log(response)
                    setIsPracticeLeague(response);
                })
            // setIsPracticeLeague(true);
        }
    }

    // Todo
    //  Display correct info and options in dash-top depending on users team/league status.
    //  Start with toggling practice options switch and toggle practice mode functionality.
    //  Make toggle checkbox match current state on initial load.

    return (
        <>
            <View>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <DashTop currentUser={currentUser} isPracticeLeague={isPracticeLeague}
                                 TogglePracticeOptions={TogglePracticeOptions}/>
                        <Reminders/>
                        <div className="col-start-2 col-span-3 box-shadow">
                            {
                                showPracticeOptions ?
                                    <div>
                                        <PracticeOptionsToggle/>
                                        <PracticeDraft isPracticeLeague={isPracticeLeague}
                                                       TogglePracticeLeague={TogglePracticeLeague}/>
                                    </div>
                                    : <PracticeOptionsToggle/>
                            }
                        </div>
                        {/*<TogglePracticeOptions valueOf={showPracticeOptions}/>*/}
                        {/*<PracticeDraft/>*/}
                        {/*<JoyTable1/>*/}
                        {/*<JoyTable2/>*/}
                        <Table1/>
                        <Table2/>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}