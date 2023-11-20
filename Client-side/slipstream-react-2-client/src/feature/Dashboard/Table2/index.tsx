import DriverDraftTable from "./DriverDraftTable";
import DriverStandingsTable from "./DriverStandingsTable";


export default function Table2({
                                   currentUser,
                                   isLeagueFull,
                                   isLeagueActive,
                                   isDraftInProgress,
                                   undraftedDrivers,
                                   handleDriverSelection,
                                   isUsersTurnToPick,
                                   nextUserToPick,
                                   handlePick
                               }) {

    function DriverTable() {
        if (isDraftInProgress) {
            return <DriverDraftTable
                currentUser={currentUser}
                undraftedDrivers={undraftedDrivers}
                handleDriverSelection={handleDriverSelection}
                isUsersTurnToPick={isUsersTurnToPick}
                nextUserToPick={nextUserToPick}
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