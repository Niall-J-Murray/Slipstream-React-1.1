import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import IUser from "../../../../types/user.type.ts";
import ITeam from "../../../../types/team.type.ts";
import ILeague from "../../../../types/league.type.ts";
import IDriver from "../../../../types/driver.type.ts";
import {getCurrentUser} from "../../../../services/auth.service.ts";
import {getUserData} from "../../../../services/user.service.ts";
import {getAllLeagueTeams, getTeamLeague} from "../../../../services/league.service.ts";
import {getAllDrivers, getUndraftedDrivers, postPickDriver} from "../../../../services/driver.service.ts";
import {NavigateFunction, useNavigate} from "react-router-dom";
import * as Yup from "yup";

export default function DriverDraftTable() {
    const [currentUser, setCurrentUser]
        = useState<IUser | undefined>();
    const [userData, setUserData]
        = useState<IUser | undefined>();
    const [team, setTeam]
        = useState<ITeam | undefined>();
    const [leagueTeams, setLeagueTeams]
        = useState<Array<ITeam> | undefined>([]);
    const [currentLeague, setCurrentLeague]
        = useState<ILeague | undefined>();
    const [driverStandings, setDriverStandings]
        = useState<Array<IDriver> | undefined>([]);
    const [undraftedDrivers, setUndraftedDrivers]
        = useState<Array<IDriver> | undefined>([]);

    console.log(currentUser, userData, team, leagueTeams, currentLeague)

    useEffect(() => {
        const user = getCurrentUser();
        setCurrentUser(user);
        const fetchUserData = async () => {
            if (user != null) {
                const userData = await getUserData(user.id);
                setUserData(userData);
                setTeam(userData.team)

                const leagueData = await getTeamLeague(userData.team.id);
                setCurrentLeague(leagueData);
                await getAllLeagueTeams(leagueData.leagueId)
                    .then(function (response) {
                        setLeagueTeams(response)
                    })
                await getUndraftedDrivers(leagueData.leagueId)
                    .then(function (response) {
                        setUndraftedDrivers(response)
                    })
            }
            await getAllDrivers().then(function (response) {
                setDriverStandings(response);
            });

        }
        fetchUserData().catch(console.error);
        // console.log("DriverDraftTable:")
        // console.log(currentLeague)
        // console.log(currentUser)
        // console.log(userData)
        // console.log(team)
    }, []);

    const navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const initialValues: {
        driverId: number | null | undefined;
    } = {
        driverId: null,
    };

    // const initialValues: {
    //     userId: number | null | undefined;
    //     driverId: number | null | undefined;
    // } = {
    //     userId: currentUser?.id,
    //     driverId: null,
    // };

    // const initialValues = driverId: number;
    // const initialValues = null;

    const validationSchema = Yup.object().shape({
        userId: Yup.string().required("Invalid user ID."),
        driverId: Yup.string().required("Please select a driver.")
    });

    // const handlePick = (formValue: { driverId: number | null | undefined }) => {
    //     const {driverId} = formValue;
    //     console.log("handlePick")
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

    // Todo Display correct info and options in dash-top depending on users team/league status.
    //  Start with toggling practice options switch and toggle practice mode functionality.
    //  update table 1 component when test team/any team is created.
    //  ---
    //  Enable draft picking functionality.
    //  Debug CORS error on "postPickDriver(currentUser?.id, driverId)" call.

    const handlePick = (driverId: string) => {
        // const {driverId} = formValue;
        console.log("handlePick")
        setMessage("");
        setLoading(true);

        postPickDriver(currentUser?.id, driverId).then(
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

    return (
        <>
            <div className="col-start-3 col-span-2">
                <Formik
                    initialValues={{
                        picked: '',
                    }}
                    // onSubmit={async (values) => {
                    //     await new Promise((r) => setTimeout(r, 500));
                    //     alert(JSON.stringify(values, null, 2));
                    // }}
                    onSubmit={(values) => {
                        handlePick(values)
                    }
                    }
                >
                    {({values}) => (
                        <Form>
                            {/*<div id="my-radio-group">Picked</div>*/}
                            <div role="group" aria-labelledby="my-radio-group">
                                {/*    <label>*/}
                                {/*        <Field type="radio" name="picked" value="One"/>*/}
                                {/*        One*/}
                                {/*    </label>*/}
                                {/*    <label>*/}
                                {/*        <Field type="radio" name="picked" value="Two"/>*/}
                                {/*        Two*/}
                                {/*    </label>*/}
                                <div>Picked: {values.picked}</div>
                                {/*</div>*/}

                                {/*<button type="submit">Submit</button>*/}


                                <table className="drivers-table">
                                    <caption><h3>Undrafted Drivers -
                                        <small>({undraftedDrivers?.length}/20 remaining)</small></h3>
                                    </caption>

                                    <thead>
                                    <tr>

                                        <th id="confirm-test-pick">
                                            <button type="submit">Submit</button>
                                            {/*<div className="form-group">*/}
                                            {/*    <button name="driver-pick" className="btn btn-success" id="test-pick-button"*/}
                                            {/*            type="submit"*/}
                                            {/*            disabled={loading}>*/}
                                            {/*        {loading && (*/}
                                            {/*            <span className="spinner-border spinner-border-sm"></span>*/}
                                            {/*        )}*/}
                                            {/*        <span>Confirm<br/>Pick</span>*/}
                                            {/*    </button>*/}
                                            {/*</div>*/}

                                        </th>
                                        <th>Driver</th>
                                        <th>Pos</th>
                                        <th>Pts</th>
                                        <th>Nationality</th>
                                        <th>Constructor</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {undraftedDrivers?.map(driver => {
                                        return (
                                            <tr key={driver.driverId}>
                                                <td>
                                                    <label>
                                                        <Field type="radio" name="picked" value={driver.driverId}/>
                                                        Pick
                                                    </label>
                                                    {/*<div className="form-group">*/}
                                                    {/*    <Field name="driver-pick"*/}
                                                    {/*           type="radio"*/}
                                                    {/*           className="form-control"*/}
                                                    {/*           value={driver.driverId}/>*/}
                                                    {/*</div>*/}
                                                    {/*<input*/}
                                                    {/*className="form-check-input" id="driver-pick" name="driver-pick"*/}
                                                    {/*value={"driver.driverId"}*/}
                                                    {/*type="radio"/>Pick*/}
                                                </td>
                                                <td>{driver.surname}</td>
                                                <td>{driver.standing}</td>
                                                <td>{driver.points}</td>
                                                <td>{driver.nationality}</td>
                                                <td>{driver.constructor}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </Form>
                    )}
                </Formik>
                {/*    </form>*/}
                {/*</div>*/}
            </div>
        </>
    );
}

//     return (
//         <>
//             <div className="col-start-3 col-span-2">
//                 {/*<div id="pick-form">*/}
//                 {/*    <form action="" method="POST">*/}
//                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                     onSubmit={handlePick}
//                 >
//                     <Form>
//                         {/*<div className="form-group">*/}
//                         {/*<label htmlFor="driver-pick">driver-pick</label>*/}
//                         {/*<Field name="driver-pick" type="text" className="form-control"/>*/}
//                         {/*<ErrorMessage*/}
//                         {/*    name="driver-pick"*/}
//                         {/*    component="div"*/}
//                         {/*    className="alert alert-danger"*/}
//                         {/*/>*/}
//                         {/*</div>*/}
//
//                         {/*<div className="form-group">*/}
//                         {/*    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>*/}
//                         {/*        {loading && (*/}
//                         {/*            <span className="spinner-border spinner-border-sm"></span>*/}
//                         {/*        )}*/}
//                         {/*        <span>Login</span>*/}
//                         {/*    </button>*/}
//                         {/*</div>*/}
//
//
//                         <table className="drivers-table">
//                             <caption><h3>Undrafted Drivers -
//                                 <small>({undraftedDrivers?.length}/20 remaining)</small></h3>
//                             </caption>
//                             {message && (
//                                 <div className="form-group">
//                                     <div className="alert alert-danger" role="alert">
//                                         {message}
//                                     </div>
//                                 </div>
//                             )}
//                             <thead>
//                             <tr>
//                                 {/*<th className="wid 6em" id="confirm-pick-dis">*/}
//                                 {/*    <button className="btn btn-success" disabled id="pick-button-dis">*/}
//                                 {/*        confirm-pick-dis*/}
//                                 {/*    </button>*/}
//                                 {/*</th>*/}
//                                 {/*<th className="wid 6em" id="confirm-pick" if="${leagueFull and timeToPick}">*/}
//                                 {/*    <button className="btn btn-success" id="pick-button" type="submit">*/}
//                                 {/*        <u>Confirm</u> Pick*/}
//                                 {/*    </button>*/}
//                                 {/*</th>*/}
//                                 <th id="confirm-test-pick">
//                                     <div className="form-group">
//                                         <button name="driver-pick" className="btn btn-success" id="test-pick-button"
//                                                 type="submit"
//                                                 disabled={loading}>
//                                             {loading && (
//                                                 <span className="spinner-border spinner-border-sm"></span>
//                                             )}
//                                             <span>Confirm<br/>Pick</span>
//                                         </button>
//                                     </div>
//                                 </th>
//                                 <th>Driver</th>
//                                 <th>Pos</th>
//                                 <th>Pts</th>
//                                 <th>Nationality</th>
//                                 <th>Constructor</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {undraftedDrivers?.map(driver => {
//                                 return (
//                                     <tr key={driver.driverId}>
//                                         <td>
//                                             <div className="form-group">
//                                                 <Field name="driver-pick"
//                                                        type="radio"
//                                                        className="form-control"
//                                                        value={driver.driverId}/>
//                                             </div>
//                                             {/*<input*/}
//                                             {/*className="form-check-input" id="driver-pick" name="driver-pick"*/}
//                                             {/*value={"driver.driverId"}*/}
//                                             {/*type="radio"/>Pick*/}
//                                         </td>
//                                         <td>{driver.surname}</td>
//                                         <td>{driver.standing}</td>
//                                         <td>{driver.points}</td>
//                                         <td>{driver.nationality}</td>
//                                         <td>{driver.constructor}</td>
//                                     </tr>
//                                 )
//                             })}
//                             </tbody>
//                         </table>
//                     </Form>
//                 </Formik>
//                 {/*    </form>*/}
//                 {/*</div>*/}
//             </div>
//         </>
//     );
// }


{/*                            </div>*/
}
{/*                        </td>*/
}
{/*                        <td if="${leagueFull and timeToPick}">*/
}
{/*                            <div className="form-check">*/
}
{/*                                <label className="form-check-label" htmlFor="driver-pick"*/
}
{/*                                       field="${driverInfo.driverId}">Pick</label>*/
}
{/*                                <input className="form-check-input" id="driver-pick" name="driver-pick"*/
}
{/*                                       field="*{driverId}"*/
}
{/*                                       value="${driverInfo.driverId}"*/
}
{/*                                       type="radio"/>*/
}
{/*                            </div>*/
}
{/*                        </td>*/
}
{/*                        <td if="${leagueFull and isTestPick}">*/
}
{/*                            <div class="form-check">*/
}
{/*                                <label class="form-check-label" for="driver-test-pick"*/
}
{/*                                       field="${driverInfo.driverId}">Pick</label>*/
}
{/*                                <input class="form-check-input" id="driver-test-pick" name="driver-pick"*/
}
{/*                                       field="*{driverId}"*/
}
{/*                                       value="${driverInfo.driverId}"*/
}
{/*                                       type="radio"/>*/
}
{/*                            </div>*/
}
{/*                        </td>*/
}
{/*                        <td text="${driverInfo.surname}"></td>*/
}
{/*                        <td text="${driverInfo.standing}"></td>*/
}
{/*                        <td text="${driverInfo.points.intValue()}"></td>*/
}
{/*                        <td text="${driverInfo.nationality}"></td>*/
}
{/*                        <td text="${driverInfo.constructor}"></td>*/
}
{/*                    </tr>*/
}
{/*                </form>*/
}
{/*            </div>*/
}
{/*        </table>*/
}
{/*        <h6 style="font-size: small; margin-left: 1em">*/
}
{/*            *Note: Ricciardo replaced de Vries on July 11th 2023*/
}
{/*        </h6>*/
}
{/*    </div>*/
}
