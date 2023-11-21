import {getUserFromLocalStorage} from "../../../services/auth.service.ts";
import {getUserData} from "../../../services/user.service.ts";
import {useQuery} from "react-query";
import {hideLoader, showLoader} from "../../../services/loading.service.ts";

// export default function HomeWelcome({toggleLoading}) {
export default function HomeWelcome() {
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
    // const {
    //     data: userAuth,
    //     status: statUserAuth,
    //     error: errUserAuth,
    // } = useQuery({
    //     queryKey: ["currentUser"],
    //     queryFn: getUserFromLocalStorage,
    // })

    const userAuth = getUserFromLocalStorage();
    const userId = userAuth ? userAuth.id : null;
    // const {
    //     data: userData,
    //     status: statUserData,
    //     error: errUserData,
    // } = useQuery({
    //     queryKey: ["userData", {userId}],
    //     queryFn: getUserData(userId)
    // })

    const {
        data: userData,
        status: statUserData,
        error: errUserData,
    } = useQuery({
        queryKey: ["userData",userId],
        // queryFn: () => getUserData,
        queryFn: () => getUserData(userId),
        // placeholderData:null,
    });
    // if (userId) {
    //     getUserData(userId)
    //         // handle error?
    //         .catch();
    // }
    // },

    // if (statUserAuth === "success") return <h1>success!</h1>;
    // if (statUserAuth === "loading") return <h1>loading...</h1>;
    // if (statUserAuth === "loading") return showLoader();
    // if (statUserAuth === "success") hideLoader();
    // if (statUserAuth === "error") return <h1>{JSON.stringify(errUserAuth)}</h1>

    // if (statUserData === "success") return <h1>success!</h1>;
    // if (statUserData === "loading") return <h1>loading...</h1>;
    if (statUserData === "loading") return showLoader();
    if (statUserData === "success") hideLoader();
    if (statUserData === "error") return <h1>{JSON.stringify(errUserData)}</h1>

    function Greeting(props) {
        if (props.userAuth) {
            return <UserGreeting userData={props.userData}/>;
        }
        return <GuestGreeting/>;
    }

    function GuestGreeting() {
        return (
            <>
                <h4>
                    Please <a href="/login">login</a> <br/>-or-<br/>
                    <a href="/register">Register</a> to play
                </h4>
            </>
        );
    }

    function UserGreeting(props) {
        const {username, team} = props;
        if (team) {
            return <div>
                <h3>Welcome back {username}!</h3>
                <h4><a href="/dashboard">Go to Dashboard</a></h4>
                <h3>Team name: {team.teamName}</h3>
                <h3>Points: {team.teamPoints ? team.teamPoints : "0 (League not active)"}</h3>
            </div>;
        }
        return <div>
            <h3>Welcome back {username}!</h3>
            <h4><a href="/dashboard">Go to Dashboard</a> to create a team.</h4>
        </div>;
    }

    return (
        <>
            <div className="p-1">
                <h2>Welcome to <br/>Slipstream F1 Draft Picks!</h2>
                <Greeting userAuth={userAuth} userData={userData}/>
            </div>
        </>
    )
}
