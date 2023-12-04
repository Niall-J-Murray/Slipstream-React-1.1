import IDriver from "../../../../types/driver.type.ts";
import {useUndraftedDrivers} from "../../../../hooks/queries/driver-queries.ts";

export default function DriverDraftTable({
                                             leagueId,
                                             isUsersTurnToPick,
                                             handleDriverSelection,
                                             handlePick,
                                             selectedDriver,
                                         }) {
    const undraftedDrivers = useUndraftedDrivers(leagueId).data;
    // const [rowSelected, setRowSelected]
    //     = useState<HTMLTableElement | null>();
    // const [driverSelectedId, setDriverSelectedId]
    //     = useState<number | null | undefined>(null)

    // useEffect(() => {
    //
    // }, [driverSelectedId]);

    // let SelectedRow = "";

    // function highlight(rowId) {
    //     // SelectedRow = row.cells[0].textContent;
    //     // SelectedRow = document.getElementById('table-row-' + rowId);
    //     // const row: HTMLElement | null = document.getElementById('table-row-' + rowId);
    //     // SelectedRow = document.getElementById(rowId);
    //     handleDriverSelection(rowId);
    //     const row: HTMLTableElement | null = document.getElementById(rowId);
    //     row.className = "selected-row";
    //     console.log("row.className")
    //     console.log(row.className)
    //     setRowSelected(row);
    //     const row2: HTMLCollectionOf<HTMLTableElement> = document
    //         .getElementsByClassName("selected-row");
    //     // deHighlight();
    //     // row?.classList.toggle("selectedRow", false);
    //     // row?.classList.toggle("selectedRow");
    //     row2.item(0).style.backgroundColor = '#2ea44f';
    //     // row2.style.backgroundColor = '#2ea44f';
    //     // rowSelected.style.backgroundColor = '#2ea44f';
    //     // rowSelected.style.textDecorationLine = 'underline';
    // }

    // function selectDriver(rowId) {
    //     handleDriverSelection(rowId);
    //     // setDriverSelectedId(rowId)
    // }

    // function highlight() {
    //     document.querySelector("#my-table")
    //         .addEventListener("click", function (e) {
    //             if (e.target && e.target.nodeName == "TD") {
    //                 e.target.parentNode.classList.toggle("highlight");
    //             }
    //         });
    // }
    // function highlight() {
    //     const table = document.getElementById("my-table");
    //     if (table != null) {
    //         table.addEventListener("click", function (e) {
    //             if (e.target instanceof HTMLElement && e.target.nodeName == "TD") {
    //                 if (e.target.parentNode instanceof HTMLElement) {
    //                     e.target.parentNode.classList.toggle("highlight");
    //                 }
    //             }
    //         });
    //     }
    // }

    // function deHighlight() {
    //     const table = document.getElementById("my-table");
    //     const rows = table?.rows;
    //     for (let i = 0; i < rows.length; i++) {
    //         rows[i].style.backgroundColor = "";
    //     }
    // }

    // function getSelectedRow() {
    //     // alert(SelectedRow);
    //     alert(rowSelected);
    // }

    // const table = document.querySelector("#myTable")
    // if (table != null) {
    //     table.addEventListener("click", function (e) {
    //         if (e.target instanceof HTMLElement && e.target.nodeName == "TD") {
    //             if (e.target.parentNode instanceof HTMLElement) {
    //                 e.target.parentNode.classList.toggle("highlight");
    //             }
    //         }
    //     });
    // }
    // document.querySelector("#myTable").addEventListener("click", function (e) {
    //
    //     if (e.target && e.target.nodeName == "TD") {
    //         e.target.parentNode.classList.toggle("highlight");
    //     }
    //
    // });

    return (
        <>
            <div className="col-start-3 col-span-2">
                {/*<table id="myTable">*/}
                {/*    <tbody>*/}
                {/*    <tr>*/}
                {/*        <td>Row 1</td>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td>Row 2</td>*/}
                {/*    </tr>*/}
                {/*    </tbody>*/}
                {/*</table>*/}

                {/*<button onClick={() => getSelectedRow()}>Snatch Data</button>*/}
                <table className="drivers-table" id={"my-table"}>
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
                                {selectedDriver?.driverId == driver.driverId ?
                                    <>
                                        <td className={"selected-cell"}>
                                            <input
                                                id="driver-radio"
                                                // className={"driver-radio"}*/
                                                type="radio"
                                                name="driverId"
                                                // value={driver?.driverId}
                                                checked={true}
                                                onChange={() => {
                                                    handleDriverSelection(driver)
                                                }}
                                                // onClick={() => {
                                                //     handleDriverSelection(driver)
                                                // }}
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

