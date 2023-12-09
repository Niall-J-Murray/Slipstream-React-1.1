interface TeamDeleteControlsProps {
    handleDeleteTestTeams: (e: { preventDefault: () => void }) => void
}

export default function TeamDeleteControls({handleDeleteTestTeams}: TeamDeleteControlsProps) {

    return (
        <div>
            <p>This league is now active, test teams can be removed now by clicking here:</p>
            <button className="btn btn-proceed"
                    type="button"
                    onClick={(e) => handleDeleteTestTeams(e)}
            >
                Delete all test teams
            </button>
        </div>
    );
}