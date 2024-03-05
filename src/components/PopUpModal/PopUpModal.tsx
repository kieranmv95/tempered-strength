'use client';

import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';

type PopUpModalProps = {
  close: () => void;
  children: React.ReactNode;
};

const PopUpModal = ({ close, children }: PopUpModalProps) => {
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [close]);

  return (
    <div onClick={close}>
      <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 items-center sm:p-0 cursor-pointer">
          <div
            className="bg-zinc-800 p-6 rounded relative w-[340px] cursor-auto"
            onClick={e => e.stopPropagation()}
          >
            <FontAwesomeIcon
              icon={faX}
              className="absolute top-0 right-0 p-4 cursor-pointer"
              onClick={close}
            />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpModal;
