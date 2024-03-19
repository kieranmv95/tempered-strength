'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faEllipsis,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import useUserTeams from '@/hooks/useUserTeams';
import Link from 'next/link';
import React, { useState } from 'react';
import { IUserTeam } from '@/types/ITeam';
import { useAppDispatch } from '@/lib/hooks';
import toast from 'react-hot-toast';
import { deleteTeam as deleteteamSlice } from '@/lib/features/userTeams/userTeamsSlice';
import { Box } from '@/components/DesignSystemElements';
import { Button } from '@/components';
import PopUpModal from '@/components/PopUpModal/PopUpModal';

const UserTeamsDirectory = () => {
  const { data, loading, err } = useUserTeams();
  const [deleteTeam, setDeleteTeam] = useState<IUserTeam | null>(null);
  const dispatch = useAppDispatch();
  const [showOptions, setShowOptions] = useState<null | string>(null);

  const confirmDelete = async () => {
    if (deleteTeam) {
      const res = await dispatch(
        deleteteamSlice({ id: deleteTeam.id.toString() }),
      ).unwrap();

      if (res.id) {
        toast.success('Team Deleted');
        setDeleteTeam(null);
      }

      if (res.err) toast.error(res.err);
    } else {
      toast.error('no team selected to delete');
    }
  };

  if (loading) {
    return (
      <div>
        <h2 className="mb-3 font-bold text-lg">Your Teams</h2>
        <div>Loading</div>
      </div>
    );
  }

  if (err) {
    return (
      <div>
        <h2 className="mb-3 font-bold text-lg">Your Teams</h2>
        <div className="mb-3">Error loading your teams</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-3 font-bold text-lg">Your Teams</h2>
      {!data || !data.length ? (
        <div>
          <p className="mb-3">You have not joined any teams yet!</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 lg:gap-6">
            {data.map(team => (
              <div
                key={team.name}
                className="grid grid-cols-[1fr_auto] justify-between items-center"
              >
                <Link
                  href={`/teams/${team.id}`}
                  className="grid relative items-center"
                >
                  <Box small>
                    <div>{team.name}</div>
                    <p className="font-bold text-sm opacity-60">
                      {team.owner ? 'Owner' : 'Member'}
                    </p>
                  </Box>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="absolute right-2 w-4 h-4"
                  />
                </Link>
                {team.owner && (
                  <div className="flex gap-2 h-full ml-2">
                    <div
                      onClick={() =>
                        setShowOptions(
                          showOptions === team.name ? null : team.name,
                        )
                      }
                      className="cursor-pointer bg-egwene-500 text-rand-500 w-11 flex items-center justify-center rounded-xl"
                    >
                      <FontAwesomeIcon icon={faEllipsis} className="w-4 h-4" />
                    </div>
                    {showOptions === team.name && (
                      <Button
                        type="button"
                        onClick={() => setDeleteTeam(team)}
                        rounded={false}
                        theme="danger"
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      {deleteTeam && (
        <PopUpModal close={() => setDeleteTeam(null)}>
          <h2 className="text-xl font-bold mb-4">Delete team!</h2>
          <p className="mb-3">Are you sure you want to {deleteTeam.name}?</p>
          <div className="grid gap-2 grid-cols-2">
            <Button
              type="button"
              theme="danger"
              onClick={() => confirmDelete()}
            >
              Yes, Delete
            </Button>
            <Button type="button" onClick={() => setDeleteTeam(null)}>
              No, Cancel
            </Button>
          </div>
        </PopUpModal>
      )}
    </div>
  );
};

export default UserTeamsDirectory;
