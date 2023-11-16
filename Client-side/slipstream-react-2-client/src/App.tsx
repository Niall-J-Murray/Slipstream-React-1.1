import {useCallback, useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import "./App.css";

import EventBus from "./common/EventBus";
import * as AuthService from "./services/auth.service";
import IUser from './types/user.type';
// import Login from "./auth-components/Login";
// import Register from "./auth-components/Register";
// import Home from "./auth-components/Home";
// import Profile from "./auth-components/Profile";
// import BoardUser from "./auth-components/BoardUser";
// import BoardModerator from "./auth-components/BoardModerator";
// import BoardAdmin from "./auth-components/BoardAdmin";
import Home from "./feature/Home";
import Login from "./feature/Login";
import Register from "./feature/Register";
import Logout from "./feature/Logout";
import Dashboard from "./feature/Dashboard";
import Admin from "./feature/Admin";

const loader = document.querySelector('.loader');

// if you want to show the loader when React loads data again
const showLoader = () => loader.classList.remove('loader--hide');

const hideLoader = () => loader.classList.add('loader--hide');

export default function App() {
    // const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
    // const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
    // const [successful, setSuccessful] = useState<boolean>(false);
    // const [message, setMessage] = useState<string>("");
    const [loading, setLoading]
        = useState(true);
    const [currentUser, setCurrentUser]
        = useState<IUser | undefined>({
        email: "",
        emailsReceived: null,
        id: undefined,
        isTestUser: false,
        lastLogout: "",
        password: "",
        roles: undefined,
        team: null,
        username: ""
    });

    const toggleLoading = useCallback(() => {
        setLoading(!loading)
    }, []);
    // function toggleLoading(){
    //     setLoading(!loading);
    // }

    useEffect(() => {
        hideLoader();
    }, []);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
        EventBus.on("logout", logOut);

        return () => {
            EventBus.remove("logout", logOut);
        };
    }, []);

    const logOut = () => {
        AuthService.logout(currentUser?.id);
    }
    // const logOut = () => {
    //     AuthService.logout(user.id).then(
    //         (response) => {
    //             setMessage(response.data.message);
    //             setSuccessful(true);
    //         },
    //         (error) => {
    //             const resMessage =
    //                 (error.response &&
    //                     error.response.data &&
    //                     error.response.data.message) ||
    //                 error.message ||
    //                 error.toString();
    //
    //             setMessage(resMessage);
    //             setSuccessful(false);
    //         }
    //     );
    //     // setShowModeratorBoard(false);
    //     // setShowAdminBoard(false);
    //     setCurrentUser(undefined);
    // };

    return (
        <div>
            <div className="container mt-3">
                {/*<CssVarsProvider>*/}
                {/*    <Sheet variant="outlined">*/}
                <Routes>
                    <Route path="/" element={<Home loading={loading} toggleLoading={toggleLoading}/>}/>
                    <Route path="/home" element={<Home loading={loading} toggleLoading={toggleLoading}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard loading={loading} toggleLoading={toggleLoading}/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    {/*<Route path="/user" element={<BoardUser/>}/>*/}
                    {/*<Route path="/mod" element={<BoardModerator/>}/>*/}
                </Routes>
                {/*    </Sheet>*/}
                {/*</CssVarsProvider>*/}
            </div>
            {/*<nav className="navbar navbar-expand navbar-dark bg-dark">*/}
            {/*    <Link to={"/"} className="navbar-brand">*/}
            {/*        Slipstream F1*/}
            {/*    </Link>*/}
            {/*    <div className="navbar-nav mr-auto">*/}
            {/*        <li className="nav-item">*/}
            {/*            <Link to={"/home"} className="nav-link">*/}
            {/*                Home*/}
            {/*            </Link>*/}
            {/*        </li>*/}

            {/*        {currentUser && (*/}
            {/*            <li className="nav-item">*/}
            {/*                <Link to={"/user"} className="nav-link">*/}
            {/*                    User*/}
            {/*                </Link>*/}
            {/*            </li>*/}
            {/*        )}*/}

            {/*        {showModeratorBoard && (*/}
            {/*            <li className="nav-item">*/}
            {/*                <Link to={"/mod"} className="nav-link">*/}
            {/*                    Moderator Board*/}
            {/*                </Link>*/}
            {/*            </li>*/}
            {/*        )}*/}

            {/*        {showAdminBoard && (*/}
            {/*            <li className="nav-item">*/}
            {/*                <Link to={"/admin"} className="nav-link">*/}
            {/*                    Admin Board*/}
            {/*                </Link>*/}
            {/*            </li>*/}
            {/*        )}*/}
            {/*    </div>*/}

            {/*    {currentUser ? (*/}
            {/*        <div className="navbar-nav ml-auto">*/}
            {/*            <li className="nav-item">*/}
            {/*                <Link to={"/profile"} className="nav-link">*/}
            {/*                    {currentUser.username}*/}
            {/*                </Link>*/}
            {/*            </li>*/}
            {/*            <li className="nav-item">*/}
            {/*                <a href="/login" className="nav-link" onClick={logOut}>*/}
            {/*                    LogOut*/}
            {/*                </a>*/}
            {/*            </li>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <div className="navbar-nav ml-auto">*/}
            {/*            <li className="nav-item">*/}
            {/*                <Link to={"/login"} className="nav-link">*/}
            {/*                    Login*/}
            {/*                </Link>*/}
            {/*            </li>*/}

            {/*            <li className="nav-item">*/}
            {/*                <Link to={"/register"} className="nav-link">*/}
            {/*                    Sign Up*/}
            {/*                </Link>*/}
            {/*            </li>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</nav>*/}
        </div>
    );

    // return (
    //     <BrowserRouter>
    //         <Routes>
    //             <Route path={"/"} element={<Homepage users={users} user={user} isLoggedIn={isLoggedIn}/>}></Route>
    //             <Route path={"/home"} element={<Homepage users={users} user={user} isLoggedIn={isLoggedIn}/>}></Route>
    //             <Route path={"/register"} element={<Register/>}></Route>
    //             <Route path={"/admin"} element={<Admin users={users}/>}></Route>
    //             <Route path={"/dashboard"} element={<Dashboard user={user} users={users}/>}></Route>
    //             <Route path={"/confirm_logout"} element={<Logout/>}></Route>
    //             <Route path={"/login"} element={<Login/>}></Route>
    //         </Routes>
    //     </BrowserRouter>
    // );
}

