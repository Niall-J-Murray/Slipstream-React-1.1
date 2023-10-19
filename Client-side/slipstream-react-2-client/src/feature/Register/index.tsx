import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import RegistrationForm from "./RegistrationForm";


export default function Register() {
    return (
        <>
            <View>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <RegistrationForm/>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}