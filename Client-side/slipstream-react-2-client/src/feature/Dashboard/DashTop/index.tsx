import {ObjectSchema} from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import IDriver from "../../../types/driver.type.ts";
import IUser from "../../../types/user.type.ts";
import ILeague from "../../../types/league.type.ts";

interface DashTopProps {
    userData: IUser | undefined,
    leagueData: ILeague | undefined,
    leagueSize: number | undefined | null,
    isPracticeLeague: boolean | undefined | null,
    isLeagueFull: boolean | undefined | null,
    isLeagueActive: boolean | undefined | null,
    initialValues: { teamName: string },
    validationSchema: ObjectSchema<object>,
    loading: boolean,
    message: string,
    driversInTeam: Array<IDriver> | undefined,
    handleCreateTeam: (formValue: { teamName: string }) => void,
    handleDeleteUserTeam: (e: { preventDefault: () => void }) => void,
}

export default function DashTop({
                                    userData,
                                    leagueData,
                                    leagueSize,
                                    isPracticeLeague,
                                    isLeagueFull,
                                    isLeagueActive,
                                    initialValues,
                                    validationSchema,
                                    loading,
                                    message,
                                    driversInTeam,
                                    handleCreateTeam,
                                    handleDeleteUserTeam,
                                }: DashTopProps) {


    const username = userData?.username;
    const teamName = userData?.team?.teamName
    const firstPickNumber = userData?.team?.firstPickNumber
    const secondPickNumber = userData?.team?.secondPickNumber
    const isAdmin = (user: IUser | undefined) => {
        let isAdmin = false;
        user?.roles?.map(role => {
                if (role.name === "ROLE_ADMIN") {
                    isAdmin = true;
                }
            }
        )
        return isAdmin;
    }

    function CreateTeam() {
        return (
            <>
                <div>
                    <p>{leagueData?.leagueName} is open to join.</p>
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
            <h2>{username}'s Dashboard </h2>
            <hr/>
            <h3>Sorry, admins cannot play!</h3>
            <h3><a href="/admin">Go to admin dashboard</a></h3>
            <h3>- or -</h3>
            <h3><a href="/register">Register for a user account</a></h3>
        </div>;
    }

    function PracticeGreeting() {
        if (isPracticeLeague && !isLeagueActive) {
            return <div>
                <h4>This is a practice league -
                    <br/> {">"} You may make picks for your team and test teams.
                    <br/> {">"} Test teams will be removed automatically 24hrs after practice draft
                    is finished.
                </h4>
            </div>;
        }
    }

    function UserGreeting() {
        if (userData?.team) {
            if (isLeagueFull || isLeagueActive) {
                return (
                    <div>
                        <h3>{username}'s Dashboard </h3>
                        <hr/>
                        <p>Your team: "{teamName}"</p>
                        <p>1st pick number: {firstPickNumber}
                            <br/>
                       2nd pick number: {secondPickNumber}</p>
                        Selected Drivers:
                        {driversInTeam?.map((driver: IDriver, i: number) => {
                            return (
                                <div key={driver.driverId}>
                                    {driver ?
                                        <>{i + 1} - {driver.surname}</>
                                        :
                                        <> {i + 1} - </>
                                    }
                                </div>
                            )
                        })}
                        <hr/>
                        {isLeagueActive ?
                            <>
                                <div>
                                    <p>Want to join a different league?</p>
                                    <button className="btn btn-proceed "
                                            type="button"
                                            onClick={(e) => handleDeleteUserTeam(e)}
                                    >
                                        Delete This Team
                                    </button>
                                </div>
                                <hr/>
                                <h3>Your league is active, points will be scored from races after:
                                    <br/>{leagueData?.activeTimestamp?.slice(0, 8)}</h3>
                            </>
                            :
                            <h3>Draft in progress...</h3>
                        }
                        {/*<PracticeGreeting/>*/}
                    </div>
                );
            }
            return (
                <div>
                    <h2>{username}'s Dashboard </h2>
                    <hr/>
                    <p>Your team: "{teamName}"</p>
                    <p>Random 1st pick draft number: {firstPickNumber}</p>
                    <p>Random 2nd pick draft number: {secondPickNumber}</p>
                    <hr/>
                    <h3>League is {leagueSize} of 10 teams full.</h3>
                    <h3> The draft picks will start when the league is full...</h3>
                    {/*<PracticeGreeting/>*/}
                    <hr/>
                </div>
            );
        }
        return (
            <div>
                <h2>{username}'s Dashboard </h2>
                <hr/>
                <CreateTeam/>
            </div>
        );
    }

    function Greeting() {
        if (isAdmin(userData)) {
            return <AdminGreeting/>;
        }
        return <UserGreeting/>;
    }

    return (
        <>
            <div className="box-shadow">
                <Greeting/>
            </div>
        </>
    );
}
