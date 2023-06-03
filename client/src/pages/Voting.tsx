import React, { useState } from 'react';
import { useSnapshot } from 'valtio';

import ConfirmationDialog from '../components/ui/ConfirmationDialog';
import RankedCheckBox from '../components/ui/RankedCheckBox';
import { state, actions } from '../state';

export const Voting: React.FC = () => {
  const currentState = useSnapshot(state);
  const [rankings, setRankings] = useState<string[]>([]);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmVotes, setConfirmVotes] = useState(false);

  const toggleNomination = (id: string) => {
    const position = rankings.findIndex((ranking) => ranking === id);
    const hasVotesRemaining =
      (currentState.poll?.votesPerUser || 0) - rankings.length > 0;

    if (position < 0 && hasVotesRemaining) {
      setRankings([...rankings, id]);
    } else {
      setRankings([
        ...rankings.slice(0, position),
        ...rankings.slice(position + 1, rankings.length),
      ]);
    }
  };

  const getRank = (id: string) => {
    const position = rankings.findIndex((ranking) => ranking === id);

    return position < 0 ? undefined : position + 1;
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full max-w-sm mx-auto">
      <div className="w-full">
        <h1 className="text-center">Voting Page</h1>
      </div>
      <div className="w-full">
        {currentState.poll && (
          <>
            <div className="mb-6 text-xl font-semibold text-center">
              Select Your Top {currentState.poll?.votesPerUser} Choices
            </div>
            <div className="mb-6 text-lg font-semibold text-center text-indigo-700">
              {currentState.poll.votesPerUser - rankings.length} Votes remaining
            </div>
          </>
        )}
        <div className="px-2">
          {Object.entries(currentState.poll?.nominations || {}).map(
            ([id, nomination]) => (
              <RankedCheckBox
                key={id}
                value={nomination.text}
                rank={getRank(id)}
                onSelect={() => toggleNomination(id)}
              />
            )
          )}
        </div>
      </div>
      <div className="flex flex-col items-center mx-auto">
        <button
          disabled={rankings.length < (currentState.poll?.votesPerUser ?? 100)}
          className="my-2 box btn-purple w-36"
          onClick={() => setConfirmVotes(true)}
        >
          Submit Votes
        </button>
        <ConfirmationDialog
          message="You cannot change your vote after submitting"
          showDialog={confirmVotes}
          onCancel={() => setConfirmVotes(false)}
          onConfirm={() => actions.submitRankings(rankings)}
        />
        {currentState.isAdmin && (
          <>
            <button
              className="my-2 box btn-orange w-36"
              onClick={() => setConfirmCancel(true)}
            >
              Cancel Poll
            </button>
            <ConfirmationDialog
              message="This will cancel the poll and remove all users"
              showDialog={confirmCancel}
              onCancel={() => setConfirmCancel(false)}
              onConfirm={() => actions.cancelPoll()}
            />
          </>
        )}
      </div>
    </div>
  );
};
