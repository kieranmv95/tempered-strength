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
        <>
          <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-75 transition-opacity pointer" />
          <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 items-center sm:p-0">
              <div className="bg-zinc-800 p-6 rounded relative w-[300px]">
                <div
                  className="absolute top-0 right-0 p-4 cursor-pointer"
                  onClick={() => setDeleteTeam(null)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-4">Delete team!</h2>
                <p className="mb-3">
                  Are you sure you want to {deleteTeam.name}?
                </p>
                <div
                  className="inline-block bg-red-600 hover:bg-red-700 click:bg-red-600 py-2 px-4 rounded"
                  onClick={() => confirmDelete()}
                >
                  Yes, Delete Team
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserTeamsDirectory;
