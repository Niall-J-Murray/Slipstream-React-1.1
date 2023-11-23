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

interface AdminProps {
    userData: undefined | IUser
}

export default function Admin({userData}: AdminProps) {
    // function notAdmin(userData) {
    //     if (!userData?.roles?.includes("ROLE_ADMIN")) {
    //         return (
    //             <h1>User is not Admin</h1>
    //         )
    //     }
    // }

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
                            {!userData?.roles?.includes("ROLE_ADMIN") ? <>
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
                                </>
                                :
                                <h1>User is not Admin</h1>
                            }
                        </div>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}