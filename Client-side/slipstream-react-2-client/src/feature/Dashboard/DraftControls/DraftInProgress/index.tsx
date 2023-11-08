export default function DraftInProgress({
                                            currentUser,
                                            isDraftInProgress,
                                            currentPickNumber,
                                            currentPickName,
                                            selectedDriver
                                        }) {

    function PickInstructions() {
        if (isDraftInProgress) {
            if (currentUser.username == currentPickName || currentUser.username == currentPickName) {
                return <>
                    <div className="col-start-2 col-span-1">
                        <h4>
                            Draft in progress:
                        </h4>
                        <h4 className={"pick-instructions-go"}>
                            Current pick number: {currentPickNumber}
                        </h4>
                        <h4 className={"pick-instructions-go"}>
                            It's your turn to pick {currentUser.username}!
                        </h4>
                    </div>
                    <div className="col-start-4 col-span-1">
                        <h4>
                            You have selected:
                        </h4>
                        <h4>
                            {selectedDriver
                                ?
                                selectedDriver?.firstName + " " + selectedDriver?.surname
                                :
                                "Select a driver below..."}
                        </h4>
                        <button form="driver-pick-form" className={"btn btn-proceed"} type="submit">
                            Confirm Pick
                        </button>
                    </div>
                </>
            }
            return <>
                <div className="col-start-2 col-span-1">
                    <h4>
                        Draft in progress:
                    </h4>
                    <h4 className={"pick-instructions-wait"}>
                        Current pick number: {currentPickNumber}
                    </h4>
                    <h4 className="pick-instructions-wait">
                        It's {currentPickName}'s turn to pick.
                    </h4>
                </div>
                <div className="col-start-4 col-span-1">
                    <h4>
                        Last driver selected was:
                    </h4>
                    <h4>
                        {selectedDriver
                            ?
                            selectedDriver?.firstName + " " + selectedDriver?.surname
                            :
                            "No picks made yet"}
                    </h4>
                    <h4>
                        Picked by previousPick
                    </h4>
                </div>
            </>
        }
    }

    return (
        <>
            <PickInstructions/>
        </>
    )

}
