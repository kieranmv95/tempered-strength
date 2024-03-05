'use client';

import { useState } from 'react';
import CreateTeamForm from '@/components/Forms/CreateTeamForm/CreateTeamForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components';
import PopUpModal from '@/components/PopUpModal/PopUpModal';

const CreateTeam = () => {
  const [creatingTeam, setCreatingTeam] = useState(false);

  return (
    <div>
      <h2 className="mb-3 font-bold text-lg">Team Directory</h2>
      <p className="mb-3">Compete with your friends by creating a new team</p>
      <Button type="button" onClick={() => setCreatingTeam(true)}>
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" /> Create Team
        </div>
      </Button>
      {creatingTeam && (
        <PopUpModal close={() => setCreatingTeam(false)}>
          <CreateTeamForm close={() => setCreatingTeam(false)} />
        </PopUpModal>
      )}
    </div>
  );
};

export default CreateTeam;
