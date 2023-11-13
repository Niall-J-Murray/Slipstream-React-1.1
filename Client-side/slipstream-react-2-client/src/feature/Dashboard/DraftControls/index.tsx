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
                                          currentPick,
                                          selectedDriver,
                                          lastDriverPicked,
                                          lastPickTime,
                                          isLeagueActive
                                      }) {

    // if (currentUser?.team?.league?.isLeagueActive) {
    return (
        <>
            {isLeagueActive ?
                <div></div>
                :
                // <div className="col-start-2 col-span-3 box-shadow">
                <div className="box-shadow">
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
                                currentPick={currentPick}
                                selectedDriver={selectedDriver}
                                lastDriverPicked={lastDriverPicked}
                                lastPickTime={lastPickTime}/>
                        </div>
                    }
                </div>
            }
        </>
    )
    // }
}
