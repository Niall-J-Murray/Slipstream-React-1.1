import DriverDraftTable from "./DriverDraftTable";
import DriverStandingsTable from "./DriverStandingsTable";


export default function Table2({
                                   currentUser,
                                   isLeagueFull,
                                   isLeagueActive,
                                   isDraftInProgress,
                                   undraftedDrivers,
                                   handleDriverSelection,
                                   currentPickName
                               }) {

    function DriverTable() {
        if (isDraftInProgress) {
            return <DriverDraftTable
                currentUser={currentUser}
                undraftedDrivers={undraftedDrivers}
                handleDriverSelection={handleDriverSelection}
                currentPickName={currentPickName}/>;
        }
        return <DriverStandingsTable/>;
    }

    return (
        <DriverTable/>
    );
}