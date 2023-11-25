import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import LoginForm from "./LoginForm";
import {useEffect} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import IUser from "../../types/user.type.ts";

interface LoginProps {
    userData: IUser | undefined
}

export default function Login({userData}: LoginProps) {
    const redirect: NavigateFunction = useNavigate();
    useEffect(() => {
        if (userData) {
            redirect("/dashboard");
        }
    }, []);
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