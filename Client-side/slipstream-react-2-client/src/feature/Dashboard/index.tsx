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
import {useState} from "react";


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
    const [showPracticeOptions, setShowPracticeOptions]
        = useState<boolean>(false);

    function TogglePracticeOptions() {
        // if(show){
        if (showPracticeOptions) {
            setShowPracticeOptions(false);
            // return <PracticeDraft/>
        } else {
            setShowPracticeOptions(true);
            // return <div></div>
        }
    }

    function PracticeOptionsToggle() {
        // if (showPracticeOptions) {
        return <>
            <div className="form-check form-switch">
                <input className="form-check-input"
                       id="testBoxToggleOff" onClick={() => TogglePracticeOptions()} role="switch"
                       type="checkbox" checked={showPracticeOptions}/>
                <label className="form-check-label" htmlFor="testBoxToggleOff">Show/Hide
                    Practice Options</label>
            </div>
        </>
        // }
    }

    return (
        <>
            <View>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <DashTop showPracticeOptions={showPracticeOptions}
                                 TogglePracticeOptions={TogglePracticeOptions}/>
                        <Reminders/>
                        <div className="col-start-2 col-span-3 box-shadow">
                            {
                                showPracticeOptions ?
                                    <div>
                                        <PracticeOptionsToggle/>
                                        <PracticeDraft/>
                                    </div>
                                    : <PracticeOptionsToggle/>
                            }
                        </div>
                        {/*<TogglePracticeOptions valueOf={showPracticeOptions}/>*/}
                        {/*<PracticeDraft/>*/}
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

// export {togglePracticeOptions}