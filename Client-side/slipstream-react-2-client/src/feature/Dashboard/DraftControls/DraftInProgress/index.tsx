export default function DraftInProgress({
                                            currentUser,
                                            isDraftInProgress,
                                            currentPickNumber,
                                            currentPickName,
                                            selectedDriver,
                                            lastDriverPicked,
                                            lastPickTime
                                        }) {

// const handlePick = (userId: number | null | undefined, driverId: string) => {
//         // const {driverId} = formValue;
//         console.log("handlePick");
//         console.log(userId);
//         console.log(driverId);
//         // setMessage("");
//         // setLoading(true);
//
//         postPickDriver(userId, driverId).then(
//             () => {
//                 window.location.reload();
//             },
//             (error) => {
//                 const resMessage =
//                     (error.response &&
//                         error.response.data &&
//                         error.response.data.message) ||
//                     error.message ||
//                     error.toString();
//
//                 // setLoading(false);
//                 // setMessage(resMessage);
//             }
//         );
//     };


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
                        <button form="driver-pick-form" className={"btn btn-proceed"} type="submit"
                            //         onSubmit={(values) => {
                            //     console.log("pick id:")
                            //     console.log(values)
                            //     handlePick(currentUser?.id, values)
                            //     navigate("/dashboard");
                            // }}>
                        >
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
    }

    return (
        <>
            <PickInstructions/>
        </>
    )

}

// export const handlePick = (userId: number | null | undefined, driverId: number | null | undefined) => {
//     // const {driverId} = formValue;
//     console.log("handlePick");
//     console.log(userId);
//     console.log(driverId);
//     // setMessage("");
//     // setLoading(true);
//     // driverId = 3;
//
//     postPickDriver(userId, driverId).then(
//         () => {
//             window.location.reload();
//         },
//         (error) => {
//             const resMessage =
//                 (error.response &&
//                     error.response.data &&
//                     error.response.data.message) ||
//                 error.message ||
//                 error.toString();
//
//             // setLoading(false);
//             // setMessage(resMessage);
//         }
//     );
// };