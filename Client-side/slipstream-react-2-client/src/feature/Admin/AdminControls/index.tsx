import {getAddDrivers, getUpdateStandings} from "../../../services/admin.service.ts";
import {useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

// function load(key) {
//     const item = window.sessionStorage.getItem(key);
//     return item != null ? item : "";
// }

export default function AdminControls() {
    const navigate: NavigateFunction = useNavigate();
    const [loading, setLoading]
        = useState<boolean>(false);
    const [message, setMessage]
        = useState<string>("");
    // const [updateSuccessful, setUpdateSuccessful]
    //     = useState<boolean>(false);
    // const [updateMessage, setUpdateMessage]
    //     = useState<string>(() => load('updateMessage'));
    //
    // useEffect(() => {
    //     window.sessionStorage.setItem('updateMessage', updateMessage);
    //     setUpdateMessage(window.sessionStorage.getItem('updateMessage'));
    // }, [updateMessage]);


    const handleAddDrivers = () => {
        console.log("AddDrivers")
        setMessage("");
        setLoading(true);

        getAddDrivers()
            .then(
                () => {
                    navigate("/admin");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        // setUpdateSuccessful(true);
    }

    const handleUpdateStandings = () => {
        console.log("UpdateStandings")
        setMessage("");
        setLoading(true);

        getUpdateStandings()
            .then(
                () => {
                    // sessionStorage.setItem("updateMessage", "Update Successful");
                    navigate("/admin");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        // setUpdateSuccessful(true);

    }

    // function getMessage() {
    //     //get it if Status key found
    //     if (localStorage.getItem("updateMessage")) {
    //         updateMessage = localStorage.getItem("updateMessage");
    //         localStorage.clear();
    //     }
    // };

    return (
        <>
            <table className="league-table" id="email">
                <caption><h3>Admin Controls</h3></caption>
                <thead>
                <tr>
                    <th>Email Type</th>
                    <th>Email Address</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div>
                            <label htmlFor="emailType">Choose an email type:</label>
                        </div>
                        <div>
                            <select name="emailType" id="emailType">
                                <option value="1">1: Send Custom Email</option>
                                <option value="2">2: Send Email Template</option>
                                <option value="3">3: Send Custom Html Email</option>
                                <option value="4">4: Send HTML Email Template</option>
                            </select>
                        </div>
                    </td>
                    <td>
                        <div>
                            <label htmlFor="emailAddress">Enter Recipient Address: </label>
                        </div>
                        <div>
                            <input type="email" name="emailAddress" id="emailAddress"/>
                        </div>
                        <div className="padding: 3px">
                            <button type="submit" className="btn btn-danger navbar-btn">Send Email</button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>API</th>
                    <th>Response</th>
                </tr>
                <tr>
                    <td>
                        <div className={"p-1"}>
                            <button className="btn btn-proceed"
                                    type={"submit"}
                                    onClick={() => handleAddDrivers()}>
                                <span>Add Drivers</span>
                            </button>
                        </div>
                        <div className={"p-1"}>                            <button className="btn btn-proceed"
                                    type={"submit"}
                                    onClick={() => handleUpdateStandings()}>
                                <span>Update Standings</span>
                            </button>
                        </div>
                    </td>
                    <td>
                        <div>
                            <div>{loading ? "loading" : ""}</div>
                            <div>{message ? message : ""}</div>
                            {/*<div onLoad={() => getMessage()}>{updateMessage}</div>*/}
                            {/*<div>{updateSuccessful ? sessionStorage.getItem("updateMessage") : ""}</div>*/}
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    );
}