import View from "../../components/View";
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from "../../components/Navbar";
import Body from "../../components/Body";
import DashTop from "./DashTop";
import PracticeDraft from "./PracticeDraft";
import Table1 from "./Table1";
// import Table2 from "./Table2";
import Reminders from "./Reminders";
import Table2 from "./Table2";



// interface DashboardParams {
//     user: {
//         authorities: Set<{ Authority: Object }>,
//         email: String,
//         emailsReceived: Number,
//         isTestUser: Boolean,
//         lastLogout: String,
//         password: String,
//         team: {
//             teamId: Number,
//             league: Object,
//             user: { user: Object },
//             firstPickNumber: Number,
//             secondPickNumber: Number,
//             teamName: String,
//             isTestTeam: Boolean,
//             startingPoints: Number,
//             teamPoints: Number,
//             ranking: Number
//             drivers: [object]
//         },
//         userId: Number,
//         username: String
//     };
//     users: [{ user:object }];
// }


export default function Dashboard() {
    return (
        <>
            <View>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <DashTop/>
                        <Reminders/>
                        <PracticeDraft/>
                        {/*<JoyTable1/>*/}
                        {/*<JoyTable2/>*/}
                        <Table1/>
                        <Table2/>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    );
}
