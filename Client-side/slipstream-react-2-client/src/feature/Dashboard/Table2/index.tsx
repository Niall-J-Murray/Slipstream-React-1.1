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
        return <DriverStandingsTable/>;
    }

    return (
        <DriverTable/>
    );
}