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
                                          currentPickName,
                                          selectedDriver,
                                          lastDriverPicked,
                                          lastPickTime
                                      }) {
    return (
        <>
            <div className="col-start-2 col-span-3 box-shadow">
                {!isLeagueFull ?
                    <div className="grid grid-cols-5">
                        <PracticeDraftOptions
                            currentLeague={currentLeague}
                            isPracticeLeague={isPracticeLeague}
                            isLeagueFull={isLeagueFull}
                            showPracticeOptions={showPracticeOptions}
                            togglePracticeOptions={togglePracticeOptions}
                            togglePracticeLeague={togglePracticeLeague}
                            addTestTeam={addTestTeam}/>
                    </div>
                    :
                    <div className="grid grid-cols-5">
                        <DraftInProgress
                            currentUser={currentUser}
                            isDraftInProgress={isDraftInProgress}
                            currentPickNumber={currentPickNumber}
                            currentPickName={currentPickName}
                            selectedDriver={selectedDriver}
                            lastDriverPicked={lastDriverPicked}
                            lastPickTime={lastPickTime}/>
                    </div>
                }
            </div>
        </>
    )
}
