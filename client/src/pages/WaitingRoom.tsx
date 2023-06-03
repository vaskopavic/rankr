import React, { useEffect, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { MdContentCopy, MdPeopleOutline } from 'react-icons/md';
import { useCopyToClipboard } from 'react-use';
import { useSnapshot } from 'valtio';

import NominationForm from '../components/NominationForm';
import ParticipantList from '../components/ParticipantList';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';
import { actions, state } from '../state';
import { colorizeText } from '../util';

export const WaitingRoom: React.FC = () => {
  const [_copiedText, copyToClipboard] = useCopyToClipboard();
  const [isParticipantListOpen, setIsParticipantListOpen] = useState(false);
  const [isNominationFormOpen, setIsNominationFormOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [participantToRemove, setParticipantToRemove] = useState<string>();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const currentState = useSnapshot(state);

  const confirmRemoveParticipant = (id: string) => {
    setConfirmationMessage(
      `Remove ${currentState.poll?.participants[id]} from poll?`
    );
    setParticipantToRemove(id);
    setIsConfirmationOpen(true);
  };

  const submitRemoveParticipant = () => {
    participantToRemove && actions.removeParticipant(participantToRemove);
    setIsConfirmationOpen(false);
  };
  useEffect(() => {
    console.log('Waiting room useEffect');
    actions.initializeSocket();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div>
          <h2 className="text-center">Poll Topic</h2>
          <p className="mb-4 italic text-center">{currentState.poll?.topic}</p>
          <h2 className="text-center">Poll ID</h2>
          <h3 className="mb-2 text-center">Click to copy!</h3>
          <div
            onClick={() => copyToClipboard(currentState.poll?.id || '')}
            className="flex justify-center mb-4 align-middle cursor-pointer"
          >
            <div className="mr-2 font-extrabold text-center">
              {currentState.poll && colorizeText(currentState.poll?.id)}
            </div>
            <MdContentCopy size={24} />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="mx-2 box btn-orange pulsate"
            onClick={() => setIsParticipantListOpen(true)}
          >
            <MdPeopleOutline size={24} />
            <span>{currentState.participantCount}</span>
          </button>
          <button
            className="mx-2 box btn-purple pulsate"
            onClick={() => setIsNominationFormOpen(true)}
          >
            <BsPencilSquare size={24} />
            <span>{currentState.nominationCount}</span>
          </button>
        </div>
        <div className="flex flex-col justify-center">
          {currentState.isAdmin ? (
            <>
              <div className="my-2 italic">
                {currentState.poll?.votesPerUser} Nominations Required to Start!
              </div>
              <button
                className="my-2 box btn-orange"
                disabled={!currentState.canStartVote}
                onClick={() => actions.startVote()}
              >
                Start Voting
              </button>
            </>
          ) : (
            <div className="my-2 italic">
              Waiting for Admin,{' '}
              <span className="font-semibold">
                {currentState.poll?.participants[currentState.poll?.adminId]}
              </span>
              , to start the voting.
            </div>
          )}
          <button
            className="my-2 box btn-purple"
            onClick={() => setShowConfirmation(true)}
          >
            Leave Poll
          </button>
          <ConfirmationDialog
            message="You'll be kicked out of the poll"
            showDialog={showConfirmation}
            onCancel={() => setShowConfirmation(false)}
            onConfirm={() => actions.startOver()}
          />
        </div>
      </div>
      <ParticipantList
        isOpen={isParticipantListOpen}
        onClose={() => setIsParticipantListOpen(false)}
        participants={currentState.poll?.participants}
        onRemoveParticipant={confirmRemoveParticipant}
        isAdmin={currentState.isAdmin || false}
        userId={currentState.me?.id}
      />
      <NominationForm
        title={currentState.poll?.topic}
        isOpen={isNominationFormOpen}
        onClose={() => setIsNominationFormOpen(false)}
        onSubmitNomination={(nominationText) =>
          actions.nominate(nominationText)
        }
        nominations={currentState.poll?.nominations}
        userId={currentState.me?.id}
        onRemoveNomination={(nominationId) =>
          actions.removeNomination(nominationId)
        }
        isAdmin={currentState.isAdmin || false}
      />
      <ConfirmationDialog
        showDialog={isConfirmationOpen}
        message={confirmationMessage}
        onConfirm={() => submitRemoveParticipant()}
        onCancel={() => setIsConfirmationOpen(false)}
      />
    </>
  );
};
