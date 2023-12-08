import IUser from "../../../types/user.type.ts";

interface HomeWelcomeProps {
    userData: IUser | undefined
}

export default function HomeWelcome({userData}: HomeWelcomeProps) {

    function Greeting() {
        if (userData) {
            return (<UserGreeting/>);
        }
        return (<GuestGreeting/>);
    }

    function UserGreeting() {
        const {username, team} = userData!;
        if (team) {
            return (
                <div>
                    <h3>Welcome back {username}!</h3>
                    <h4><a href="/dashboard">Go to Dashboard</a></h4>
                    <h3>Team name: {team.teamName}</h3>
                    <h3>Points: {team.teamPoints ? team.teamPoints : "0 (League not active)"}</h3>
                </div>
            );
        }
        return (
            <div>
                <h3>Welcome back {username}!</h3>
                <h4><a href="/dashboard">Go to Dashboard</a> to create a team.</h4>
            </div>
        );
    }

    function GuestGreeting() {
        return (
            <>
                <h4>
                    <a href="/login">Please Login</a>
                    <br/><br/>- or -<br/><br/>
                    <a href="/register">Register to play!</a>
                </h4>
            </>
        );
    }

    return (
        <>
            <div className="p-1">
                <h2>Welcome to <br/>Slipstream F1 Draft Picks!</h2>
                <Greeting/>
            </div>
        </>
    );
}