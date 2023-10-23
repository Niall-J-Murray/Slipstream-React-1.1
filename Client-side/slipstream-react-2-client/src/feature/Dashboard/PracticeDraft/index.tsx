export default function PracticeDraft() {
    return (
        <>
            {/*<div className="col-start-2 col-span-3 box-shadow">*/}
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
                <div>
                    {/*<h5>Click below to toggle practice mode.</h5>*/}
                    {/*<form id="toggle-practice" method="POST" name="toggle-practice"*/}
                    {/*      action="@{/dashboard/{userId}/toggleTestDraft (userId=${user.userId})}">*/}
                    <form>
                        <div className="form-check form-switch">
                            <input className="form-check-input" id="practiceDraftToggle"
                                // onClick={document.forms["toggle-practice"].submit()}
                                   role="switch" type="checkbox"/>
                            <label className="form-check-label" htmlFor="practiceDraftToggle">Toggle Practice Draft Mode</label>
                        </div>
                    </form>
                </div>
            {/*</div>*/}
        </>
    );
}