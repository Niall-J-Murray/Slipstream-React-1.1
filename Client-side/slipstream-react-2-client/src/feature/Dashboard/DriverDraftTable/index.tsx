import {useEffect, useState} from "react";
import IUser from "../../../types/user.type.ts";
import ITeam from "../../../types/team.type.ts";
import ILeague from "../../../types/league.type.ts";
import IDriver from "../../../types/driver.type.ts";
import {getCurrentUser} from "../../../services/auth.service.ts";
import {getUserData} from "../../../services/user.service.ts";
import {getAllLeagueTeams, getTeamLeague} from "../../../services/league.service.ts";
import {getAllDrivers} from "../../../services/driver.service.ts";

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

    useEffect(() => {
        let user = getCurrentUser();
        setCurrentUser(user);
        const fetchUserData = async () => {
            if (user != null) {
                let userData = await getUserData(user.id);
                setUserData(userData);
                setTeam(userData.team)

                let leagueData = await getTeamLeague(userData.team.id);
                setCurrentLeague(leagueData);
                await getAllLeagueTeams(leagueData.leagueId).then(function (response) {
                    setLeagueTeams(response)
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

    return (
        <>
            <div className="col-start-3 col-span-2">
                <div id="pick-form">
                    <form action="" method="POST">
                        <table className="drivers-table">
                            <caption><h3>Undrafted Drivers -
                                <small>(/20 remaining)</small></h3>
                                <h5 className="error-message">
                                    Please select a driver, then click "Confirm Pick" button
                                </h5>
                            </caption>
                            <thead>
                            <tr>
                                {/*<th className="wid 6em" id="confirm-pick-dis">*/}
                                {/*    <button className="btn btn-success" disabled id="pick-button-dis">*/}
                                {/*        confirm-pick-dis*/}
                                {/*    </button>*/}
                                {/*</th>*/}
                                {/*<th className="wid 6em" id="confirm-pick" if="${leagueFull and timeToPick}">*/}
                                {/*    <button className="btn btn-success" id="pick-button" type="submit">*/}
                                {/*        <u>Confirm</u> Pick*/}
                                {/*    </button>*/}
                                {/*</th>*/}
                                <th id="confirm-test-pick">
                                    <button className="btn btn-success" id="test-pick-button" type="submit">
                                        Confirm<br/>Pick
                                    </button>
                                </th>
                                <th>Driver</th>
                                <th>Pos</th>
                                <th>Pts</th>
                                <th>Nationality</th>
                                <th>Constructor</th>
                            </tr>
                            </thead>
                            <tbody>
                            {driverStandings?.map(driver => {
                                return (
                                    <tr key={driver.driverId}>
                                        <td><input
                                            className="form-check-input" id="driver-pick" name="driver-pick"
                                            // field="*{driverId}"
                                            value="${driverInfo.driverId}"
                                            type="radio"/></td>
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
                    </form>
                </div>
            </div>
        </>
    );
}


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
