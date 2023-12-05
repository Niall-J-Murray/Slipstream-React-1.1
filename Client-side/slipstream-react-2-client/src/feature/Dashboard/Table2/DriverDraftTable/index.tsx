import IDriver from "../../../../types/driver.type.ts";
import {useUndraftedDrivers} from "../../../../hooks/queries/driver-queries.ts";

export default function DriverDraftTable({
                                             leagueId,
                                             undraftedDrivers,
                                             isUsersTurnToPick,
                                             handleDriverSelection,
                                             handlePick,
                                             selectedDriver,
                                         }) {
    // const undraftedDrivers = useUndraftedDrivers(leagueId).data;

    return (
        <>
            <div className="col-start-3 col-span-2">
                <table className="drivers-table" id={"my-table"}>
                    <caption>
                        <h3>Undrafted Drivers -<small>({undraftedDrivers?.length}/20 remaining)</small></h3>
                    </caption>
                    <thead>
                    <tr>
                        {(isUsersTurnToPick) ?
                            <th>Pick</th>
                            :
                            <th>Car#</th>
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
                                {(!isUsersTurnToPick) ?
                                    <>
                                        <td>{driver.carNumber}</td>
                                        <td>{driver.surname}</td>
                                        <td>{driver.standing}</td>
                                        <td>{driver.points}</td>
                                        <td>{driver.nationality}</td>
                                        <td>{driver.constructor}</td>
                                    </> :
                                    <>
                                        {selectedDriver?.driverId == driver.driverId ?
                                            <>
                                                <td className={"selected-cell"}>
                                                    <input
                                                        id="driver-radio"
                                                        // className={"driver-radio"}*/
                                                        type="radio"
                                                        name="driverId"
                                                        // value={driver?.driverId}
                                                        // checked={true}
                                                        defaultChecked={true}
                                                        onChange={() => {
                                                            handleDriverSelection(driver)
                                                        }}
                                                    />
                                                </td>
                                                <td className={"selected-cell"}>{driver.surname}</td>
                                                <td className={"selected-cell"}>{driver.standing}</td>
                                                <td className={"selected-cell"}>{driver.points}</td>
                                                <td className={"selected-cell"}>{driver.nationality}</td>
                                                <td className={"selected-cell"}>{driver.constructor}</td>
                                            </>
                                            :
                                            <>
                                                <td>
                                                    <input
                                                        id="driver-radio"
                                                        // className={"driver-radio"}*/
                                                        type="radio"
                                                        name="driverId"
                                                        // value={driver?.driverId}
                                                        onClick={() => {
                                                            handleDriverSelection(driver)
                                                        }}
                                                    />
                                                </td>
                                                <td>{driver.surname}</td>
                                                <td>{driver.standing}</td>
                                                <td>{driver.points}</td>
                                                <td>{driver.nationality}</td>
                                                <td>{driver.constructor}</td>
                                            </>
                                        }
                                    </>
                                }
                            </tr>
                        )
                    })}
                    {/*{undraftedDrivers?.map((driver: IDriver) => {*/}
                    {/*    const rowId = driver.driverId;*/}
                    {/*    if (rowId === selectedDriver?.driverId) {*/}
                    {/*        return (*/}
                    {/*            <tr key={rowId} id={rowId?.toString()}*/}
                    {/*                onClick={() => {*/}
                    {/*                    selectDriver(rowId)*/}
                    {/*                }*/}
                    {/*                }*/}
                    {/*                style={{backgroundColor: "blue"}}>*/}
                    {/*                <td>{driver.surname}</td>*/}
                    {/*                <td>{driver.standing}</td>*/}
                    {/*                <td>{driver.points}</td>*/}
                    {/*                <td>{driver.nationality}</td>*/}
                    {/*                <td>{driver.constructor}</td>*/}
                    {/*            </tr>*/}
                    {/*        )*/}
                    {/*    } else {*/}
                    {/*        return (*/}
                    {/*            <tr key={rowId} id={rowId?.toString()}*/}
                    {/*                onClick={() => {*/}
                    {/*                    selectDriver(rowId)*/}
                    {/*                }*/}
                    {/*                }*/}
                    {/*            >*/}
                    {/*                <td>{driver.surname}</td>*/}
                    {/*                <td>{driver.standing}</td>*/}
                    {/*                <td>{driver.points}</td>*/}
                    {/*                <td>{driver.nationality}</td>*/}
                    {/*                <td>{driver.constructor}</td>*/}
                    {/*            </tr>*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*})}*/}
                    </tbody>
                </table>
                {/*<tr key={rowId}>*/
                }
                {/*<tr key={driver.driverId}>*/
                }
                {/*{(isUsersTurnToPick) ?*/
                }
                {/*    // <td>*/
                }
                {/*    <div id={"pick-radio"}>*/
                }
                {/*        <form id="driver-pick-form"*/
                }
                {/*              onSubmit={(e) =>*/
                }
                {/*                  handlePick(e, driver.driverId)}>*/
                }
                {/*            <input*/
                }
                {/*                id={"driver-radio"}*/
                }
                {/*                // className={"driver-radio"}*/
                }
                {/*                type="radio"*/
                }
                {/*                name="driverId"*/
                }
                {/*                value={driver?.driverId}*/
                }
                {/*                onClick={() => {*/
                }
                {/*                    handleDriverSelection(driver.driverId)*/
                }
                {/*                }}*/
                }
                {/*            />*/
                }
                {/*        </form>*/
                }
                {/*    </div>*/
                }
                {/*    // </td>*/
                }
                {/*    :*/
                }
                {/*    // <td>*/
                }
                {/*    <div>*/
                }
                {/*        {driver.carNumber}*/
                }
                {/*        /!*</td>*!/*/
                }
                {/*    </div>*/
                }
                {/*}*/
                }
                {/*// <tr>*/
                }
                {/*    // <td>{driver.surname}</td>*/
                }
                {/*    // <td>{driver.standing}</td>*/
                }
                {/*    // <td>{driver.points}</td>*/
                }
                {/*    // <td>{driver.nationality}</td>*/
                }
                {/*    // <td>{driver.constructor}</td>*/
                }
                {/*    // </tr>*/
                }
                {/*// )*/
                }
                {/*// })}*/
                }

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

