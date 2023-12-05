export default function DraftInProgress({
                                            currentUser,
                                            currentPickNumber,
                                            isUsersTurnToPick,
                                            nextUserToPick,
                                            isDraftInProgress,
                                            selectedDriver,
                                            lastPickTime,
                                            lastDriverPicked,
                                            handlePick,
                                        }) {

    function PickInstructions() {
        // if (isDraftInProgress) {
        // if (currentUser?.username == nextUserToPick?.username || nextUserToPick?.isTestUser) {
        if (isUsersTurnToPick) {
            return <>
                <div className="col-start-2 col-span-1">
                    <h4>
                        Draft in progress:
                    </h4>
                    <h4 className={"pick-instructions-go"}>
                        Current pick number: {currentPickNumber}
                    </h4>
                    {nextUserToPick?.isTestUser ?
                        <h4 className={"pick-instructions-go"}>
                            It's {nextUserToPick.username}'s turn to pick.
                        </h4>
                        :
                        <h4 className={"pick-instructions-go"}>
                            It's your turn to pick {nextUserToPick?.username}!
                        </h4>
                    }
                </div>
                {nextUserToPick?.isTestUser ?
                    <div className="col-start-3 col-span-1">
                        <h4>------------------------------------</h4>
                        <h4>
                            Please select a driver<br/> for this test team.
                        </h4>
                        <h4>------------------------------------</h4>
                    </div>
                    :
                    <div></div>
                }
                <div className="col-start-4 col-span-1">
                    <h4>
                        You have selected:
                    </h4>
                    <h4>
                        {selectedDriver
                            ?
                            <>
                                <p>{selectedDriver?.firstName + " " + selectedDriver?.surname}</p>
                                <div>
                                    <button onClick={(e) => handlePick(e, selectedDriver.driverId)}
                                            className={"btn btn-proceed"}
                                            type="submit">
                                        Confirm Pick
                                    </button>
                                </div>
                            </>
                            :
                            <>
                                <p>Select a driver below...</p>
                                <div>
                                    <button onClick={(e) => handlePick(e, selectedDriver.driverId)}
                                            className={"btn btn-disabled"}
                                            type="submit"
                                            disabled={true}>
                                        Confirm Pick
                                    </button>
                                </div>
                            </>
                        }
                    </h4>
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
                    It's {nextUserToPick?.username}'s turn to pick.
                </h4>
            </div>
            <div className="col-start-4 col-span-1">
                <h4>
                    Last pick was made at:
                </h4>
                <h4>
                    {lastPickTime ? lastPickTime : "No picks made yet"}
                </h4>
                <button disabled={true} className={"btn btn-disabled"} type="submit">
                    Confirm Pick
                </button>
            </div>
        </>
    }

    // }

    return (
        <>
            <PickInstructions/>
        </>
    )

}
