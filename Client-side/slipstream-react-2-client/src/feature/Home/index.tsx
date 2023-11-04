// import './App.css';
import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import HomeWelcome from "./HomeWelcome";
import AppDescription from "./AppDescription";
import HowToPlay from "./HowToPlay";

export default function Home() {
// export default function Home({username}) {
//     const [content, setContent] = useState<string>("");
    // const currentUser = props.currentUser;
    // console.log("home-props: "+props,currentUser);
    // console.log("home-currentUser: "+currentUser);
    // // const {userId, username} = props;
    // // console.log("Main-home user: "+username)
    // const username=currentUser.username;

    // let params = useParams();
    // const  username = params.username;

    // useEffect(() => {
    //
    //     getPublicContent().then(
    //         (response) => {
    //             setContent(response.data);
    //         },
    //         (error) => {
    //             const _content =
    //                 (error.response && error.response.data) ||
    //                 error.message ||
    //                 error.toString();
    //
    //             setContent(_content);
    //         }
    //     );
    // }, []);

    return (
        <>
            <View>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <HomeWelcome/>
                        <AppDescription/>
                        <HowToPlay/>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}
