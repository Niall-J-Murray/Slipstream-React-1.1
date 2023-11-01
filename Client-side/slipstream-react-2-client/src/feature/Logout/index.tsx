import * as AuthService from "../../services/auth.service.ts";
import {getCurrentUser} from "../../services/auth.service.ts";
import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import checkered_flag from "../../assets/images/checkered_flag.jpg";
import {NavigateFunction, useNavigate} from "react-router-dom";

export default function Logout() {
    const navigate: NavigateFunction = useNavigate();
    const logOut = () => {
        AuthService.logout(getCurrentUser().id);
        // setShowModeratorBoard(false);
        // setShowAdminBoard(false);
        // setCurrentUser(undefined);
        navigate("/home");
        window.location.reload();
    };

    function LogOutForm() {
        return <div className="col-start-3 col-span-1 box-shadow">
            <div className="grid grid-cols-5 gap-3 p-5">
                <img
                    src={checkered_flag}
                    height={180}
                    width={330}
                    alt="red-lights"
                    className="login-pic col-start-1 col-span-3"
                />
                <div className={"col-start-2 col-span-3"}>Are you sure?</div>

                <div className={"col-start-2 col-span-3"}>
                    <button className="btn btn-success" type="submit" onClick={logOut}>
                        <span>Confirm Logout</span>
                    </button>
                </div>
            </div>
        </div>;
    }

    return (
        <>
            <View>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <LogOutForm/>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}

