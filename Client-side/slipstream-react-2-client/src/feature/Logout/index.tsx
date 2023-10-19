import * as AuthService from "../../services/auth.service.ts";
import {getCurrentUser} from "../../services/auth.service.ts";

export default function Logout() {
    const logOut = () => {
        AuthService.logout(getCurrentUser().id);
        // setShowModeratorBoard(false);
        // setShowAdminBoard(false);
        // setCurrentUser(undefined);
    };
    return (
        <div>
            <a href="/home" className="nav-link" onClick={logOut}>
                LogOut</a>
        </div>
    );
}
