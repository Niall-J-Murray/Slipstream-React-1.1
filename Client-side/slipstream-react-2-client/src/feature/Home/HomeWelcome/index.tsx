import {getCurrentUser} from "../../../services/auth.service.ts";
import {useEffect, useState} from "react";
import IUser from "../../../types/user.type.ts";
import ITeam from "../../../types/team.type.ts";
import {getUserData} from "../../../services/user.service.ts";

export default function HomeWelcome() {
    const [currentUser, setCurrentUser]
        = useState<IUser | undefined>();
    const [userData, setUserData]
        = useState<IUser | undefined>();
    const [team, setTeam]
        = useState<ITeam | undefined>();

    useEffect(() => {
        const user = getCurrentUser();
        setCurrentUser(user);
        const fetchUserData = async () => {
            if (user != null) {
                const response = await getUserData(user.id);
                setUserData(response);
                setTeam(response.team)
            }
        }
        fetchUserData()
            .catch(console.error);
    }, []);

    function Greeting(props: any) {
        if (props.user == null) {
            return <GuestGreeting/>;
        }
        return <UserGreeting {...props}/>;
    }

    function GuestGreeting() {
        return <h4>
            Please <a href="/login">login</a> or{" "}
            <a href="/register">register</a> to play
        </h4>;
    }

    function UserGreeting(props: any) {
        if (team != null) {
            return <div>
                <h3>Welcome back {props.user.username}!</h3>
                <h4><a href="/dashboard">Go to Dashboard</a></h4>
                <h3>Team name: {team.teamName}</h3>
                <h3>Points: {team.teamPoints ? team.teamPoints : "0 (League not active)"}</h3>
            </div>;
        }
        return <div>
            <h3>Welcome back {props.user.username}!</h3>
            <h4><a href="/dashboard">Go to Dashboard</a> to create a team.</h4>
        </div>;
    }


    // function LogoutSuccessful() {
    //     return (
    //         <div>
    //             <h4>Log out successful</h4>
    //             <h4><a href="/login">Log back in?</a></h4>
    //         </div>
    //     );
    // }

    return (
        <>
            <div className="col-start-2 col-span-1 box-shadow">
                <div className="p-5">
                    <h2>Welcome to Slipstream F1 Draft Picks!</h2>
                    <Greeting user={currentUser} team={team}/>
                </div>
            </div>
        </>
    );
}