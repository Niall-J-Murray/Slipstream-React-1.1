import PracticeDraft from "./PracticeDraft";
import PracticeOptionsToggle from "./PracticeOptionsToggle";

export default function PracticeDraftOptions({
                                                 showPracticeOptions,
                                                 currentLeague,
                                                 isPracticeLeague,
                                                 isLeagueFull,
                                                 togglePracticeOptions,
                                                 togglePracticeLeague,
                                                 addTestTeam
                                             }) {
    return (
        <>
                <div className="col-start-2 col-span-3 box-shadow">
                    {
                        showPracticeOptions ?
                            <div>
                                <PracticeOptionsToggle
                                    showPracticeOptions={showPracticeOptions}
                                    togglePracticeOptions={togglePracticeOptions}
                                />
                                <PracticeDraft
                                    currentLeague={currentLeague}
                                    isPracticeLeague={isPracticeLeague}
                                    isLeagueFull={isLeagueFull}
                                    togglePracticeLeague={togglePracticeLeague}
                                    addTestTeam={addTestTeam}
                                />
                            </div>
                            : <PracticeOptionsToggle
                                showPracticeOptions={showPracticeOptions}
                                togglePracticeOptions={togglePracticeOptions}
                            />
                    }
                </div>
        </>
    )
};