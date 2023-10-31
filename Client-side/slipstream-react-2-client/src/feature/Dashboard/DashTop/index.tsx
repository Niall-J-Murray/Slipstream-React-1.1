import * as Yup from "yup";
import IUser from "../../../types/user.type.ts";
import ITeam from "../../../types/team.type.ts";
import ILeague from "../../../types/league.type.ts";
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {getCurrentUser} from "../../../services/auth.service.ts";
import {useEffect, useState} from "react";
import {getUserData} from "../../../services/user.service.ts";
import {getIsLeagueActive, getOpenLeague, getTeamLeague} from "../../../services/league.service.ts";
import {createTeam} from "../../../services/team.service.ts";

export default function DashTop({currentUser, isPracticeLeague, TogglePracticeOptions}) {
    // const [currentUser, setCurrentUser]
    //     = useState<IUser | undefined>();
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

    // const stateObjects = userData!.username + currentLeague?.leagueName + isLeagueActive?.toString();
    // console.log("DashTop stateObjects")
    // console.log(stateObjects)

    const navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const initialValues: {
        // userId: number | null | undefined;
        teamName: string;
    } = {
        // userId: currentUser?.id,
        teamName: "",
    };

    const validationSchema = Yup.object().shape({
        teamName: Yup.string().required("Please enter a valid team name"),
    });

    const handleCreateTeam = (formValue: { teamName: string }) => {
        const {teamName} = formValue;

        setMessage("");
        setLoading(true);

        createTeam(currentUser?.id, teamName).then(
            () => {
                navigate("/dashboard");
                window.location.reload();
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
        );
    };


    useEffect(() => {
        const user = getCurrentUser();
        // setCurrentUser(user);
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


    const isAdmin = "isAdmin";

    const hasTeam = "hasTeam";

    const teamName = team?.teamName
    const firstPickNumber = team?.firstPickNumber
    const secondPickNumber = team?.secondPickNumber

    const leagueFull = "leagueFull"
    const timeToPick = "timeToPick";

    const leagueActive = "leagueActive";

    function CreateTeam() {
        console.log(openLeague?.leagueName)
        return (
            <>
                <div>
                    <p>{openLeague?.leagueName} is open to join.</p>
                    <p>Once the league is full, the draft can begin.</p>
                    <p>You must create a team to try a practice draft.</p>
                    <p>Choose a team name to get started...</p>
                    <hr/>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleCreateTeam}
                >
                    <Form className={"col-start-1 col-span-3"}>
                        <div className="form-group">
                            <label htmlFor="teamName">Enter your team name:</label>
                            <Field name="teamName" type="text" className="form-control" required/>
                            <ErrorMessage
                                name="teamName"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Create Team</span>
                            </button>
                        </div>
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </>
        )
    }

    function AdminGreeting() {
        return <div>
            <h2>{currentUser?.username}'s Dashboard </h2>
            <hr/>
            <h3>Sorry, admins cannot play!</h3>
            <h3><a href="/admin">Go to admin dashboard</a></h3>
            <h3>- or -</h3>
            <h3><a href="/register">Register for a user account</a></h3>
        </div>;
    }

    function PracticeGreeting() {
        if (isPracticeLeague) {
            return <div>
                <h3>This is a practice league - <br/>Test teams will be removed automatically 24hrs after practice draft
                    is finished.</h3>
            </div>;
        }
    }


    function UserGreeting() {
        if (team != null) {
            if (isLeagueFull) {
                return <div>
                    <h2>{currentUser?.username}'s Dashboard </h2>
                    <hr/>
                    <p>Your team: "{teamName}"</p>
                    <p>Random 1st pick draft number: {firstPickNumber}</p>
                    <p>Random 2nd pick draft number: {secondPickNumber}</p>
                    <hr/>
                    <h3>League is {currentLeague?.teams?.length} of 10 teams full.</h3>
                    <PracticeGreeting/>
                    <hr/>
                    {/*<PracticeOptionsToggle/>*/}
                </div>;
            }
            return <div>
                <h2>{currentUser?.username}'s Dashboard </h2>
                <hr/>
                <p>Your team: "{teamName}"</p>
                <p>Random 1st pick draft number: {firstPickNumber}</p>
                <p>Random 2nd pick draft number: {secondPickNumber}</p>
                <hr/>
                <h3>League is {currentLeague?.teams?.length} of 10 teams full.</h3>
                <h3> The draft picks will start when the league is full...</h3>
                <PracticeGreeting/>
                <hr/>
                {/*<PracticeOptionsToggle/>*/}
            </div>;
        }
        return <div>
            <h2>{currentUser?.username}'s Dashboard </h2>
            <hr/>
            <CreateTeam/>
        </div>;
    }

    function Greeting() {
        if (currentUser?.roles?.includes("ROLE_ADMIN")) {
            return <AdminGreeting/>;
        }
        return <UserGreeting/>;
    }

    return (
        <>
            <div className="col-start-2 col-span-1 box-shadow">
                <div className="p-2">
                    <Greeting/>
                </div>
            </div>
        </>
    );
}

// return (
//     <>
//         {/*<div className="col-start-2 col-span-3 box-shadow">*/}
//         <div className="col-start-2 col-span-1 box-shadow">
//             <div className="p-5">
//                 <h2> "$|username's Dashboard|"</h2>
//                 <h2> userId:{currentUser?.id}</h2>
//                 <h2>username: {currentUser?.username}</h2>
//                 <h2>team name: {team?.teamName}</h2>
//                 <hr/>
//                 <div className="row">
//                     <div className="col-sm-5">
//                         <div>"${isAdmin} is true"
//                             <h3>"|Sorry, admin cannot play!|"</h3><br/>
//                         </div>
//                         <div>"${isAdmin} is not true"
//                             <div>"$team1 != null"
//                                 <p>Your team: "{teamName}"</p>
//                                 <p>Random 1st pick draft number (1-10): {firstPickNumber}</p>
//                                 <p>Random 2nd pick draft number (11-20): {secondPickNumber}</p>
//                                 <hr/>
//                                 <div>"${!leagueActive} and {!leagueFull}"
//                                     <h3 className="pb-3">"|League is $size of 10 teams
//                                         full.|"</h3>
//                                     <h3> The draft picks will start when the league is full...</h3>
//                                     <hr/>
//                                     <div className="form-check form-switch">"$!isTestLeague"
//                                         <input className="form-check-input"
//                                             // id="testBoxToggleOff" onClick="showhide('test-box')" role="switch"
//                                                type="checkbox"/>
//                                         <label className="form-check-label" htmlFor="testBoxToggleOff">Show/Hide
//                                             Practice Options</label>
//                                     </div>
//                                     <div className="form-check form-switch">"$isTestLeague"
//                                         <input defaultChecked className="form-check-input"
//                                             // id="testBoxToggleOn" onClick="showhide('test-box')" role="switch"
//                                                type="checkbox"/>
//                                         <label className="form-check-label" htmlFor="testBoxToggleOn">Hide/Show
//                                             Practice
//                                             Options</label>
//                                     </div>
//                                     <hr/>
//                                     <div> "$isTestLeague"
//                                         <h4>Practice draft in progress</h4>
//                                         <div className="form-check form-switch">
//                                             <input checked className="form-check-input" disabled
//                                                    id="practiceDraftActive1"
//                                                    role="switch" type="checkbox"/>
//                                             <label className="form-check-label"
//                                                    htmlFor="practiceDraftActive1">Practice
//                                                 Draft Mode On</label>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div>"${leagueFull} and {!leagueActive}"
//                                     <div> "$isTestLeague"
//                                         <div className="form-check form-switch">
//                                             <input checked className="form-check-input" disabled
//                                                    id="practiceDraftActive3"
//                                                    role="switch" type="checkbox"/>
//                                             <label className="form-check-label"
//                                                    htmlFor="practiceDraftActive3">Practice
//                                                 Draft Mode On</label>
//                                         </div>
//                                         <h5>Practice draft in progress, you may make picks for your team and
//                                             test
//                                             teams.</h5>
//                                         <hr/>
//                                     </div>
//                                     {/*<p>"${!timeToPick} and {!isTestLeague}"*/}
//                                     <p>
//                                         Draft in progress, please wait for your turn to pick.
//                                     </p>
//                                     <h4>
//                                         {/*<h4 style={"color: #2ea44f; text-decoration-line: underline"}>*/}
//                                         {/*"|Current pick number: ${currentPickNumber}|"</h4>*/}
//
//                                         {/*<h4 style="color: #2ea44f; text-decoration-line: underline">*/}
//                                         "${!timeToPick}"
//                                         {/*"|It's ${nextUserPick}'s turn to select a driver|"</h4>*/}
//
//                                         {/*<h4 style="color: #2ea44f; text-decoration-line: underline">*/}
//                                         "${timeToPick}"
//                                         "|It's your turn to pick $username!|"
//                                     </h4>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>
// );
// }
