'use client';

import useTeams from '@/hooks/useTeams';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock, faRefresh } from '@fortawesome/free-solid-svg-icons';
import useUserTeams from '@/hooks/useUserTeams';
import { ITeam, IUserTeam } from '@/types/ITeam';
import { joinTeam } from '@/lib/features/userTeams/userTeamsSlice';
import { useAppDispatch } from '@/lib/hooks';
import toast from 'react-hot-toast';
import { Dispatch, SetStateAction, useState } from 'react';
import { JoinProtectedTeamForm } from '@/components/Forms';
import { Button } from '@/components';

const TeamDirectoryItem = ({
  team,
  userTeams,
  setJoinProtectedTeam,
}: {
  team: ITeam;
  userTeams: IUserTeam[] | null;
  setJoinProtectedTeam: Dispatch<SetStateAction<ITeam | null>>;
}) => {
  const dispatch = useAppDispatch();
  const [isJoining, setIsJoining] = useState(false);
  const checkTeam = !!(userTeams as IUserTeam[]).find(
    t => t.name === team.name,
  );

  if (checkTeam) return null;

  return (
    <div
      key={team.name}
      className="grid grid-cols-[1fr_auto] justify-between items-center gap-2"
    >
      <div className="bg-zinc-700 px-3 rounded-sm flex justify-between h-11 items-center">
        <div>{team.name}</div>
        <div>
          {team.password ? (
            <FontAwesomeIcon icon={faLock} className="w-4 h-4 text-red-400" />
          ) : (
            <FontAwesomeIcon
              icon={faUnlock}
              className="w-4 h-4 text-green-400"
            />
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          loading={isJoining}
          disabled={isJoining}
          loadingText="Joining"
          onClick={async () => {
            if (!team.password) {
              setIsJoining(true);
              const res = await dispatch(
                joinTeam({
                  password: '',
                  team: team.id.toString(),
                }),
              ).unwrap();

              if (res.err) {
                toast.error(`you failed to join ${res.name}`);
              }
              if (res.name) toast.success(`you joined ${res.name}`);
              setIsJoining(false);
            } else {
              setJoinProtectedTeam(team);
            }
          }}
        >
          Join
        </Button>
      </div>
    </div>
  );
};

const TeamsDirectory = () => {
  const userTeams = useUserTeams();
  const { data, loading, err, refreshTeams } = useTeams();
  const [joinProtectedTeam, setJoinProtectedTeam] = useState<ITeam | null>(
    null,
  );

  if (loading || userTeams.loading) {
    return (
      <div>
        <h2 className="mb-3 font-bold text-lg">Team Directory</h2>
        <Button
          type="button"
          className="mb-3"
          theme="blue"
          loading={true}
          disabled={true}
          loadingText="Loading teams"
        >
          <FontAwesomeIcon icon={faRefresh} className="w-4 h-4" /> Refresh teams
          list
        </Button>
      </div>
    );
  }

  if (err || userTeams.err) {
    return (
      <div>
        <h2 className="mb-3 font-bold text-lg">Team Directory</h2>
        <div className="mb-3">Error loading teams</div>
        <div
          className="bg-blue-600 hover:bg-blue-700 click:bg-red-600 py-2 px-4 rounded inline-flex gap-2 items-center cursor-pointer"
          onClick={refreshTeams}
        >
          <FontAwesomeIcon icon={faRefresh} className="w-4 h-4" /> Refresh teams
          list
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-3 font-bold text-lg">Team Directory</h2>
      {!data || !data.length || !userTeams.data ? (
        <div>
          <p className="mb-3">No teams have been created yet</p>
          <Button
            type="button"
            onClick={refreshTeams}
            className="mb-3"
            theme="blue"
          >
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faRefresh} className="w-4 h-4" /> Refresh
              teams list
            </div>
          </Button>
        </div>
      ) : (
        <>
          <Button
            type="button"
            onClick={refreshTeams}
            className="mb-3"
            theme="blue"
          >
            <FontAwesomeIcon icon={faRefresh} className="w-4 h-4" /> Refresh
            teams list
          </Button>
          <div className="grid gap-3">
            {data.map(team => (
              <TeamDirectoryItem
                team={team}
                key={team.name}
                userTeams={userTeams.data}
                setJoinProtectedTeam={setJoinProtectedTeam}
              />
            ))}
          </div>
        </>
      )}
      {joinProtectedTeam && (
        <>
          <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-75 transition-opacity pointer" />
          <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 items-center sm:p-0">
              <JoinProtectedTeamForm
                team={joinProtectedTeam}
                close={() => setJoinProtectedTeam(null)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamsDirectory;
