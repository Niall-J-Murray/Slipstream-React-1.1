import {Route, Routes} from "react-router-dom";
import "./App.css";
import {getUserFromLocalStorage, logout} from "./services/auth.service";
import Home from "./feature/Home";
import Login from "./feature/Login";
import Register from "./feature/Register";
import Logout from "./feature/Logout";
import Dashboard from "./feature/Dashboard";
import Admin from "./feature/Admin";
import {showLoader} from "./services/loading.service.ts";
import {useEffect, useState} from "react";
import EventBus from "./common/EventBus.ts";

export default function App() {
    // const [loading, setLoading]
    //     = useState(true);
    // const [currentUser, setCurrentUser]
    //     = useState<IUser | undefined>({
    //     email: "",
    //     emailsReceived: null,
    //     id: undefined,
    //     isTestUser: false,
    //     lastLogout: "",
    //     password: "",
    //     roles: undefined,
    //     team: null,
    //     username: ""
    // });
    // const toggleLoading = useCallback(() => {
    //     setLoading(!loading)
    // }, []);
    //
    // useEffect(() => {
    //     hideLoader();
    // }, []);
    //
    const [currentUser, setCurrentUser]
        = useState({
        id: undefined,
        username: "",
        roles: undefined,
    });

    useEffect(() => {
        const user = getUserFromLocalStorage();
        console.log(user)
        if (user) {
            setCurrentUser(user);
        }
        EventBus.on("logout", logOut);
        return () => {
            EventBus.remove("logout", logOut);
        };
    }, []);

    const logOut = () => {
        logout(currentUser.id);
    }

    // const {
    //     status,
    //     error,
    //     data: user,
    // } = useQuery({
    //     queryKey: ["currentUser"],
    //     queryFn: getUserFromLocalStorage,
    // })
    //
    //
    // if (status === "loading") return showLoader();
    // // if (status === "success") return hideLoader();
    // // if (status === "success") return <h1>success!</h1>;
    // // if (status === "loading") return <h1>loading...</h1>;
    // if (status === "error") return <h1>{JSON.stringify(error)}</h1>

    return (
        <>
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
            </div>
        </>
    );
}


//     return (
//             <div className="container mt-3">
//                 <Routes>
//                     <Route path="/" element={<Home loading={loading} toggleLoading={toggleLoading}/>}/>
//                     <Route path="/home" element={<Home loading={loading} toggleLoading={toggleLoading}/>}/>
//                     <Route path="/register" element={<Register/>}/>
//                     <Route path="/login" element={<Login/>}/>
//                     <Route path="/dashboard" element={<Dashboard loading={loading} toggleLoading={toggleLoading}/>}/>
//                     <Route path="/admin" element={<Admin/>}/>
//                     <Route path="/logout" element={<Logout/>}/>
//                 </Routes>
//             </div>
//     );
// }

