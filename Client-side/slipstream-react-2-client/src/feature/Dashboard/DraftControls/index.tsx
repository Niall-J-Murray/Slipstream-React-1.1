import PracticeDraftOptions from "./PracticeDraftOptions";
import DraftInProgress from "./DraftInProgress";

export default function DraftControls({
                                          currentUser,
                                          currentPickNumber,
                                          isUsersTurnToPick,
                                          nextUserToPick,
                                          showPracticeOptions,
                                          currentLeague,
                                          isPracticeLeague,
                                          isLeagueFull,
                                          togglePracticeOptions,
                                          togglePracticeLeague,
                                          addTestTeam,
                                          isDraftInProgress,
                                          selectedDriver,
                                          lastDriverPicked,
                                          lastPickTime,
                                          isLeagueActive,
                                      }) {

    return (
        <>
            {isLeagueActive ?
                <div></div>
                :
                // <div className="col-start-2 col-span-3 box-shadow">
                <div className="box-shadow">
                    {isLeagueFull ?
                        <div className="grid grid-cols-5">
                            <DraftInProgress
                                isDraftInProgress={isDraftInProgress}
                                selectedDriver={selectedDriver}
                                lastDriverPicked={lastDriverPicked}
                                lastPickTime={lastPickTime}
                                currentUser={currentUser}
                                currentPickNumber={currentPickNumber}
                                isUsersTurnToPick={isUsersTurnToPick}
                                nextUserToPick={nextUserToPick}
                                // currentPickNumber={currentPickNumber}
                                // isUsersTurnToPick={isUsersTurnToPick}
                                // nextUserToPick={nextUserToPick}
                            />
                        </div>
                        :
                        <div className="grid grid-cols-5">
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
                    }
                </div>
            }
        </>
    )
}
