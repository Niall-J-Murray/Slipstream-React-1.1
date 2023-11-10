import DriverDraftTable from "./DriverDraftTable";
import DriverStandingsTable from "./DriverStandingsTable";


export default function Table2({
                                   currentUser,
                                   isLeagueFull,
                                   isLeagueActive,
                                   isDraftInProgress,
                                   undraftedDrivers,
                                   handleDriverSelection,
                                   currentPickName,
                                   handlePick
                               }) {

    function DriverTable() {
        if (isDraftInProgress) {
            return <DriverDraftTable
                currentUser={currentUser}
                undraftedDrivers={undraftedDrivers}
                handleDriverSelection={handleDriverSelection}
                currentPickName={currentPickName}
                handlePick={handlePick}/>;
        }
        return <DriverStandingsTable/>;
    }

    return (
        <DriverTable/>
    );
}