import DriverDraftTable from "./DriverDraftTable";
import DriverDraftTable from "./DriverDraftTable";
import DriverStandingsTable from "./DriverStandingsTable";


export default function Table2({currentUser, isLeagueFull, isLeagueActive, isDraftInProgress, undraftedDrivers}) {

    function DriverTable() {
        console.log(isDraftInProgress)
        if (isDraftInProgress) {
            return <DriverDraftTable
                currentUser={currentUser}
                undraftedDrivers={undraftedDrivers}
            />;
        }
        return <DriverStandingsTable/>;
    }

    return (
        <DriverTable/>
    );
}