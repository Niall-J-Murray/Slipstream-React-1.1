import PracticeDraft from "./PracticeDraft";
import PracticeOptionsToggle from "./PracticeOptionsToggle";

export default function PracticeDraftOptions({showPracticeOptions, currentLeague, isPracticeLeague, TogglePracticeOptions, TogglePracticeLeague}) {
    return (
        <>
            <div className="col-start-2 col-span-3 box-shadow">
                {
                    showPracticeOptions ?
                        <div>
                            <PracticeOptionsToggle
                                showPracticeOptions={showPracticeOptions}
                                TogglePracticeOptions={TogglePracticeOptions}
                            />
                            <PracticeDraft
                                currentLeague={currentLeague}
                                isPracticeLeague={isPracticeLeague}
                                TogglePracticeLeague={TogglePracticeLeague}/>
                        </div>
                        : <PracticeOptionsToggle
                            showPracticeOptions={showPracticeOptions}
                            TogglePracticeOptions={TogglePracticeOptions}
                        />
                }
            </div>
        </>
    )
};