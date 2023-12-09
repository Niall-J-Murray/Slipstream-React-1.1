interface TeamDeleteControlsProps {
    handleDeleteTestTeams: (e: { preventDefault: () => void }) => void
}

export default function TeamDeleteControls({handleDeleteTestTeams}: TeamDeleteControlsProps) {

    return (
        <div className={"pb-11"}>
            <h4>This league is now active.</h4>
            <h4>Test teams will be deleted 24 hours after draft was finished.</h4>
            <h4>You can delete your team to join a new league, or continue in this league with any user-created
                teams.</h4>
            <h4>Test teams can be removed now by clicking below:</h4>
            <div className={"pt-4"}>
                <button className="btn btn-proceed "
                        type="button"
                        onClick={(e) => handleDeleteTestTeams(e)}
                >
                    Delete all test teams
                </button>
            </div>
        </div>
    );
}