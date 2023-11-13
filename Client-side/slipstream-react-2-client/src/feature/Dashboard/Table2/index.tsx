import DriverDraftTable from "./DriverDraftTable";
import DriverStandingsTable from "./DriverStandingsTable";


export default function Table2({
                                   currentUser,
                                   isLeagueFull,
                                   isLeagueActive,
                                   isDraftInProgress,
                                   undraftedDrivers,
                                   handleDriverSelection,
                                   currentPick,
                                   handlePick
                               }) {

    function DriverTable() {
        if (isDraftInProgress) {
            return <DriverDraftTable
                currentUser={currentUser}
                undraftedDrivers={undraftedDrivers}
                handleDriverSelection={handleDriverSelection}
                currentPick={currentPick}
                handlePick={handlePick}/>;
        }
        // if (isLeagueActive) {
        //     return <div className="col-start-2 col-span-3">
        //         <DriverStandingsTable/>
        //     </div>
        // }
        return <div className="col-start-3 col-span-2">
            <DriverStandingsTable/>
        </div>

    }

    return (
        <DriverTable/>
    );
}