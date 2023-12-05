import IUser from "../../../types/user.type.ts";

interface HomeWelcomeProps {
    userData: IUser | undefined,
    error: boolean
}

export default function HomeWelcome({userData, error}: HomeWelcomeProps) {

    function Greeting() {
        if (userData) {
            return (<UserGreeting/>);
        }
        return (<GuestGreeting/>);
    }

    function UserGreeting() {
        const {username, team} = userData!;
        if (team) {
            return (
                <div>
                    <h3>Welcome back {username}!</h3>
                    <h4><a href="/dashboard">Go to Dashboard</a></h4>
                    <h3>Team name: {team.teamName}</h3>
                    <h3>Points: {team.teamPoints ? team.teamPoints : "0 (League not active)"}</h3>
                </div>
            );
        }
        return (
            <div>
                <h3>Welcome back {username}!</h3>
                <h4><a href="/dashboard">Go to Dashboard</a> to create a team.</h4>
            </div>
        );
    }

    function GuestGreeting() {
        return (
            <>
                {error ?
                    <h4>
                        <a href="/login">Please Login</a>
                        <br/><br/>- or -<br/><br/>
                        <a href="/register">Register to play!</a>
                        <h3 className={"error-message"}>An error has occurred, please try to login again.</h3>
                    </h4>
                    :
                    <h4>
                        <a href="/login">Please Login</a>
                        <br/><br/>- or -<br/><br/>
                        <a href="/register">Register to play!</a>
                    </h4>
                }
            </>
        );
    }

    return (
        <>
            <div className="p-1">
                <h2>Welcome to <br/>Slipstream F1 Draft Picks!</h2>
                <Greeting/>
            </div>
        </>
    );
}

// export default function HomeWelcome({toggleLoading}) {
// const [currentUser, setCurrentUser]
//     = useState<IUser | undefined>();
// const [userData, setUserData]
//     = useState<IUser | undefined>();
// const [team, setTeam]
//     = useState<ITeam | undefined>();
//
// useEffect(() => {
//     // toggleLoading(true);
//     const user = getUserFromLocalStorage();
//     setCurrentUser(user);
//     const fetchUserData = async () => {
//         if (user != null) {
//             const response = await getUserData(user.id);
//             setUserData(response);
//             setTeam(response.team)
//         }
//     }
//     fetchUserData()
//         .catch(console.error);
//     // toggleLoading(false);
// }, []);
//
//     function Greeting() {
//         if (userAuth) {
//             return (<UserGreeting/>);
//         }
//         return (<GuestGreeting/>);
//     }
//
//     function UserGreeting() {
//         const {username, team} = userData!;
//         if (team) {
//             return (
//                 <div>
//                     <h3>Welcome back {username}!</h3>
//                     <h4><a href="/dashboard">Go to Dashboard</a></h4>
//                     <h3>Team name: {team.teamName}</h3>
//                     <h3>Points: {team.teamPoints ? team.teamPoints : "0 (League not active)"}</h3>
//                 </div>
//             );
//         }
//         return (
//             <div>
//                 <h3>Welcome back {username}!</h3>
//                 <h4><a href="/dashboard">Go to Dashboard</a> to create a team.</h4>
//             </div>
//         );
//     }
//
//     function GuestGreeting() {
//         return (
//             <>
//                 <h4>
//                     Please <br/><a href="/login">Login</a> <br/>- or -<br/>
//                     <a href="/register">Register</a><br/> to play!
//                 </h4>
//             </>
//         );
//     }
//
//     return (
//         <>
//             <div className="p-1">
//                 <h2>Welcome to <br/>Slipstream F1 Draft Picks!</h2>
//                 <Greeting/>
//             </div>
//         </>
//     );
// }
