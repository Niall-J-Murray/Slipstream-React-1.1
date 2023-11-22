import HomeWelcome from "./HomeWelcome";
import AppDescription from "./AppDescription";
import HowToPlay from "./HowToPlay";
import Layout from "../../components/Layout/Layout.tsx";

export default function Home() {

    return (
        <>
            <Layout>
                <div className="grid grid-cols-5 gap-2">
                    <div className="col-start-2 col-span-1 box-shadow">
                        {/*<HomeWelcome toggleLoading={props.toggleLoading}/>*/}
                        {/*TS2786: HomeWelcome cannot be used as a JSX component.*/}
                        {/*Its type () => void | Element is not a valid JSX element type.*/}
                        {/*Caused by returning show/hideLoader() instead of html.*/}
                        <HomeWelcome/>
                    </div>
                    <div className="col-start-3 col-span-2 box-shadow">
                        <AppDescription/>
                    </div>
                    <div className="col-start-2 col-span-3 box-shadow">
                        <HowToPlay/>
                    </div>
                </div>
            </Layout>
        </>
    );
    // return (
    //     <>
    //         <View props>
    //             <BackgroundImage>
    //                 <Navbar/>
    //                 <Body>
    //                     <div className="grid grid-cols-5 gap-2">
    //                         <div className="col-start-2 col-span-1 box-shadow">
    //                             {/*<HomeWelcome toggleLoading={props.toggleLoading}/>*/}
    //                             <HomeWelcome/>
    //                         </div>
    //                         <div className="col-start-3 col-span-2 box-shadow">
    //                             <AppDescription/>
    //                         </div>
    //                         <div className="col-start-2 col-span-3 box-shadow">
    //                             <HowToPlay/>
    //                         </div>
    //                     </div>
    //                 </Body>
    //             </BackgroundImage>
    //         </View>
    //     </>
    // );
}
