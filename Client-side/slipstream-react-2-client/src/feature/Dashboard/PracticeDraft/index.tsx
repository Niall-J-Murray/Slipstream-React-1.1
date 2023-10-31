export default function PracticeDraft({isPracticeLeague, TogglePracticeLeague}) {
    function PracticeDraftToggle() {
        if (isPracticeLeague) {
            return <div>
                <form>
                    <div className="form-check form-switch">
                        <input className="form-check-input" id="practiceDraftToggle"
                            // onClick={TogglePracticeLeague}
                               onChange={TogglePracticeLeague}
                               role="switch" type="checkbox" checked={true}/>
                        <label className="form-check-label" htmlFor="practiceDraftToggle">Toggle Practice Draft
                            Mode</label>
                    </div>
                </form>
            </div>
        } else {
            return <div>
                <form>
                    <div className="form-check form-switch">
                        <input className="form-check-input" id="practiceDraftToggle"
                            // onClick={TogglePracticeLeague}
                               onChange={TogglePracticeLeague}
                               role="switch" type="checkbox" checked={false}/>
                        <label className="form-check-label" htmlFor="practiceDraftToggle">Toggle Practice Draft
                            Mode</label>
                    </div>
                </form>
            </div>
        }
    }

    return (
        <>
            <div>
                <h4>Want to try a practice draft?</h4>
                Caution:<br/>
                <ul className="text-block">
                    <li>This cannot be undone, you will have to delete your team from this league after the
                        practice
                        draft is finished if you would like to join another league.
                    </li>
                    <li>If you do not delete your team, the league will continue as normal, but all test teams
                        will be
                        removed.
                    </li>
                </ul>
                <PracticeDraftToggle/>
            </div>
        </>
    );
}