'use client';

import { useState } from 'react';
import CreateTeamForm from '@/components/Forms/CreateTeamForm/CreateTeamForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CreateTeam = () => {
  const [creatingTeam, setCreatingTeam] = useState(false);

  return (
    <div>
      <h2 className="mb-3 font-bold text-lg">Team Directory</h2>
      <p className="mb-3">Compete with your friends by creating a new team</p>
      <div
        className="inline-block bg-green-600 hover:bg-green-700 click:bg-green-600 py-2 px-4 rounded inline-flex gap-2 items-center cursor-pointer"
        onClick={() => setCreatingTeam(true)}
      >
        <FontAwesomeIcon icon={faPlus} className="w-4 h-4" /> Create team
      </div>
      {creatingTeam && (
        <>
          <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-75 transition-opacity pointer" />
          <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 items-center sm:p-0">
              <CreateTeamForm close={() => setCreatingTeam(false)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateTeam;
