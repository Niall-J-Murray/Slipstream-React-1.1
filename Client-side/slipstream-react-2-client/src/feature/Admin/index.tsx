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
                        <AdminControls/>
                        <LeaguesTable/>
                        <UserTable allUsers={allUsers}/>
                        <DriverStandingsTable/>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}