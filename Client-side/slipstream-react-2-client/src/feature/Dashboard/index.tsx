import DashTop from "./DashTop";
import LeagueTable from "./LeagueTable";
import DriverTable from "./DriverTable";
import {useEffect, useState} from "react";
import {postToggleTestLeague} from "../../services/league.service.ts";
import DraftControls from "./DraftControls";
import Reminders from "./Reminders";
import Layout from "../../components/Layout/Layout.tsx";
import IDriver from "../../types/driver.type.ts";
import IUser from "../../types/user.type.ts";
import {
    useAllTeamsInLeague,
    useLeagueData,
    useNextPickNumber,
    useNextUserToPick,
    useOpenLeague
} from "../../hooks/queries/league-queries.ts";
import {useCreateTestTeam, useDeleteTestTeams} from "../../hooks/queries/team-queries.ts";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";
import {usePickDriver, useUndraftedDrivers} from "../../hooks/queries/driver-queries.ts";
import ITeam from "../../types/team.type.ts";
import ActiveLeagueInfo from "./ActiveLeagueInfo";
import {postDeleteUserTeam} from "../../services/team.service.ts";


// Todo Display correct info and options in dash-top depending on users team/league status.
//  ---
//  Finish driver picking UX
//  ---
//  Check draft add test team and draft picking functions after dashboard refactor.
//  Fix draft instructions to display according to user status.
//  Finish loading spinner graphic, and pause page loading until all data is fetched.
//  Fix data missing data on page reloads.
//  Check test teams disappearing mid-draft after user logout.
//  Add toggles to show/hide certain boxes.
//  Fix layouts for consistency.
//  Change "Register" to "Sign Up", "Login" to "Sign In" and "Log Out"...

interface DashboardProps {
    userData: undefined | IUser
}

export default function Dashboard({userData}: DashboardProps) {
    const [showPracticeOptions, setShowPracticeOptions]
        = useState<boolean | undefined | null>();
    const [isPracticeLeague, setIsPracticeLeague]
        = useState<boolean | undefined | null>();
    const [isLeagueFull, setIsLeagueFull]
        = useState<boolean | undefined | null>(false);
    const [isDraftInProgress, setIsDraftInProgress]
        = useState<boolean | undefined | null>(false);
    const [isLeagueActive, setIsLeagueActive]
        = useState<boolean | undefined | null>();
    const [isUsersTurnToPick, setIsUsersTurnToPick]
        = useState<boolean | undefined | null>(false);
    const [leagueSize, setLeagueSize]
        = useState<number | undefined | null>(0);
    const [leagueTeams, setLeagueTeams]
        = useState<Array<ITeam> | undefined | null>([])
    const [selectedDriver, setSelectedDriver]
        = useState<IDriver | undefined | null>();
    const [lastDriverPicked, setLastDriverPicked]
        = useState<IDriver | undefined | null>();
    const [lastPickTime, setLastPickTime]
        = useState<Date | undefined | null>();

    const redirect = useNavigate();

    const {
        data: openLeague,
        isLoading: openLeagueLoading,
        // status: openLeagueData,
        error: erropenLeague,
    } = useOpenLeague();

    const userId = userData ? userData?.id : null;
    const leagueId = userData?.team ? userData?.team?.leagueId : openLeague?.leagueId;
    const teamsInLeague: Array<ITeam> | undefined | null = useAllTeamsInLeague(leagueId).data;

    const {
        data: leagueData,
        isLoading: leagueDataLoading,
        // status: statLeagueData,
        error: errLeagueData,
    } = useLeagueData(leagueId);

    const queryClient = useQueryClient();
    const currentPickNumber = useNextPickNumber(leagueId).data;
    const nextUserToPick = useNextUserToPick(leagueId).data;
    const pickDriver = usePickDriver();
    const undraftedDrivers = useUndraftedDrivers(leagueId).data;
    const mutateTestTeam = useCreateTestTeam(leagueId);
    const deleteTestTeams = useDeleteTestTeams(leagueId);

    useEffect(() => {
        if (!userData) {
            redirect("/login");
        }
        setLeagueTeams(teamsInLeague);
        setLeagueSize(leagueTeams?.length);
        if (leagueSize
            && leagueSize >= 10) {
            setIsLeagueFull(true);
            if (!leagueData?.isActive) {
                setIsDraftInProgress(true);
            }
        }
        if ((leagueData?.currentPickNumber && leagueData?.currentPickNumber > 20)
            || leagueData?.isActive) {
            setIsDraftInProgress(false);
            setIsLeagueActive(true);
        }

        setIsPracticeLeague(leagueData?.isPracticeLeague);
        setShowPracticeOptions(leagueData?.isPracticeLeague);

        setSelectedDriver(undraftedDrivers?.find((driver: IDriver) =>
            driver !== undefined));

        if (nextUserToPick?.isTestUser) {
            setIsUsersTurnToPick(true);
        }

        if (leagueData?.currentPickNumber == userData?.team?.firstPickNumber
            || leagueData?.currentPickNumber == userData?.team?.secondPickNumber) {
            setIsUsersTurnToPick(true);
        }

    }, [userData, leagueData, leagueData?.activeTimestamp, leagueSize, teamsInLeague, leagueTeams, nextUserToPick, isLeagueFull, undraftedDrivers]);

    function togglePracticeOptions() {
        if (showPracticeOptions) {
            setShowPracticeOptions(false);
        } else {
            setShowPracticeOptions(true);
        }
    }

    function togglePracticeLeague() {
        if (isPracticeLeague) {
            postToggleTestLeague(leagueId)
                .then(res => {
                    setIsPracticeLeague(res);
                })
        } else {
            postToggleTestLeague(leagueId)
                .then(res => {
                    setIsPracticeLeague(res);
                })
        }
    }

    const addTestTeam = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        mutateTestTeam.mutateAsync()
            .then(() => {
                queryClient.invalidateQueries("allTeamsInLeague")
                    .then(() => {
                            setLeagueTeams(teamsInLeague);
                            setLeagueSize(leagueTeams?.length);
                        }
                    )
            })
    }

    const handleDeleteTestTeams = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        deleteTestTeams.mutateAsync()
            .then(() => {
                queryClient.invalidateQueries("allTeamsInLeague")
                    .then(() => {
                            setLeagueTeams(teamsInLeague);
                            setLeagueSize(leagueTeams?.length);
                            setIsPracticeLeague(false);
                        }
                    )
            })
    }

    const handleDriverSelection = (driver: IDriver) => {
        setSelectedDriver(driver)
        return driver;
    }

    const handlePick = (e: { preventDefault: () => void; },
                        driverId: number | string | undefined) => {
        e.preventDefault();
        pickDriver.mutateAsync({
            userId: userId,
            driverId: driverId,
        })
            .then(() => {
                queryClient.invalidateQueries("leagueData")
                queryClient.invalidateQueries("undraftedDrivers")
                queryClient.invalidateQueries("driversInTeam")
                queryClient.invalidateQueries("nextPickNumber")
                queryClient.invalidateQueries("nextUserToPick")
                // queryClient.invalidateQueries("allTeamsInLeague")
            })
            .then(() => setSelectedDriver(null));
    }

    const handleDeleteUserTeam = () => {
        postDeleteUserTeam(userData?.id)
            .then(() => {
                queryClient.invalidateQueries("leagueData")
                queryClient.invalidateQueries("userData")
            })
            .then(() => redirect("/home"));
    }

    return (
        <>
            <Layout>
                <div className="grid grid-cols-5 gap-2">
                    <div className="col-start-2 col-span-1">
                        <DashTop
                            userData={userData}
                            leagueData={leagueData}
                            leagueSize={leagueSize}
                            isPracticeLeague={isPracticeLeague}
                            isLeagueFull={isLeagueFull}
                            isLeagueActive={isLeagueActive}
                            handleDeleteUserTeam={handleDeleteUserTeam}
                        />
                    </div>
                    <div className="col-start-3 col-span-2">
                        <Reminders/>
                    </div>
                    <div className="col-start-2 col-span-3">
                        <DraftControls
                            currentUser={userData}
                            currentLeague={leagueData}
                            isPracticeLeague={isPracticeLeague}
                            isLeagueFull={isLeagueFull}
                            showPracticeOptions={showPracticeOptions}
                            isDraftInProgress={isDraftInProgress}
                            selectedDriver={selectedDriver}
                            lastDriverPicked={lastDriverPicked}
                            lastPickTime={lastPickTime}
                            isLeagueActive={isLeagueActive}
                            currentPickNumber={currentPickNumber}
                            isUsersTurnToPick={isUsersTurnToPick}
                            nextUserToPick={nextUserToPick}
                            togglePracticeOptions={togglePracticeOptions}
                            togglePracticeLeague={togglePracticeLeague}
                            addTestTeam={addTestTeam}
                            handlePick={handlePick}
                        />
                    </div>
                    {isLeagueActive ?
                        <>
                            <div className="col-start-2 col-span-2">
                                <LeagueTable
                                    currentLeague={leagueData}
                                    leagueSize={leagueSize}
                                    leagueTeams={leagueTeams}
                                    isDraftInProgress={isDraftInProgress}
                                    nextUserToPick={nextUserToPick}
                                    isLeagueActive={isLeagueActive}
                                />
                            </div>
                            <div className="col-start-4 col-span-1">
                                <ActiveLeagueInfo
                                    isPracticeLeague={isPracticeLeague}
                                    undraftedDrivers={undraftedDrivers}
                                    handleDeleteTestTeams={handleDeleteTestTeams}
                                />
                            </div>
                            <div className="col-start-2 col-span-3">
                                <DriverTable
                                    isDraftInProgress={isDraftInProgress}
                                    isUsersTurnToPick={isUsersTurnToPick}
                                    selectedDriver={selectedDriver}
                                    undraftedDrivers={undraftedDrivers}
                                    handleDriverSelection={handleDriverSelection}
                                />
                            </div>
                        </>
                        :
                        <>
                            <div className="col-start-2 col-span-1">
                                <LeagueTable
                                    currentLeague={leagueData}
                                    leagueSize={leagueSize}
                                    leagueTeams={leagueTeams}
                                    isDraftInProgress={isDraftInProgress}
                                    nextUserToPick={nextUserToPick}
                                    isLeagueActive={isLeagueActive}
                                />

                            </div>
                            <div className="col-start-3 col-span-2">
                                <DriverTable
                                    isDraftInProgress={isDraftInProgress}
                                    isUsersTurnToPick={isUsersTurnToPick}
                                    selectedDriver={selectedDriver}
                                    undraftedDrivers={undraftedDrivers}
                                    handleDriverSelection={handleDriverSelection}
                                />
                            </div>
                        </>
                    }
                </div>
            </Layout>
        </>
    );
}


// for testing dashboard UI
{/*<div className="col-start-2 col-span-3">*/
}
{/*    <div className="grid grid-cols-5">*/
}
{/*        <div className="col-start-1 col-span-1">*/
}
{/*            <br/>1.{currentUser?.username}*/
}
{/*            <br/>2.{team?.teamName}*/
}
{/*            <br/>3.{team?.leagueId}*/
}
{/*            <br/>4.{currentLeague?.leagueName}*/
}
{/*            <br/>5.{currentLeague?.teams?.length}*/
}
{/*            <br/>6.{openLeague?.leagueName}*/
}
{/*            <br/>7.{isLeagueActive ? "LA" : "LNA"}*/
}
{/*            <br/>8.{isLeagueFull ? "LF" : "LNF"}*/
}
{/*            <br/>9.{isPracticeLeague ? "PL" : "NPL"}*/
}
{/*            <br/>10.{showPracticeOptions ? "PO" : "NP0"}*/
}
{/*            <br/>11.{isDraftInProgress ? "DIP" : "NIP"}*/
}
{/*        </div>*/
}
{/*        <div className="col-start-2 col-span-1">*/
}
{/*            <br/>12.{currentPickNumber}*/
}
{/*            <br/>13.{nextUserToPick?.username}*/
}
{/*            <br/>14.{isUsersTurnToPick ? "pick" : "no pick"}*/
}
{/*            <br/>15.{selectedDriver?.surname}*/
}
{/*            <br/>16.{lastDriverPicked?.surname}*/
}
{/*            <br/>17.{lastPickTime?.getTime()}*/
}
{/*        </div>*/
}
{/*        <div className="col-start-3 col-span-1">*/
}
{/*            <br/>18.{leagueTeams?.map((team: ITeam) => {*/
}
{/*            return <div key={team.id}>{team.teamName}</div>*/
}
{/*        })}*/
}
{/*        </div>*/
}
{/*        <div className="col-start-4 col-span-1">*/
}
{/*            19.{driversInTeam?.map((driver: IDriver) => {*/
}
{/*            return <div key={driver.driverId}>{driver.surname}</div>*/
}
{/*        })}*/
}
{/*        </div>*/
}
{/*        <div className="col-start-5 col-span-1">*/
}
{/*            20.{undraftedDrivers?.map((driver: IDriver) => {*/
}
{/*            return <div key={driver.driverId}>{driver.surname}</div>*/
}
{/*        })}*/
}
{/*        </div>*/
}
{/*    </div>*/
}
{/*</div>*/
}