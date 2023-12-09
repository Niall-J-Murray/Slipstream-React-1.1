import TeamDeleteControls from "./TeamDeleteControls";
import IDriver from "../../../types/driver.type.ts";

interface ActiveLeagueInfoProps {
    undraftedDrivers: Array<IDriver> | undefined | null,
    isPracticeLeague: boolean | undefined | null
    handleDeleteTestTeams: (e: { preventDefault: () => void }) => void,
}

export default function ActiveLeagueInfo({undraftedDrivers, isPracticeLeague, handleDeleteTestTeams}: ActiveLeagueInfoProps) {
    return (
        <div>
            {isPracticeLeague ?
                <div className="col-start-3 col-span-2 box-shadow">
                    <TeamDeleteControls handleDeleteTestTeams={handleDeleteTestTeams}/>
                </div>
                :
                <div className="col-start-3 col-span-2">
                    <table className="undrafted-drivers-table">
                        <caption>
                            <h3>Drivers from Deleted Teams</h3>
                        </caption>
                        <thead>
                        <tr>
                            <th>Driver</th>
                            <th>Pts</th>
                            <th>-</th>
                            <th>Driver</th>
                            <th>Pts</th>
                            <th>-</th>
                            <th>Driver</th>
                            <th>Pts</th>
                        </tr>
                        </thead>
                        <tbody>
                        {undraftedDrivers?.map((driver: IDriver) => {
                            return (
                                <tr key={driver.driverId}>
                                    <td>{driver.shortName}</td>
                                    <td>{driver.points}</td>
                                    <td></td>
                                    <td>{driver.shortName}</td>
                                    <td>{driver.points}</td>
                                    <td></td>
                                    <td>{driver.shortName}</td>
                                    <td>{driver.points}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}
