import PracticeDraftOptions from "./PracticeDraftOptions";
import DraftInProgress from "./DraftInProgress";
import IUser from "../../../types/user.type.ts";
import ILeague from "../../../types/league.type.ts";
import IDriver from "../../../types/driver.type.ts";
import PracticeOptionsToggle from "./PracticeDraftOptions/PracticeOptionsToggle";

interface DraftControlsProps {
    userData: IUser | undefined
    leagueData: ILeague | undefined,
    isPracticeLeague: boolean | undefined | null,
    isLeagueFull: boolean | undefined | null,
    showDraftPickTips: boolean | undefined,
    selectedDriver: IDriver | undefined | null,
    lastPickTime: Date | undefined | null,
    isLeagueActive: boolean | undefined | null,
    currentPickNumber: number | undefined | null,
    isUsersTurnToPick: boolean | undefined | null,
    nextUserToPick: IUser | undefined,
    togglePracticeOptions: () => void,
    togglePracticeLeague: () => void,
    addTestTeam: (e: { preventDefault: () => void }) => void,
    handlePick: (e: { preventDefault: () => void }, driverId: (number | string | undefined)) => void,
}

export default function DraftControls({
                                          userData,
                                          leagueData,
                                          isPracticeLeague,
                                          isLeagueFull,
                                          showDraftPickTips,
                                          selectedDriver,
                                          lastPickTime,
                                          isLeagueActive,
                                          currentPickNumber,
                                          isUsersTurnToPick,
                                          nextUserToPick,
                                          togglePracticeOptions,
                                          togglePracticeLeague,
                                          addTestTeam,
                                          handlePick,
                                      }: DraftControlsProps) {

    if (!userData?.team || isLeagueActive) {
        return (
                <PracticeOptionsToggle
                    isPracticeLeague={isPracticeLeague}
                    showDraftPickTips={showDraftPickTips}
                    togglePracticeOptions={togglePracticeOptions}
                />
        )
    } else {
        return (
            <div>
                    <PracticeOptionsToggle
                        isPracticeLeague={isPracticeLeague}
                        showDraftPickTips={showDraftPickTips}
                        togglePracticeOptions={togglePracticeOptions}
                    />
                {isLeagueFull ?
                    <div className="grid grid-cols-5">
                        <DraftInProgress
                            currentPickNumber={currentPickNumber}
                            isUsersTurnToPick={isUsersTurnToPick}
                            nextUserToPick={nextUserToPick}
                            selectedDriver={selectedDriver}
                            lastPickTime={lastPickTime}
                            handlePick={handlePick}
                        />
                    </div>
                    :
                    <div className="grid grid-cols-5">
                        <PracticeDraftOptions
                            leagueData={leagueData}
                            isPracticeLeague={isPracticeLeague}
                            isLeagueFull={isLeagueFull}
                            showDraftPickTips={showDraftPickTips}
                            togglePracticeOptions={togglePracticeOptions}
                            togglePracticeLeague={togglePracticeLeague}
                            addTestTeam={addTestTeam}
                        />
                    </div>
                }
            </div>
        )
    }
}
