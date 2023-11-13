export default function Reminders() {
    return (
        <>
            {/*<div className="col-span-2 box-shadow">*/}
            <div className="box-shadow">
                <h4>Reminders</h4>
                <ul className="text-block">
                    <li>When you create a team, it is automatically added to the current open league, as shown
                        below.
                    </li>
                    <li>If you want to delete your team, you must wait until the league you joined is active.
                    </li>
                    <li>Once a league has 10 teams the draft picks will start, and players will take turns
                        picking from
                        remaining undrafted drivers.
                    </li>
                    <li>When all 20 drivers are picked, the league is active and locked. No changes can then be
                        made, apart
                        from deleting your team.
                    </li>
                    <li>All players will start on 0 points and will only score points from F1 races after the
                        league is
                        active.
                    </li>
                    <li>If a driver is replaced or temporarily substituted, you will receive the points of their
                        replacement.
                    </li>
                    <li>Any current points your driver has will not be added to your team points.</li>
                    <li>Tie breaks will be won by whoever picked last with their first pick.</li>
                </ul>
                <h5>Good Luck!</h5>
            </div>
        </>
    );
}
