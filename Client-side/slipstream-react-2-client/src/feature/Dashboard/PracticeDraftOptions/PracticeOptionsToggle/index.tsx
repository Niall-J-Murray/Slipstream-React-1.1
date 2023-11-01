export default function PracticeOptionsToggle({showPracticeOptions, TogglePracticeOptions}) {
    return <>
        <div className="form-check form-switch">
            <input className="form-check-input"
                   id="testBoxToggleOff" onChange={TogglePracticeOptions} role="switch"
                   type="checkbox" checked={showPracticeOptions}/>
            <label className="form-check-label" htmlFor="testBoxToggleOff">Show/Hide
                Practice Options</label>
        </div>
    </>
}