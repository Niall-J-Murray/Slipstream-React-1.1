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
            {
                showPracticeOptions ?
                    <div className="col-start-1 col-span-5">
                        <div>
                            <PracticeOptionsToggle
                                isPracticeLeague={isPracticeLeague}
                                showPracticeOptions={showPracticeOptions}
                                togglePracticeOptions={togglePracticeOptions}
                            />
                        </div>
                        <div>
                            <PracticeDraft
                                currentLeague={currentLeague}
                                isPracticeLeague={isPracticeLeague}
                                isLeagueFull={isLeagueFull}
                                togglePracticeLeague={togglePracticeLeague}
                                addTestTeam={addTestTeam}
                            />
                        </div>
                    </div>
                    :
                    <div className="col-start-1 col-span-5">
                        <PracticeOptionsToggle
                            isPracticeLeague={isPracticeLeague}
                            showPracticeOptions={showPracticeOptions}
                            togglePracticeOptions={togglePracticeOptions}
                        />
                    </div>
            }
        </>
    )
};