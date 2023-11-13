import {useEffect, useState} from "react";
import IDriver from "../../../../types/driver.type.ts";
import {getAllDrivers} from "../../../../services/driver.service.ts";

export default function DriverStandingsTable() {
    const [driverStandings, setDriverStandings]
        = useState<Array<IDriver> | undefined>([]);


    useEffect(() => {
        const getDriverStandings = async () => {
            await getAllDrivers().then(function (response) {
                setDriverStandings(response);
            });
        }
        getDriverStandings().catch(console.error);
    }, []);

    return (
        <>
            <table className="drivers-table">
                <caption><h3>F1 Drivers Championship</h3></caption>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Pts</th>
                    <th>Driver</th>
                    <th>Nationality</th>
                    <th>Constructor</th>
                </tr>
                </thead>
                <tbody>
                {driverStandings?.map(driver => {
                    return (
                        <tr key={driver.driverId}>
                            <td>{driver.standing}</td>
                            <td>{driver.points}</td>
                            <td>{driver.surname}</td>
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
        </>
    );
}

