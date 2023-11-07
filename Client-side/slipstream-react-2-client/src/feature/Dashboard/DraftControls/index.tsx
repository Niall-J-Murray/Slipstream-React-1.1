import PracticeDraftOptions from "./PracticeDraftOptions";
import DraftInProgress from "./DraftInProgress";

export default function DraftControls({
                                          showPracticeOptions,
                                          currentLeague,
                                          isPracticeLeague,
                                          isLeagueFull,
                                          togglePracticeOptions,
                                          togglePracticeLeague,
                                          addTestTeam,
                                          currentUser,
                                          isDraftInProgress,
                                          currentPickNumber,
                                          currentPickName
                                      }) {
    return (
        <>
            {!isLeagueFull ?
                <div>
                    <PracticeDraftOptions
                        currentLeague={currentLeague}
                        isPracticeLeague={isPracticeLeague}
                        isLeagueFull={isLeagueFull}
                        showPracticeOptions={showPracticeOptions}
                        togglePracticeOptions={togglePracticeOptions}
                        togglePracticeLeague={togglePracticeLeague}
                        addTestTeam={addTestTeam}
                    />
                </div>
                :
                <div>
                    <DraftInProgress
                        currentUser={currentUser}
                        isDraftInProgress={isDraftInProgress}
                        currentPickNumber={currentPickNumber}
                        currentPickName={currentPickName}
                    />
                </div>
            }
        </>
    )
}
