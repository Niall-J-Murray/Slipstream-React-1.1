import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import HomeWelcome from "./HomeWelcome";
import AppDescription from "./AppDescription";
import HowToPlay from "./HowToPlay";

export default function Home(props) {

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
            <View props>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="col-start-2 col-span-1 box-shadow">
                                <HomeWelcome toggleLoading={props.toggleLoading}/>
                            </div>
                            <div className="col-start-3 col-span-2 box-shadow">
                                <AppDescription/>
                            </div>
                            <div className="col-start-2 col-span-3 box-shadow">
                                <HowToPlay/>
                            </div>
                        </div>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}
