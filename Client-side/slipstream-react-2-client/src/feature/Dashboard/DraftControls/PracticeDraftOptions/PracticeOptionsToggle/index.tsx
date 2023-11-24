export default function PracticeOptionsToggle({isPracticeLeague, showPracticeOptions, togglePracticeOptions}) {
    return <>
        {isPracticeLeague ?
            <div className="form-check form-switch">
                <input className="form-check-input"
                       id="testBoxToggleOff" onChange={togglePracticeOptions} role="switch"
                       type="checkbox" checked={showPracticeOptions}/>
                <label className="form-check-label" htmlFor="testBoxToggleOff">Show/Hide
                    Practice Options</label>
            </div>
            :
            <div className="form-check form-switch">
                <input className="form-check-input"
                       id="testBoxToggleOff" onChange={togglePracticeOptions} role="switch"
                       type="checkbox" checked={showPracticeOptions}/>
                <label className="form-check-label" htmlFor="testBoxToggleOff">Show/Hide
                    Practice Options</label>
            </div>
        }
    </>
}