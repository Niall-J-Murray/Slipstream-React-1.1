export default function DraftInProgress({currentUser, isDraftInProgress, currentPickNumber, currentPickName}) {
    const firstPickNumber = currentUser?.team?.firstPickNumber;
    const secondPickNumber = currentUser?.team?.secondPickNumber;

    function PickInstructions() {
        if (isDraftInProgress) {
            if (firstPickNumber == currentPickNumber || secondPickNumber == currentPickNumber) {
                return <>
                    <h4 className={"text-#2ea44f; text-decoration-line: underline"}>
                        Current pick number: {currentPickNumber}
                    </h4>
                    <h4 className="color: #2ea44f; text-decoration-line: underline">
                        It's your turn to pick {currentUser.username}!
                    </h4>
                </>
            }
            return <>
                <p>
                    Draft in progress, please wait for your turn to pick.
                </p>
                <h4 className={"color: #2ea44f; text-decoration-line: underline"}>
                    Current pick number: {currentPickNumber}
                </h4>
                <h4 className="color: #2ea44f; text-decoration-line: underline">
                    It's {currentPickName}'s turn to select a driver.
                </h4>
            </>
        }
    }

    return (
        <>
            <PickInstructions/>
        </>
    )

}