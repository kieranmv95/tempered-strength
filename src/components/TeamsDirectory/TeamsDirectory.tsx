'use client';

import useTeams from '@/hooks/useTeams';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock, faRefresh } from '@fortawesome/free-solid-svg-icons';
import useUserTeams from '@/hooks/useUserTeams';
import { ITeam, IUserTeam } from '@/types/ITeam';
import { joinTeam } from '@/lib/features/userTeams/userTeamsSlice';
import { useAppDispatch } from '@/lib/hooks';
import toast from 'react-hot-toast';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { JoinProtectedTeamForm } from '@/components/Forms';
import { Button } from '@/components';
import { Box } from '@/components/DesignSystemElements';
import PopUpModal from '@/components/PopUpModal/PopUpModal';

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
      <Box className="flex justify-between" small>
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
      </Box>
      <div className="flex gap-2 h-full">
        <Button
          type="button"
          loading={isJoining}
          disabled={isJoining}
          loadingText="Joining"
          rounded={false}
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
          loading={true}
          disabled={true}
          loadingText="Loading teams"
          className="mb-3 flex items-center gap-2"
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
        <Button
          type="button"
          onClick={refreshTeams}
          className="mb-3 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faRefresh} className="w-4 h-4" /> Refresh teams
          list
        </Button>
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
            className="mb-3 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faRefresh} className="w-4 h-4" /> Refresh
            teams list
          </Button>
        </div>
      ) : (
        <>
          <Button
            type="button"
            onClick={refreshTeams}
            className="mb-3 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faRefresh} className="w-4 h-4" /> Refresh
            teams list
          </Button>
          <div className="grid gap-4 lg:gap-6">
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
        <PopUpModal close={() => setJoinProtectedTeam(null)}>
          <JoinProtectedTeamForm
            team={joinProtectedTeam}
            close={() => setJoinProtectedTeam(null)}
          />
        </PopUpModal>
      )}
    </div>
  );
};

export default TeamsDirectory;
