import {getAddDrivers, getUpdateStandings} from "../../../services/admin.service.ts";
import {useState} from "react";

export default function AdminControls() {
    const [loading, setLoading]
        = useState<boolean>(false);
    const [message, setMessage]
        = useState<string>("");

    const handleAddDrivers = () => {
        console.log("AddDrivers")
        setMessage("");
        setLoading(true);

        getAddDrivers()
            .then(r => setMessage(r));
        setLoading(false);
    }

    const handleUpdateStandings = () => {
        console.log("UpdateStandings")
        setMessage("");
        setLoading(true);
        getUpdateStandings()
            .then(r => setMessage(r));
        setLoading(false);
    }

    return (
        <>
        <div className="col-start-2 col-span-1 box-shadow">
            <div className="p-5">
                        <div>
                            <button type={"submit"} onSubmit={handleAddDrivers}>Add Drivers</button>
                        </div>
                        <div>{loading ? "loading" : ""}</div>
                        <div>{message ? message : ""}</div>
                        <div>
                            <button type={"submit"} onSubmit={handleUpdateStandings}>Update Standings</button>
                        </div>
                    </div>
                </div>
            </>
            );
            }