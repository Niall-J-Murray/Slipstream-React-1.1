import TeamDeleteControls from "./TeamDeleteControls";
import IDriver from "../../../types/driver.type.ts";
import {Fragment} from "react";

interface ActiveLeagueInfoProps {
    undraftedDrivers: Array<IDriver> | undefined | null,
    isPracticeLeague: boolean | undefined | null
    handleDeleteTestTeams: (e: { preventDefault: () => void }) => void,
}

export default function ActiveLeagueInfo({
                                             undraftedDrivers,
                                             isPracticeLeague,
                                             handleDeleteTestTeams
                                         }: ActiveLeagueInfoProps) {
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
                            <th>Points</th>
                            <th>Driver</th>
                            <th>Points</th>
                        </tr>
                        </thead>
                        <tbody>
                        {undraftedDrivers?.map((driver: IDriver, i: number) => {
                            return (
                                <Fragment key={driver.driverId}>
                                    {i % 2 == 0 ?
                                        <tr>
                                            <td  className={"pl-2"}>{undraftedDrivers[i]?.surname}</td>
                                            <td>{undraftedDrivers[i]?.points}</td>
                                            <td>{undraftedDrivers[i + 1]?.surname}</td>
                                            <td className={"pl-2"}>{undraftedDrivers[i + 1]?.points}</td>
                                        </tr>
                                        :
                                        <></>
                                    }
                                </Fragment>)
                        })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}
