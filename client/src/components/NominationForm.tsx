import React, { useState } from 'react';
import { MdCancel } from 'react-icons/md';

import { Nominations } from '../pollState';
import BottomSheet, { BottemSheetProps } from './ui/BottomSheet';

type NominationFormProps = {
  title?: string;
  nominations?: Nominations;
  userId?: string;
  isAdmin: boolean;
  onSubmitNomination: (nomination: string) => void;
  onRemoveNomination: (nominationID: string) => void;
} & BottemSheetProps;

const NominationForm: React.FC<NominationFormProps> = ({
  isOpen,
  onClose,
  title,
  nominations = {},
  onSubmitNomination,
  onRemoveNomination,
  userId,
  isAdmin,
}) => {
  const [nominationText, setNominationText] = useState<string>('');

  const handleSubmitNomination = (nominationText: string) => {
    onSubmitNomination(nominationText);
    setNominationText('');
  };

  const getBoxStyle = (id: string): string => {
    return id === userId
      ? 'bg-orange-100 flex-row'
      : 'bg-gray-100 flex-row-reverse';
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center px-4 mb-2">
        <h3 className="font-semibold">{title}</h3>
        <div className="w-full my-4">
          <textarea
            rows={2}
            maxLength={100}
            className="w-full box info"
            value={nominationText}
            onChange={(e) => setNominationText(e.currentTarget.value)}
          />
        </div>
        <button
          className="box btn-purple"
          disabled={!nominationText.length || nominationText.length > 100}
          onClick={() => handleSubmitNomination(nominationText)}
        >
          Nominate
        </button>

        <h2 className="my-4 text-xl font-medium text-center">Nominations</h2>
        <div className="w-full mb-2">
          {Object.entries(nominations).map(([nominationId, nomination]) => (
            <div
              key={nominationId}
              className={`my-2 flex justify-between items-center p-2 rounded-md ${getBoxStyle(
                nomination.userId
              )}`}
            >
              <div>{nomination.text}</div>
              {isAdmin && (
                <div className="ml-2">
                  <MdCancel
                    className="cursor-pointer fill-current hover:opacity-80"
                    onClick={() => onRemoveNomination(nominationId)}
                    size={24}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
};

export default NominationForm;
