import {createTestTeam} from "../../../../services/team.service.ts";

export default function PracticeDraft({currentLeague, isPracticeLeague, TogglePracticeLeague}) {

    function PracticeDraftNotActive() {
        return <div>
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
            </div>
            <form>
                <div className="form-check form-switch">
                    <input className="form-check-input" id="practiceDraftToggle"
                           onChange={TogglePracticeLeague}
                           role="switch" type="checkbox" checked={false}/>
                    <label className="form-check-label" htmlFor="practiceDraftToggle">
                        Toggle Practice Draft Mode
                    </label>
                </div>
            </form>
        </div>
    }

    // Todo Display correct info and options in dash-top depending on users team/league status.
    //  Start with toggling practice options switch and toggle practice mode functionality.
    //  update table 1 component when test team/any team is created.

    function PracticeDraftActive() {
        return <div>
            <div>
                <h4>For Practice Draft:</h4>
                <ul className="text-block">
                    <li>To see how the game works, you can add dummy test teams to this league for a practice draft.
                    </li>
                    <li>Teams can be deleted after the practice draft, or will be automatically deleted after 24
                        hours.
                    </li>
                    <li>Any non-test teams can be left in this league, or deleted to join a new league.</li>
                </ul>
            </div>
            <div>
                <h5>Click below to add a test team to this league:</h5>
                <div>
                    <button className="btn btn-success" id="test-team-button" type="submit"
                            onClick={() => createTestTeam(currentLeague.leagueId)}>
                        Add Test Team
                    </button>
                </div>
            </div>
            <form>
                <div className="form-check form-switch">
                    <input className="form-check-input" id="practiceDraftToggle"
                           onChange={TogglePracticeLeague}
                           role="switch" type="checkbox" checked={true}/>
                    <label className="form-check-label" htmlFor="practiceDraftToggle">
                        Toggle Practice Draft Mode
                    </label>
                </div>
            </form>
        </div>
    }

    function PracticeDraftToggle() {
        if (isPracticeLeague) {
            return <PracticeDraftActive/>
        } else {
            return <PracticeDraftNotActive/>
        }
    }

    return (
        <>
            <div>
                <PracticeDraftToggle/>
            </div>
        </>
    );
}