import IDriver from "../../../../types/driver.type.ts";
import {useDriverStandings} from "../../../../hooks/queries/driver-queries.ts";

export default function DriverStandingsTable() {
    // const [driverStandings, setDriverStandings]
    //     = useState<Array<IDriver> | undefined>();

    const driverStandings = useDriverStandings().data;

    // useEffect(() => {
    //
    // }, []);

    return (
        <>
            <table className="drivers-table">
                <caption><h3>F1 Drivers Championship</h3></caption>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Pts</th>
                    <th>Driver</th>
                    <th>Code</th>
                    <th>Nationality</th>
                    <th>Constructor</th>
                </tr>
                </thead>
                <tbody>
                {driverStandings?.map((driver: IDriver) => {
                    return (
                        <tr key={driver.driverId}>
                            <td>{driver.standing}</td>
                            <td>{driver.points}</td>
                            <td>{driver.surname}</td>
                            <td>{driver.shortName}</td>
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


