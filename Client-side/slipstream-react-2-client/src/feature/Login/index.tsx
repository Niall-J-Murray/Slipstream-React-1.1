import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import LoginForm from "./LoginForm";

export default function Register() {
    return (
        <>
            <View>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <LoginForm/>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}

// <View>
//     <BackgroundImage>
//         <Navbar/>
//         <Body>
//             {/*<HomeWelcome users={users} user={user} isloggedin={isLoggedIn}/>*/}
//             <HomeWelcome/>
//             <AppDescription/>
//             <HowToPlay/>
//         </Body>
//     </BackgroundImage>
// </View>