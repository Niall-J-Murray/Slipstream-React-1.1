import DriverDraftTable from "./DriverDraftTable";
import DriverStandingsTable from "./DriverStandingsTable";


export default function Table2({
                                   // currentUser,
                                   // undraftedDrivers,
                                   // nextUserToPick,
                                   isUsersTurnToPick,
                                   leagueId,
                                   isDraftInProgress,
                                   handleDriverSelection,
                                   handlePick,
                               }) {
    // currentUser={currentUser}
    // undraftedDrivers={undraftedDrivers}
    // isUsersTurnToPick={isUsersTurnToPick}
    // nextUserToPick={nextUserToPick}
    function DriverTable() {
        if (isDraftInProgress) {
            return <DriverDraftTable
                leagueId={leagueId}
                handleDriverSelection={handleDriverSelection}
                handlePick={handlePick}
                isUsersTurnToPick={isUsersTurnToPick}
                // currentUser={currentUser}
                // undraftedDrivers={undraftedDrivers}

                // nextUserToPick={nextUserToPick}
            />;
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