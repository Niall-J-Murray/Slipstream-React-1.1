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
            <div className="col-start-3 col-span-2">
                <table className="drivers-table">
                    <caption><h3>F1 Drivers Championship</h3></caption>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Points</th>
                        {/*<th className={"username"}>Driver</th>*/}
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
                <h6 className="font-size: small; margin-left: 1em">
                    *Note: Ricciardo replaced de Vries on July 11th 2023
                </h6>
            </div>
        </>
    );
}


