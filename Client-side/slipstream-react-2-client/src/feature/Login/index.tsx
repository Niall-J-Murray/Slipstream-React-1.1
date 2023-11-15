import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import LoginForm from "./LoginForm";

export default function Login() {
    return (
        <>
            <View>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="col-start-3 col-span-1 box-shadow">
                                <LoginForm/>
                            </div>
                        </div>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}