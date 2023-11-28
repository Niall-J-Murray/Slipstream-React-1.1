import IDriver from "../../../../types/driver.type.ts";
import {useUndraftedDrivers} from "../../../../hooks/queries/driver-queries.ts";

export default function DriverDraftTable({leagueId, isUsersTurnToPick, handleDriverSelection, handlePick,}) {
    const undraftedDrivers = useUndraftedDrivers(leagueId).data;

    return (
        <>
            <div className="col-start-3 col-span-2">
                <table className="drivers-table">
                    <caption>
                        <h3>Undrafted Drivers -<small>({undraftedDrivers?.length}/20 remaining)</small></h3>
                    </caption>
                    <thead>
                    <tr>
                        {(isUsersTurnToPick) ?
                            <th>Pick</th>
                            :
                            <th>
                                Car#
                            </th>
                        }
                        <th>Driver</th>
                        <th>Pos</th>
                        <th>Pts</th>
                        <th>Nationality</th>
                        <th>Constructor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {undraftedDrivers?.map((driver: IDriver) => {
                        return (
                            <tr key={driver.driverId}>
                                {(isUsersTurnToPick) ?
                                    <td>
                                        <form id="driver-pick-form"
                                              onSubmit={(e) =>
                                                  handlePick(e, driver.driverId)}>
                                            <input
                                                id={"driver-radio"}
                                                // className={"driver-radio"}
                                                type="radio"
                                                name="driverId"
                                                value={driver?.driverId}
                                                onClick={() => {
                                                    handleDriverSelection(driver.driverId)
                                                }}
                                            />
                                        </form>
                                    </td>
                                    :
                                    <td>
                                        {driver.carNumber}
                                    </td>
                                }
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
                <div>
                    <h6>
                        * Driver Changes:
                        <br/>Ricciardo replaced de Vries on July 11th 2023.
                        <br/>Lawson replaced Ricciardo on August 27th 2023.
                        <br/>Ricciardo replaced Lawson on October 20th 2023.
                    </h6>
                </div>
            </div>
        </>
    )
        ;
}

