import React from 'react';
import { MdClose } from 'react-icons/md';

import BottomSheet, { BottemSheetProps } from './ui/BottomSheet';
import { Participants } from 'shared/poll-types';

type ParticipantListProps = {
  participants?: Participants;
  userId?: string;
  isAdmin: boolean;
  onRemoveParticipant: (id: string) => void;
} & BottemSheetProps;

const ParticipantList: React.FC<ParticipantListProps> = ({
  isOpen,
  onClose,
  participants = {},
  onRemoveParticipant,
  userId,
  isAdmin,
}) => (
  <BottomSheet isOpen={isOpen} onClose={onClose}>
    <div className="flex flex-wrap justify-center px-8 mb-2">
      {Object.entries(participants).map(([id, participant]) => (
        <div
          key={id}
          className="flex items-center justify-between p-4 mx-1 my-1 bg-white rounded-md shadow-xl"
        >
          <span className="ml-2 mr-1 text-xl text-center text-indigo-700">
            {participant}
          </span>
          {isAdmin && userId !== id && (
            <span
              className="ml-1 mr-2 cursor-pointer"
              onClick={() => onRemoveParticipant(id)}
            >
              <MdClose
                className="text-black align-middle fill-current"
                size={18}
              />
            </span>
          )}
        </div>
      ))}
    </div>
  </BottomSheet>
);

export default ParticipantList;
