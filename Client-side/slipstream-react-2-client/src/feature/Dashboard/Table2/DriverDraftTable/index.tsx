import IDriver from "../../../../types/driver.type.ts";

export default function DriverDraftTable({
                                             currentUser,
                                             undraftedDrivers,
                                             handleDriverSelection,
                                             isUsersTurnToPick,
                                             nextUserToPick,
                                             handlePick,
                                         }) {
    console.log("draft")
    console.log(nextUserToPick)
    console.log(nextUserToPick?.username)
    console.log(isUsersTurnToPick)
    return (
        <>
            <div className="col-start-3 col-span-2">
                <table className="drivers-table">
                    <caption><h3>Undrafted Drivers -
                        <small>({undraftedDrivers?.length}/20 remaining)</small></h3>
                    </caption>
                    <thead>
                    <tr>
                        {/*{(currentUser.username == nextUserToPick.username || nextUserToPick.isTestUser) ?*/}
                        {(isUsersTurnToPick) ?
                            <th>Pick</th>
                            :
                            <th>
                                Car#
                            </th>
                        }
                        <th>Driver</th>
                        <th>Pos</th>
                        <th>Pts</th>
                        <th>Nationality</th>
                        <th>Constructor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {undraftedDrivers?.map((driver: IDriver) => {
                        return (
                            <tr key={driver.driverId}>
                                {/*{(currentUser.username == nextUserToPick.username || nextUserToPick.isTestUser) ?*/}
                                {(isUsersTurnToPick) ?
                                    <td>
                                        <form id="driver-pick-form" onSubmit={() => handlePick(driver.driverId)}>
                                            <input
                                                type="radio"
                                                name="driverId"
                                                value={driver?.driverId}
                                                onClick={() => {
                                                    handleDriverSelection(driver.driverId)
                                                    console.log("handleDriverSelection(driver.driverId)")
                                                    console.log(handleDriverSelection(driver.driverId))
                                                }}
                                            />
                                        </form>
                                    </td>
                                    :
                                    <td>
                                        {driver.carNumber}
                                        {/*<form id="driver-pick-form" onSubmit={() => handlePick(driver.driverId)}>*/}
                                        {/*    <input*/}
                                        {/*        type="radio"*/}
                                        {/*        name="driverId"*/}
                                        {/*        value={driver?.driverId}*/}
                                        {/*        onClick={() => {*/}
                                        {/*            handleDriverSelection(driver.driverId)*/}
                                        {/*            console.log("handleDriverSelection(driver.driverId)")*/}
                                        {/*            console.log(handleDriverSelection(driver.driverId))*/}
                                        {/*        }}*/}
                                        {/*    />*/}
                                        {/*</form>*/}
                                    </td>
                                }
                                {/*<td id="confirm-test-pick">*/}
                                {/*<td>*/}
                                {/*    /!*{driverPick = handleDriverSelection(driver.driverId)}*!/*/}
                                {/*    {(currentUser.username == currentPickName) ?*/}
                                {/*        <Formik*/}
                                {/*            // enableReinitialize*/}
                                {/*            initialValues={{*/}
                                {/*                driverId: null,*/}
                                {/*            }}*/}
                                {/*            onSubmit={(values) => {*/}
                                {/*                console.log("values.driverId:")*/}
                                {/*                console.log(values.driverId)*/}
                                {/*                console.log("pickId:")*/}
                                {/*                console.log(pickId)*/}
                                {/*                // handlePick(currentUser?.id, pickId)*/}
                                {/*                handleDriverPick()*/}
                                {/*                navigate("/dashboard");*/}
                                {/*            }}*/}
                                {/*            // validateOnChange={(values) => {*/}
                                {/*            //     handleDriverSelection(values.picked);*/}
                                {/*            // }}*/}
                                {/*        >*/}
                                {/*            /!*{({values = driver.driverId}) => (*!/*/}
                                {/*            <Form id="driver-pick-form">*/}
                                {/*                /!*pickValue={driver.driverId}>*!/*/}
                                {/*                /!*enableReinitialize>*!/*/}
                                {/*                <label>{driver.driverId}*/}
                                {/*                    <Field*/}
                                {/*                        form="driver-pick-form"*/}
                                {/*                        type="radio"*/}
                                {/*                        name="driverId"*/}
                                {/*                        value={driver.driverId}*/}
                                {/*                        onClick={() => {*/}
                                {/*                            handleDriverSelection(driver.driverId)*/}
                                {/*                            handlePickDriverSelection(driver)*/}
                                {/*                            setPickId(driver.driverId)*/}
                                {/*                            setSelectedDriver(driver)*/}
                                {/*                        }}*/}
                                {/*                        // innerRef={handleDriverSelection(driver.driverId)}*/}
                                {/*                        // FieldInputProps={{onChange: handleDriverSelection(driver.driverId)}}*/}
                                {/*                        // onChange={e => {*/}
                                {/*                        //     e = setPickId(driver.driverId);*/}
                                {/*                        //     // setFieldTouched('type');*/}
                                {/*                        //     handleDriverSelection(e)*/}
                                {/*                        // }}*/}
                                {/*                        // onInput={() => handleDriverSelection(driver.driverId)}*/}
                                {/*                        // onKeyDown={() => handleDriverSelection(driver.driverId)}*/}
                                {/*                        // InputProps={{ on }}*/}
                                {/*                        // onClick={() => handleDriverSelection(driver.driverId)}*/}
                                {/*                        // onChange={() => setPickId(driver.driverId)}*/}
                                {/*                        // onChange={()=>console.log("pick id:" + driver.driverId)}*/}
                                {/*                    />*/}
                                {/*                </label>*/}
                                {/*                /!*{handleDriverSelection(values)}*!/*/}
                                {/*            </Form>*/}
                                {/*            /!*)}*!/*/}
                                {/*        </Formik>*/}
                                {/*        :*/}
                                {/*        <div></div>*/}
                                {/*        // <Field id="pick-button"*/}
                                {/*        //        type="radio"*/}
                                {/*        //        name="driverSelectedDisabled"*/}
                                {/*        //        value={driver.driverId}*/}
                                {/*        //        onChange={() => handleDriverSelection(driver)}*/}
                                {/*        //        disabled*/}
                                {/*        //     // onChange={()=>console.log("pick id:" + driver.driverId)}*/}
                                {/*        // />*/}
                                {/*    }*/}
                                {/*</td>*/}
                                <td>{driver.surname}</td>
                                <td>{driver.standing}</td>
                                <td>{driver.points}</td>
                                <td>{driver.nationality}</td>
                                <td>{driver.constructor}</td>
                            </tr>
                        )
                    })}
                    </tbody>

                </table>
                <div>
                    <h6>
                        * Driver Changes:
                        <br/>Ricciardo replaced de Vries on July 11th 2023.
                        <br/>Lawson replaced Ricciardo on August 27th 2023.
                        <br/>Ricciardo replaced Lawson on October 20th 2023.
                    </h6>
                </div>
                {/*</div>*/}
                {/*</Form>*/}
                {/*)}*/}
                {/*// </Formik>*/}
                {/*    </form>*/
                }
                {/*</div>*/
                }
            </div>
        </>
    )
        ;
}

// const navigate: NavigateFunction = useNavigate();
// const [loading, setLoading] = useState<boolean>(false);
// const [message, setMessage] = useState<string>("");
//
// const initialValues: {
//     driverId: number | null | undefined;
// } = {
//     driverId: null,
// };
//
// const validationSchema = Yup.object().shape({
//     userId: Yup.string().required("Invalid user ID."),
//     driverId: Yup.string().required("Please select a driver.")
// });
//
// const handlePick = (driverId: string) => {
//     // const {driverId} = formValue;
//     console.log("handlePick");
//     console.log(currentUser?.id);
//     console.log(driverId);
//     setMessage("");
//     setLoading(true);
//
//     postPickDriver(currentUser?.id, driverId).then(
//         () => {
//             navigate("/dashboard");
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
//             setLoading(false);
//             setMessage(resMessage);
//         }
//     );
// };
//
// return (
//     <>
//         <div className="col-start-3 col-span-2">
//             <Formik
//                 initialValues={{
//                     picked: '',
//                 }}
//                 // onSubmit={async (values) => {
//                 //     await new Promise((r) => setTimeout(r, 500));
//                 //     alert(JSON.stringify(values, null, 2));
//                 // }}
//                 onSubmit={(values) => {
//                     console.log("pick id:" + values.picked)
//                     handlePick(values.picked)
//                 }
//                 }
//             >
//                 {({values}) => (
//                     <Form>
//                         {/*<div id="my-radio-group">Picked</div>*/}
//                         <div role="group" aria-labelledby="my-radio-group">
//                             {/*    <label>*/}
//                             {/*        <Field type="radio" name="picked" value="One"/>*/}
//                             {/*        One*/}
//                             {/*    </label>*/}
//                             {/*    <label>*/}
//                             {/*        <Field type="radio" name="picked" value="Two"/>*/}
//                             {/*        Two*/}
//                             {/*    </label>*/}
//                             <div>Picked: {values.picked}</div>
//                             {/*</div>*/}
//
//                             {/*<button type="submit">Submit</button>*/}
//
//
//                             <table className="drivers-table">
//                                 <caption><h3>Undrafted Drivers -
//                                     <small>({undraftedDrivers?.length}/20 remaining)</small></h3>
//                                 </caption>
//                                 <thead>
//                                 <tr>
//                                     <th id="confirm-test-pick">
//                                         <button id="pick-button" type="submit">Submit</button>
//                                         {/*<div className="form-group">*/}
//                                         {/*    <button name="driver-pick" className="btn btn-success" id="test-pick-button"*/}
//                                         {/*            type="submit"*/}
//                                         {/*            disabled={loading}>*/}
//                                         {/*        {loading && (*/}
//                                         {/*            <span className="spinner-border spinner-border-sm"></span>*/}
//                                         {/*        )}*/}
//                                         {/*        <span>Confirm<br/>Pick</span>*/}
//                                         {/*    </button>*/}
//                                         {/*</div>*/}
//                                     </th>
//                                     <th>Driver</th>
//                                     <th>Pos</th>
//                                     <th>Pts</th>
//                                     <th>Nationality</th>
//                                     <th>Constructor</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//                                 {undraftedDrivers?.map((driver: IDriver) => {
//                                     return (
//                                         <tr key={driver.driverId}>
//                                             <td>
//                                                 <label>
//                                                     <Field type="radio" name="picked" value={driver.driverId}/>
//                                                     Pick
//                                                 </label>
//                                                 {/*<div className="form-group">*/}
//                                                 {/*    <Field name="driver-pick"*/}
//                                                 {/*           type="radio"*/}
//                                                 {/*           className="form-control"*/}
//                                                 {/*           value={driver.driverId}/>*/}
//                                                 {/*</div>*/}
//                                                 {/*<input*/}
//                                                 {/*className="form-check-input" id="driver-pick" name="driver-pick"*/}
//                                                 {/*value={"driver.driverId"}*/}
//                                                 {/*type="radio"/>Pick*/}
//                                             </td>
//                                             <td>{driver.surname}</td>
//                                             <td>{driver.standing}</td>
//                                             <td>{driver.points}</td>
//                                             <td>{driver.nationality}</td>
//                                             <td>{driver.constructor}</td>
//                                         </tr>
//                                     )
//                                 })}
//                                 </tbody>
//
//                             </table>
//                             <div>
//                                 <h6>
//                                     * Driver Changes:
//                                     <br/>Ricciardo replaced de Vries on July 11th 2023.
//                                     <br/>Lawson replaced Ricciardo on August 27th 2023.
//                                     <br/>Ricciardo replaced Lawson on October 20th 2023.
//                                 </h6>
//                             </div>
//                         </div>
//                     </Form>
//                 )}
//             </Formik>
//             {/*    </form>*/}
//             {/*</div>*/}
//         </div>
//     </>
// );
// }
