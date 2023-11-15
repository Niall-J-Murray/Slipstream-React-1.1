import {useEffect, useState} from "react";
import {getAllUsers} from "../../services/admin.service.ts";
import IUser from "../../types/user.type.ts";
import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import AdminControls from "./AdminControls";
import UserTable from "./UserTable";
import DriverStandingsTable from "../Dashboard/Table2/DriverStandingsTable";
import LeaguesTable from "./LeaguesTable";

export default function Admin() {
    const [allUsers, setAllUsers]
        = useState<Array<IUser> | undefined>([]);

    useEffect(() => {
        getAllUsers().then(response => {
            setAllUsers(response);
        })
    }, []);

    return (
        <>
            <View>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="col-start-2 col-span-1">
                                <AdminControls/>
                            </div>
                            <div className="col-start-3 col-span-2">
                                <LeaguesTable/>
                            </div>
                            <div className="col-start-2 col-span-3">
                                <UserTable allUsers={allUsers}/>
                            </div>
                            <div className="col-start-2 col-span-3">
                                <DriverStandingsTable/>
                            </div>
                        </div>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}