import {useDeleteTestTeams} from "../../../hooks/queries/team-queries.ts";

export default function TeamDeleteControls(leagueId) {
    const deleteTestTeams = useDeleteTestTeams(leagueId).mutate();

    return (
        <div className="col-start-2 col-span-3 pl-40">
            <div className="box-shadow">
                <p>This league is now active, test teams can be removed now by clicking here:</p>
                <button className="btn btn-proceed"
                        type="button"
                        onClick={() => deleteTestTeams}
                >
                    Delete all test teams
                </button>
            </div>
        </div>
    );
}