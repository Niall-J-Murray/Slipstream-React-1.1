import * as Yup from "yup";
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {createTeam} from "../../../services/team.service.ts";

export default function DashTop({
                                    currentUser,
                                    userData,
                                    team,
                                    openLeague,
                                    currentLeague,
                                    leagueTeams,
                                    isPracticeLeague,
                                    isLeagueFull,
                                    isDraftInProgress,
                                    currentPickNumber,
                                    currentPickName
                                }) {
    const navigate: NavigateFunction = useNavigate();

    const [loading, setLoading]
        = useState<boolean>(false);
    const [message, setMessage]
        = useState<string>("");


    // useEffect(() => {
    //     setLeagueSize(currentLeague?.teams.length);
    // }, [currentLeague]);


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
    // const isAdmin = "isAdmin";
    // const hasTeam = "hasTeam";
    const teamName = team?.teamName
    const firstPickNumber = team?.firstPickNumber
    const secondPickNumber = team?.secondPickNumber
    // const leagueFull = "leagueFull"
    // const timeToPick = "timeToPick";
    // const leagueActive = "leagueActive";

    function CreateTeam() {
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
                            <button type="submit" className="btn btn-proceed" disabled={loading}>
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
                <h4>This is a practice league -
                    <br/> {">"} You may make picks for your team and test teams.
                    <br/> {">"} Test teams will be removed automatically 24hrs after practice draft
                    is finished.
                </h4>
            </div>;
        }
    }

    function PickInstructions() {
        if (isDraftInProgress) {
            if (firstPickNumber == currentPickNumber || secondPickNumber == currentPickNumber) {
                return <>
                    <h4 className={"text-#2ea44f; text-decoration-line: underline"}>
                        Current pick number: {currentPickNumber}
                    </h4>
                    <h4 className="color: #2ea44f; text-decoration-line: underline">
                        It's your turn to pick {currentUser.username}!
                    </h4>
                </>
            }
            return <>
                <p>
                    Draft in progress, please wait for your turn to pick.
                </p>
                <h4 className={"color: #2ea44f; text-decoration-line: underline"}>
                    Current pick number: {currentPickNumber}
                </h4>
                <h4 className="color: #2ea44f; text-decoration-line: underline">
                    It's {currentPickName}'s turn to select a driver.
                </h4>
            </>
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
                    <h3>League is {leagueTeams?.length} of 10 teams full.</h3>
                    <PracticeGreeting/>
                    <hr/>
                    <PickInstructions/>
                </div>
            }
            return <div>
                <h2>{currentUser?.username}'s Dashboard </h2>
                <hr/>
                <p>Your team: "{teamName}"</p>
                <p>Random 1st pick draft number: {firstPickNumber}</p>
                <p>Random 2nd pick draft number: {secondPickNumber}</p>
                <hr/>
                <h3>League is {leagueTeams?.length} of 10 teams full.</h3>
                <h3> The draft picks will start when the league is full...</h3>
                <PracticeGreeting/>
                <hr/>
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
